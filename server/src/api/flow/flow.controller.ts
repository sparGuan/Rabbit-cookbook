import { statusCode } from '../../config/index';
import Flow, { IFlow } from '../../db/schema/flow';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
import flowService from './flow.service';
import DynSingleDie, { IDynSingleDie } from '../../db/schema/dynSingleDie';
// 此处需要的是路由
class FlowController extends BASE_OPEN_SOURCE_API<flowService, IFlow>  {
    private flowService: any;
    constructor(model: any) {
        super(model)
        this.flowService = new flowService()
    }
    /**
       *  实现
       */
    public saveFlow() {
        return async (ctx: any) => {
            // 让异步变同步
            const { body } = ctx.request;
            // 先判断是否可以关注 ---> 已关注之后就无需再关注了
            // 可以关注的分享
            // 将数据保存进行业务处理
            // * 关注的东西未必是动态
            // 此处判断进来的是啥类型，获取该类型的module进行下一步操作表
            // body里面必须包含Type： 0点赞 1足迹 2关注
            const canFlow = await this.genericSingleDie('', DynSingleDie, body);
            if (canFlow) {
                // 进来就证明，已经往统计增加了一条数据
                // 保存一条数据
                await this.flowService.saveflowService(body)
                ctx.body = {
                    message: statusCode.success
                };
            } else {
                ctx.body = {
                    message: statusCode.error
                };
            }
        };
    }
}
export default new FlowController(Flow); 
