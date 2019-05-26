// 声明一个控制器接口接口
// 公共业务处理控制器
export default interface IController {
    // <T>(arg: T): T;
    // ?是可选参数
    genericSingleDie<M, T>(root?: M, child?: T, data?: {}): Promise<boolean>;
    // TODO: 查询中间表<die> 所有该用户今天操作过的动态的赞
    queryDieByTodayCount<M>(DieIdentity?: M, data?: {}): Promise<string[]>;
    // 获取前端参数
    getParameters(ctx: any, model?: any): any;
    response(code: number, msg: string, data?: any): {code: string, msg: string, data?: any};
}
