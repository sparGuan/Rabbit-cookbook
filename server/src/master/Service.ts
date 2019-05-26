import moment = require('moment');
import mongoose = require('mongoose');
const { isValid } = require('mongoose').Types.ObjectId;
import responseJSON from '../utils/responseJSON';
// 公共服务层
export default class Service<T> {
    private Mirror: any; // 需要执行业务时使用的属性
    private MirrorList: any[]; // 需要执行业务时使用的属性
    // public genericSingleDieService: (identity: T, d: any) => T;
    // 生成全局的点赞业务处理
    // 生成一个全局的装饰器 》》》》后面再去封装
	/**
	 * @param {object} class 操作点赞，足迹等业务的执行操作的类
	 * @param {object} data 操作点赞，足迹等业务的数据
	 */
    public async genericSingleDieService(Identity: any, Child: any, data: any): Promise<boolean> {
        try {
            const today: string = moment().format('L') as string;
            const acceptUser = (data.acceptUser = mongoose.Types.ObjectId(data.acceptUserId));
            const user = (data.user = mongoose.Types.ObjectId(data.userId));
            // TODO: 此处要判断是动态业务处理还是活动业务处理
            // 如果是动态业务处理进行动态业务处理
            // 如果是活动业务处理进行活动业务处理
            const condition: any = {
                acceptUser,
                user,
                create_at: { $gte: today },
                type: Number(data.type),
            };
            if (!global._.isEmpty(data.dynamicId)) {
                condition.dynamic = mongoose.Types.ObjectId(data.dynamicId);
            } else if (!global._.isEmpty(data.activityId)) {
                condition.activity = mongoose.Types.ObjectId(data.activityId);
            }
            this.MirrorList = (await Child.find(condition)) as any[];
            if (this.MirrorList.length === 0) {
                // 插入数据
                if (!global._.isEmpty(data.dynamicId)) {
                    data.dynamic = mongoose.Types.ObjectId(data.dynamicId);
                } else if (!global._.isEmpty(data.activityId)) {
                    data.activity = mongoose.Types.ObjectId(data.activityId);
                }
                this.Mirror = new Child(data);
                await this.Mirror.save();
                if (!global._.isEmpty(Identity)) {
                    // 活动ID或者动态id
                    const _id = data.dynamicId || data.activityId;
                    console.log(`即将被更新的数据id是：${_id}`);
                    // 给被看动态的用户点赞 +1
                    const rootTable = (await Identity.findById(_id)) as any;
                    // 类型是0就是点赞，1是分享到足迹
                    if (data.type === '0') {
                        if (!global._.isEmpty(rootTable)) {
                            console.log(`该${rootTable._id}表被更新了`);
                            await rootTable.update(
                                {
                                    $inc: {
                                        'meta.totalPraise': 1,
                                    },
                                },
                                { new: true }
                            );
                        }
                    } else if (data.type === '1') {
                        if (!global._.isEmpty(rootTable)) {
                            console.log(`该${rootTable._id}表被更新了`);
                            await rootTable.update(
                                {
                                    $inc: {
                                        'meta.totalFootprint': 1,
                                    },
                                },
                                { new: true }
                            );
                        }
                    }
                }
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
	/**
	 * 查询所有用户今天操作过的点赞获取分享足迹的数据
	 * @param Identity
	 * @param Child
	 * @param data
	 * @param searchAble 表名
	 */
    public async queryDieByTodayCount(DieIdentity: any, data: any): Promise<string[]> {
        const ids: string[] = [];
        const acceptUser = mongoose.Types.ObjectId(data.acceptUserId);
        const today: string = moment().format('L') as string;
        this.MirrorList = (await DieIdentity.find({
            acceptUser,
            create_at: { $gte: today },
            type: Number(data.type),
        }).select(data.searchAble)) as any[];
        // 判断存在什么类型
        this.MirrorList.forEach(item => {
            if (isValid(item.dynamic)) {
                ids.push(item.dynamic.toString());
            } else if (isValid(item.activity)) {
                ids.push(item.activity.toString());
            }
        });
        console.log(`点赞的ids的个数是${ids.length}`);
        return ids;
    }
    // 获取前端参数列表
    public getParameters(ctx: any, model: any): any {
        const result = {} as any;
        if (model) {
            const params = ctx.request.body;
            global._.each(model, (v: any, k: string) => {
                // module里面有request里面没有的情况下
                // 前端参数丢失
                if (this.validate(k, params[k], ctx)) {
                    if (model[k].required && global._.isEmpty(params[k])) {
                        // 如果是空的并且非空
                        ctx.body = responseJSON(400, `MISSING_PARAMS_${k.toLocaleUpperCase()}`);
                        return false;
                    } else if (global._.isEmpty(params[k]) && !global._.isEmpty(model[k].default)) {
                        // 赋予默认值
                        if (typeof model[k].default === 'function') {
                            return true;
                        }
                        result[k] = model[k].default;
                    } else {
                        // 赋值
                        if (params[k]) {
                            // 进行转换类型控制判断
                            if (typeof params[k] === typeof model[k].default) {
                                result[k] = params[k];
                            } else {
                                // 强行转换
                                switch (typeof model[k].default) {
                                    case 'string':
                                        result[k] = String(params[k]);
                                        break;
                                    case 'number':
                                        result[k] = Number(params[k]);
                                        break;
                                    default:
                                        result[k] = String(params[k]);
                                        break;
                                }
                            }
                        }
                    }
                }
            });
        }
        return result;
    }
	/**
	 * 格式化验证
	 * @param key 邮箱，手机号
	 * @param val 验证格式化的值
	 */
    public validate(key: string, val: string, ctx: any) {
        switch (key) {
            case 'Mobile':
                // 验证手机号
                if (!/^1[34578]\d{9}$/.test(val)) {
                    console.log('手机号验证错误');
                    ctx.body = responseJSON(401, `VALIDATION_FAILED_MOBILE`);
                    return false;
                } else {
                    return true;
                }
            case 'passWord':
                // 验证手机号
                if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(val)) {
                    console.log('密码输入错误');
                    ctx.body = responseJSON(401, `VALIDATION_FAILED_PASSWORD`);
                    return false;
                } else {
                    return true;
                }
            case 'email':
                // 验证手机号
                if (!/^1[34578]\d{9}$/.test(val)) {
                    console.log('邮箱验证错误');
                    ctx.body = responseJSON(401, `VALIDATION_FAILED_EMAIL`);
                    return false;
                } else {
                    return true;
                }
            case 'iDNumber':
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (!reg.test(val)) {
                    console.log('身份证号错误');
                    ctx.body = responseJSON(401, `VALIDATION_FAILED_IDNNUMBER`);
                    return false;
                } else {
                    return true;
                }
            default:
                return true;
        }
    }
    /**
     * 格式化输出到前端
     * @param code
     * @param msg
     * @param data
     */
    public response(code: number, msg: string, data?: any): {} {
        const result = {
            error_code: code,
            error_msg: msg
        } as any;
        if (data) {
            result.data = data;
        }
        return result;
    }
}
