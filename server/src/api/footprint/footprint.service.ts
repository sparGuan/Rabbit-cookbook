import mongoose = require('mongoose');
import Footprint, { IFootprint } from '../../db/schema/footprint';
import Dynamic, { IDynamic, IDynamicComment } from '../../db/schema/dynamic';
import Activity, { IActivity } from '../../db/schema/activity';
import { statusCode } from '../../config/index';
const axios = require("axios");
export default class FootprintService {
    private Footprint: any;
    private footprintList: any;
    private dynamicList: IDynamic[];
    private activityList: IActivity[];
    public async saveFootprintService(body: any) {
        // 进来就证明，已经往统计增加了一条数据
        // 保存到足迹表
        const data = {} as any
        if (body.footprintType === '0') {
            // 动态数据类型为0
            data.footprintType = Number(body.footprintType)
            data.sourceDataId = body.sourceDataId // 来源哪张表，就获取该数据的id
            data.user = mongoose.Types.ObjectId(body.acceptUserId)
            data.linkType = Number(body.linkType)
            this.Footprint = new Footprint(data);
            this.Footprint = await this.Footprint.save();
        }
    }
    public async queryFootPrintListService() {
        // 足迹数据列表
        this.footprintList = await Footprint.paginate({
        }, {
          populate: { path: 'user', select: 'headImg nickName' },
          sort: { create_at: -1 },
          offset:   0,
          limit:    10
        }) as any;
        if (this.footprintList.docs.length > 0) {
            // 对该10条足迹进行分类
            const dynamicTypeIds: any = [] // 动态类型
            const activityTypeIds: any = [] // 活动类型
            const linkTypeMap: any[] = []; // 2：有视频的类型; 0：单图文的类型; 1：纯文本的类型; 3：多图文灯箱的类型
            // 分类筛选数据
            // 动态类型为一组
            // 活动类型为一组
            this.footprintList.docs.forEach((item: any) => {
                linkTypeMap.push({
                    sourceDataId: item.sourceDataId,
                    linkType: item.linkType,
                    footprintType: item.footprintType
                })
                switch (item.footprintType) {
                    case 0:
                        dynamicTypeIds.push(mongoose.Types.ObjectId(item.sourceDataId))
                        break;
                    case 1:
                        activityTypeIds.push(mongoose.Types.ObjectId(item.sourceDataId))
                        break;
                    default:
                        break;
                }
            })
            // 分好类型之后。。。。
            // 向数据库发起5次请求
            // 查询动态表
            if (dynamicTypeIds.length > 0) {
                this.dynamicList = (await Dynamic.find({
                    _id: { $in: dynamicTypeIds }
                })
                    .populate({ path: 'user', select: 'headImg nickName' })
                    .sort({ create_at: -1 }).exec()) as IDynamic[];
            } else {
                this.dynamicList = []
            }
            if (activityTypeIds.length > 0) {
                this.activityList = (await Activity.find({
                    _id: { $in: activityTypeIds }
                })
                    .populate({ path: 'user', select: 'headImg nickName' })
                    .sort({ create_at: -1 }).exec()) as IActivity[];
            } else {
                this.activityList = []
            }
            let footprintAllList: any[] = [...this.dynamicList, ...this.activityList]
            // 动态，活动等等数据进行合并处理
            footprintAllList = footprintAllList.map((item: any) => {
                linkTypeMap.forEach(elem => {
                    if (elem.sourceDataId.toString() === item._id.toString()) {
                        item._doc.linkType = elem.linkType
                        item._doc.footprintType = elem.footprintType
                    }
                })
                return item
            })
            // 最终将整个数组返回前端
            this.footprintList.docs = footprintAllList
            return this.footprintList
        } else {
            return statusCode.noOne
        }
    }
    /**
       * 获取新闻列表
       */
    public async getNewList(): Promise<any[]> {
        let path
        // 0 热点新闻 1 社会新闻 2 娱乐新闻 3体育新闻 4美文 散文 5科技 6 财经 7 时尚
        const promiseAll = []
        for (let i = 0; i < 10; i++) {
            switch (Math.floor(Math.random() * 10)) {
                case 1:
                    path =
                        '/list/?tag=news_hot&ac=wap&count=1&format=json_raw&as=A1A59982B911729&cp=5929E12752796E1&min_behot_time=0'
                    break
                case 2:
                    path =
                        '/list/?tag=news_society&ac=wap&count=1&format=json_raw&as=A195B9F229018CD&cp=592991783C9D8E1&min_behot_time=0'
                    break
                case 3:
                    path =
                        '/list/?tag=news_entertainment&ac=wap&count=1&format=json_raw&as=A1C51992996195E&cp=5929D119B58EFE1&min_behot_time=0'
                    break
                case 4:
                    path =
                        '/list/?tag=news_sports&ac=wap&count=1&format=json_raw&as=A1054902B911A1E&cp=592991AA81AEAE1&min_behot_time=0'
                    break
                case 5:
                    path =
                        '/list/?tag=news_essay&ac=wap&count=1&format=json_raw&as=A195495279C19DE&cp=5929C1F91DFEEE1&min_behot_time=0'
                    break
                case 6:
                    path =
                        '/list/?tag=news_tech&ac=wap&count=1&format=json_raw&as=A1854972BABC6FF&cp=592A9CC64FCFAE1&max_behot_time=0'
                    break
                case 7:
                    path =
                        '/list/?tag=news_finance&ac=wap&count=1&format=json_raw&as=A145E9025A6C78B&cp=592ACC87687B1E1&max_behot_time=0'
                    break
                case 8:
                    path =
                        '/list/?tag=news_fashion&ac=wap&count=1&format=json_raw&as=A1353902AA9C7F9&cp=592ADCD7CF89AE1&max_behot_time=0'
                    break
                default:
                    path =
                        '/list/?tag=news_hot&ac=wap&count=1&format=json_raw&as=A1A59982B911729&cp=5929E12752796E1&min_behot_time=0'
            }
            let host = 'm.toutiao.com'
            // false:http请求  true:https请求
            console.log('m.toutiao.com' + path)
            promiseAll.push(axios.get(`${host}${path}`, {
                params: {
                }
            }) as any)
            // 返回10条搜索结果源
        }
        return await Promise.all(promiseAll)
    }
}
