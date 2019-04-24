import IController from './Controller';
import Service from './Service';
// 所有公开API库
export default class BASE_OPEN_SOURCE_API<S, M> implements IController {
    private BaseService: any;
    private BaseModel: M;
    constructor(Model: M) {
        this.BaseService = new Service<S>();
        this.BaseModel = Model;
    }
    // 总主干
    // 先有默认的Controller
    // 然后提供接口重写该Controller
    // 实现业务 ===》 点赞
    public async genericSingleDie<M, T>(root: M, child: T, data?: {}): Promise<boolean> {
        const canZan = await this.BaseService.genericSingleDieService(root, child, data)
        return canZan
    }
    public async queryDieByTodayCount<M>(root: M, data?: {}): Promise<string[]> {
        return await this.BaseService.queryDieByTodayCount(root, data)
    }
    /**
     * 通用获取前端参数
     * @param ctx 域
     */
    public getParameters(ctx: any): any {
        return this.BaseService.getParameters(this.BaseModel, ctx)
    }
}
