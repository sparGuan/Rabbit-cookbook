import DirExistUtils from '../../utils/DirExistUtils';
import * as jwt from 'jsonwebtoken';
import getDateAfter from '../../utils/getDateAfter';
import User, { IUser } from '../../db/schema/user';
import { qsms, statusCode, secret } from '../../config/index';
const bluebird = require('bluebird');
const { isValid } = require('mongoose').Types.ObjectId;
const bcrypt = bluebird.promisifyAll(require('bcryptjs'), { suffix: '$' });
import Qsms = require('qcloudsms_js');
import formidable = require('formidable');

// 后期利用装饰器加入继承微服务架构
export default class LoginService {
    private qsms: any;
    private user: IUser;
    private userInfo: any;
    private saltRounds = 5;
    private message: string;
    private valid: string;
    private expiredTime: number;
    constructor() {
        this.qsms = new Qsms(qsms.appid, qsms.appkey);
    }
    /**
     * 手机验证码验证
     * @param body
     */
    public async msgValidService(body: any) {
        try {
            this.user = (await User.findOne({ Mobile: body.Mobile })) as IUser;
            // 如果是注册用户就要进入该判断
            if (!global._.isEmpty(this.user) && body.register === true) {
                // 如果存在
                return this.message = '该手机号已经被注册';
            }
            this.valid = global._.random(999999);
            const smsType = 0; // Enum{0: 普通短信, 1: 营销短信}
            const ssender = this.qsms.SmsSingleSender();
            await ssender.send(
                smsType,
                86,
                body.Mobile,
                `您的验证码${this.valid}，此验证码10分钟内有效，请勿向他人泄露`,
                '',
                '',
                () => ({})
            );
            return this.valid
        } catch (error) {
            throw error
        }
    }
    /**
     * 使用QQ或者微信登录
     * @param body
     */
    public async useWxOrQQLoginService(body: any) {
        try {
            // 没有账号密码直接报400
            // 微信 QQ登录的自动创建账号密码
            this.user = (await User.findOne(
                { openid: body.openid }
            )) as IUser;
            if (global._.isEmpty(this.user)) {
                const salt = await bcrypt.genSalt$(this.saltRounds);
                body.passWord = await bcrypt.hash$(body.openid, salt);
                body.token = jwt.sign(
                    {
                        data: body.openid // 但三方登录使用openid作为token
                    },
                    secret,
                    { expiresIn: '7d' }
                );
                this.user = new User(body);
                this.user = (await this.user.save()) as IUser;
                console.log('保存成功')
                console.log(`QQ登录成功！！`)
            } else {
                this.user = (await User.findByIdAndUpdate(
                    { _id: this.user._id },
                    {
                        $set: {
                            location: body.location.map((element: string) => {
                                return Number(element);
                            }),
                            token: jwt.sign(
                                {
                                    data: body.openid
                                },
                                secret,
                                { expiresIn: '7d' }
                            )
                        }
                    },
                    { new: true }
                ).select('-passWord -updatedAt -logoutTime -createAt ')) as IUser;
                console.log('更新成功')
                console.log(`QQ登录成功！！`)
            }
            return this.user
            // ctx.body = {
            //   message: statusCode.success,
            //   user: this.user
            // };
        } catch (error) {
            throw error
        }
    }
    /**
     * 更新用户信息
     * @param req
     */
    public async updateUserInfoService(req: any) {
        try {
            const form = new formidable.IncomingForm();
            return await new Promise((reslove: any, reject: any) => {
                form.parse(req, async (err: any, fields: any, files: any) => {
                    if (err) {
                        reject(err);
                    }
                    if (Object.keys(fields).length > 0) {
                        this.userInfo = JSON.parse(fields.userInfo);
                        if (Object.keys(files).length > 0) {
                            const filePaths = await DirExistUtils.uploadFileCommon(files);
                            if (!global._.isEmpty(filePaths.headImg)) {
                                this.userInfo.headImg = filePaths.headImg;
                            }
                            if (!global._.isEmpty(filePaths.headBgImg)) {
                                this.userInfo.headBgImg = filePaths.headBgImg;
                            }
                        }
                        const _id: string = this.userInfo.userId;
                        if (!global._.isEmpty(_id) && isValid(_id)) {
                            // 有ID就update
                            this.user = (await User.findByIdAndUpdate(_id, this.userInfo, {
                                new: true
                            })
                                .populate({
                                    path: 'friends',
                                    select: ' headImg nickName descPerson sex '
                                })
                                .populate({
                                    path: 'requestList',
                                    select: '-passWord -updatedAt -logoutTime -createAt'
                                }).select(
                                    '-passWord -updatedAt -logoutTime -createAt '
                                )) as IUser;
                            reslove(this.user);
                        }
                    } else {
                        reslove({});
                    }
                });
            });
        } catch (error) {
            throw error
        }
    }
    /**
     *
     * @param userId 更新登录市场，地址信息
     * @param location
     */
    public async updateLoginInfo(userId: any, location: any) {
        try {
            if (!global._.isEmpty(userId) && isValid(userId)) {
                const expiredtime: number = Date.parse(
                    getDateAfter('', statusCode.expiredTime, '/')
                );
                this.userInfo = {
                    $set: {
                        updatedAt: new Date(), // 更新时间
                        location: location.map((element: string) => {
                            return Number(element);
                        }), // 更新当前位置
                        expiredTime: expiredtime // 更新报废时长
                    }
                };
                this.user = (await User.findByIdAndUpdate(userId, this.userInfo, {
                    new: true
                })
                    .select('-passWord -updatedAt -logoutTime -createAt ')
                    .populate({
                        path: 'friends',
                        select: ' headImg nickName descPerson sex '
                    })
                    .populate({
                        path: 'requestList',
                        select: '-passWord -updatedAt -logoutTime -createAt'
                    })) as IUser;
                return this.user
            }
        } catch (error) {
            throw error
        }
    }
    /**
     * 手机注册
     * @param body
     */
    public async registerService(body: { passWord: number, token: string, Mobile: number }) {
        const salt = await bcrypt.genSalt$(this.saltRounds);
        body.passWord = await bcrypt.hash$(body.passWord, salt);
        body.token = jwt.sign(
            {
                data: body.Mobile
            },
            secret,
            { expiresIn: '7d' }
        );
        this.user = new User(body) as IUser;
        const UserModel = await this.user.save();
        return UserModel
    }
}
