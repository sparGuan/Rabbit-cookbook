"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../db/schema/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const index_1 = require("../../config/index");
const getDateAfter_1 = require("../../utils/getDateAfter");
const Qsms = require("qcloudsms_js");
class LoginController {
    constructor() {
        this.qsms = new Qsms(index_1.qsms.appid, index_1.qsms.appkey);
    }
    // 注册--手机号注册
    // 腾讯云服务
    // 注册使用的参数：
    /**
     * 腾讯云短信的sdk包
     * @param {number} appid 腾讯云的短信应用id
     * @param {string} appkey 腾讯云短信应用key
     * @param {string} Mobile 手机号
     */
    msgValid() {
        return async (ctx, next) => {
            const { body } = ctx.request;
            // 初始化接口
            // 先查询该手机号是否被注册
            const user = await user_1.default.findOne({ Mobile: body.Mobile });
            // 如果是注册用户就要进入该判断
            if (!global._.isEmpty(user) && body.register === true) {
                // 如果存在
                ctx.body = {
                    message: '该手机号已被注册！'
                };
                return;
            }
            const valid = global._.random(999999);
            var smsType = 0; // Enum{0: 普通短信, 1: 营销短信}
            var ssender = this.qsms.SmsSingleSender();
            // await ssender.send(smsType, 86, body.Mobile,
            // 	`您的验证码${valid}，此验证码10分钟内有效，请勿向他人泄露`, "", "", ()=>{
            // 	});
            ctx.body = {
                message: valid
            };
            //单发短信
            // await this.qsms.singleSend({
            // 	phoneNumber:body.Mobile,
            // 	msg: `您的验证码${valid}，此验证码10分钟内有效，请勿向他人泄露`
            // });
        };
    }
    register() {
        return async (ctx, next) => {
            const { body } = ctx.request;
            const user = new user_1.default(body);
            const UserModel = await user.save();
            await LoginController.resetExpiredTime(UserModel.get('_id'));
            ctx.body = {
                message: index_1.statusCode.success,
                UserModel
            };
        };
    }
    // 手机号找回
    /**
     * 腾讯云短信的sdk包
     * @param {string} Mobile 账号
     * @param {string} newPassWord 新的密码
     */
    forgetPwd() {
        return async (ctx, next) => {
            const { body } = ctx.request;
            let user = (await user_1.default.findOne({ Mobile: body.Mobile }));
            if (!global._.isEmpty(user)) {
                user = await user_1.default.update({ _id: user.get('_id') }, {
                    $set: {
                        passWord: body.passWord
                    }
                });
                ctx.body = {
                    message: index_1.statusCode.success,
                    user
                };
            }
            else {
                ctx.status = 401;
                ctx.body = {
                    message: '该手机号还没被注册！'
                };
            }
        };
    }
    useWxOrQQLogin() {
        return async (ctx, next) => {
            const { body } = ctx.request;
            let expiredTime;
            try {
                // 没有账号密码直接报400
                // 微信 QQ登录的自动创建账号密码
                if (!body.tenancyName || !body.openid) {
                    // 400的报错是缺少参数
                    ctx.status = 400;
                    ctx.body = {
                        error: `expected an object with userName, passWord but got: ${body}`
                    };
                    return;
                }
                body.passWord = await bcrypt.hash(body.passWord, 5);
                let UserModel = await user_1.default.find({ openid: body.openid });
                if (!UserModel.length) {
                    const newUser = new user_1.default(body);
                    UserModel = await newUser.save();
                    expiredTime = LoginController.resetExpiredTime(UserModel.get('_id'));
                }
                ctx.body = {
                    message: index_1.statusCode.success,
                    UserModel,
                    expiredTime //失效时间
                };
            }
            catch (error) {
                ctx.throw(500);
            }
        };
    }
    // 登录之后重设过期时间
    static async resetExpiredTime(_id) {
        // 后台过期时间，如果存在就重设
        // 不存在就默认是第一次登录（设置默认时间）
        // 直接更新过期时间就行了！
        let expiredTime = Date.parse(getDateAfter_1.default('', index_1.statusCode.expiredTime, '/'));
        await user_1.default.update({ _id }, {
            $set: {
                expiredTime
            }
        });
        return expiredTime;
    }
    useMobileLogin() {
        return async (ctx, next) => {
            const { body } = ctx.request;
            let user;
            // 不用用户名登录就是手机登录
            if (!global._.isEmpty(body.Mobile)) {
                user = await user_1.default.findOne({ Mobile: body.Mobile });
            }
            // 如果找不到用户，就报401
            if (global._.isEmpty(user)) {
                ctx.status = 401;
                ctx.body = {
                    message: '用户名或手机号错误'
                };
                return;
            }
            // 匹配密码是否相等
            // 使用中间件坐比较
            if (await bcrypt.compare(body.passWord, user.passWord)) {
                ctx.status = 200;
                let expiredTime;
                await LoginController.resetExpiredTime(user.get('_id')).then(result => {
                    expiredTime = result;
                }); // 设置过期时间
                ctx.body = {
                    message: index_1.statusCode.success,
                    user: user,
                    // 生成 token 返回给客户端
                    token: jwt.sign({
                        data: user,
                        // 设置 token 过期时间
                        exp: Math.floor(Date.now() / 1000) + 60 * 60 // 60 seconds * 60 minutes = 1 hour
                    }, 'secret'),
                    expiredTime
                };
            }
            else {
                ctx.status = 401;
                ctx.body = {
                    message: '密码错误'
                };
            }
        };
    }
    // token 验证
    //点击登录窗口弹出来验证
    tokenValid() {
        return async (ctx, next) => {
            const { token } = ctx.request.body;
            try {
                const decoded = jwt.verify(token, 'secret');
                // 过期
                if (decoded.exp <= Date.now() / 1000) {
                    ctx.body = {
                        status: 0,
                        msg: '登录状态已过期，请重新登录'
                    };
                    return;
                }
                if (decoded) {
                    // token is ok
                    ctx.body = {
                        status: 1,
                        msg: '登陆验证成功'
                    };
                    return;
                }
            }
            catch (e) {
                if (e) {
                    ctx.body = {
                        status: 0,
                        msg: e.message
                    };
                }
            }
        };
    }
}
exports.default = new LoginController();
//# sourceMappingURL=login.controller.js.map