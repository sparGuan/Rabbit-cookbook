import { statusCode } from '../../config/index';
import DatavMeishichina, { IDatavMeishichina } from '../../db/schema/datavMeishichina';
import DatavMeishichinaService, { IDatavMeishichinaService } from './datavMeishichina.service';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
// 此处需要的是路由
class DatavMeishichinaController extends BASE_OPEN_SOURCE_API<DatavMeishichinaService, IDatavMeishichina> {
    private DatavMeishichinaService: IDatavMeishichinaService;
    constructor(model: any) {
        super(model)
        this.DatavMeishichinaService = new DatavMeishichinaService()
    }
    // 实现业务，爬取远程网站页面数据进行分析，录入数据库
    public queryDavavMeishiChinaList() {
        return async (ctx: any) => {
            // 爬取数据，录入
            const respone = await this.DatavMeishichinaService.queryDavavMeishiChinaListService()
            return ctx.body = this.response(0, 'SUCCESS', respone);
        };
    }
    public queryDatavMeishichinaTypeList() {
      return async (ctx: any) => {
        const respone = await this.DatavMeishichinaService.queryDatavMeishichinaTypeService()
        return ctx.body = this.response(0, 'SUCCESS', respone);
      };
    }
}
export default new DatavMeishichinaController(DatavMeishichina);
