import { statusCode } from '../../config/index';
import Datav, { IDatav } from '../../db/schema/datav';
import DatavService from './datav.service';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
// 此处需要的是路由
class datavController extends BASE_OPEN_SOURCE_API<DatavService, IDatav> {
    private datav: IDatav;
    private datavList: IDatav[];
    private datavService: any;
    constructor(model: any) {
        super(model)
        this.datavService = new DatavService()
    }
    // 实现业务，爬取远程网站页面数据进行分析，录入数据库
    public spiders() {
        return async (ctx: any) => {
            // 爬取数据，录入
            ctx.body = await this.datavService.spidersService()
        };
    }
}
export default new datavController(Datav);
