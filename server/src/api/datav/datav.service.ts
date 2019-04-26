import Datav, { IDatav } from '../../db/schema/datav';
import { statusCode, userAgents } from '../../config/index';
var Crawler = require("crawler");
export default class DatavService {
    private datavList: IDatav[];
    private userAgent: string = userAgents[Math.random() * userAgents.length];
    // 爬取数据
    public async spidersService() {
        const c = new Crawler({
            maxConnections : 10,
            jQuery: true, // set false to suppress warning message.
            // This will be called for each crawled page
            callback :  (error: any, res: any, done: any) => {
                if (error){
                    console.log(error);
                }else{
                    const $ = res.$;
                    const hrefs: string [] = []; // $('#J_list .detail a').attr('href');
                    $('#J_list .detail a').each((key: number, item: any) => {
                        hrefs.push(item.attribs.href);
                    })
                    // 去获取所有a标签的子页面
                    const child_crawler = new Crawler({
                        maxConnections : 10,
                        jQuery: true, // set false to suppress warning message.
                        // This will be called for each crawled page
                        callback :  (_error: any, _res: any, _done: any) => {
                            if (_error){
                                console.log(_error);
                            }else{
                                const _$ = _res.$;
                                // 将匹配到的数据进行插入数据库
                                // 小图
                                // 名称
                                // 描述
                                // 烹饪时间
                                // 味道
                                // 做法
                                const data_arr = [];
                                const name = _$('.recipe_De_title a').text(); // 名称
                                const big_image = _$('.recipe_De_imgBox img').attr('src') || '' // 大图
                                const purchase_details: any [] = []; // 材料详细
                                // 遍历主料
                                _$('.recipeCategory_sub_R ul li').each((key: number, item: any) => {
                                    const IStuff: any = {}
                                    IStuff.name = _$(item).find('.category_s1 b').text() || '',
                                    IStuff.num = _$(item).find('.category_s2 b').text() || '',
                                    IStuff.type = 0 // 主料
                                    purchase_details.push(IStuff)
                                });
                                // 遍历辅料
                                // $('.recipeCategory_sub_R ul li').each((key: number, item: any) => {
                                //     const IStuff: any = {}
                                //     IStuff.name = item.find('.category_s1 b').text() || '',
                                //     IStuff.num = item.find('.category_s2 b').text() || '',
                                //     IStuff.type = 0 // 主料
                                //     purchase_details.push(IStuff)
                                // });
                                // const IStuff = {
                                //     name: $('.category_s1 b').text(),

                                // }
                                // console.log(res.body)
                            }
                            _done();
                        }
                    });
                    child_crawler.queue(hrefs);
                }
                done();
            }
        });
        // 遵循先入后出了
        // 先去拉所有a标签，再去获取a标签里面的链接的详情页
        c.queue(['https://home.meishichina.com/recipe/lanrenshipu/']);
        return true
    }
}
