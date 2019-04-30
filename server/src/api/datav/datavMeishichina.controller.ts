import { statusCode } from '../../config/index';
import Datav_meishichina, { IDatavMeishichina } from '../../db/schema/datavMeishichina';
import DatavMeishichinaService, { IDatavMeishichinaService } from './datavMeishichina.service';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
// 此处需要的是路由
class Datav_meishichinaController extends BASE_OPEN_SOURCE_API<DatavMeishichinaService, IDatavMeishichina> {
    private DatavMeishichinaService: IDatavMeishichinaService;
    constructor(model: any) {
        super(model)
        this.DatavMeishichinaService = new DatavMeishichinaService()
    }
    // 实现业务，爬取远程网站页面数据进行分析，录入数据库
    public spiders() {
        return async (ctx: any) => {
            // 爬取数据，录入
            // ctx.body = await this.DatavMeishichinaService.spidersMeishichinaTypeService()
            ctx.body = await this.DatavMeishichinaService.spidersService()
        };
    }
}
export default new Datav_meishichinaController(Datav_meishichina);
