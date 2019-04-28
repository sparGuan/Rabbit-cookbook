import Datav, { IDatav } from '../../db/schema/datav';
import { statusCode } from '../../config/index';
const Crawler = require("crawler");
export default class DatavService {
    private datavList: IDatav[];
    // 爬取数据
    public async spidersService() {
        const c = new Crawler({
            maxConnections: 10,
            jQuery: true, // set false to suppress warning message.
            // This will be called for each crawled page
            callback: async (error: any, res: any, done: any) => {
                if (error) {
                    console.log(error);
                } else {
                    const $ = res.$;
                    const hrefs: string[] = []; // $('#J_list .detail a').attr('href');
                    $('#J_list .detail a').each((key: number, item: any) => {
                        hrefs.push(item.attribs.href);
                    })
                    // 去获取所有a标签的子页面
                    const child_crawler = new Crawler({
                        maxConnections: 10,
                        jQuery: true, // set false to suppress warning message.
                        // This will be called for each crawled page
                        callback: (_error: any, _res: any, _done: any) => {
                            if (_error) {
                                console.log(_error);
                            } else {
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
                                const purchase_details: any[] = []; // 材料详细
                                let taste = ''; // 口味
                                let cook_time = ''; // 耗时
                                const images: string[] = [];
                                const practice: string[] = [];
                                // 遍历主料
                                _$('.recipeCategory_sub_R').each((key: number, item: any) => {
                                    if (key < 2) {
                                        const IStuff: any = {} // 材料
                                        IStuff.type = key // 主料 辅料
                                        _$(item).find('ul li').each((key: number, item: any) => {
                                            IStuff.name = _$(item).find('.category_s1 b').text() || '',
                                                IStuff.num = _$(item).find('.category_s2 b').text() || '',
                                                purchase_details.push(IStuff)
                                        })
                                    } else {
                                        // 设置口味
                                        taste = _$(item).find('ul li:first-child a').text() || '';
                                        // 设置耗时
                                        cook_time = _$(item).find('ul li').eq(2).text() || '';
                                    }
                                })
                                _$('.recipeStep li').each((key: number, item: any) => {
                                    if (_$(item).find('img').attr('src')) { // 获取小图
                                        images.push(_$(item).find('img').attr('src'))
                                    }
                                    practice.push(_$(item).find('.recipeStep_word').text()) // 获取
                                })
                            }
                            _done();
                        }
                    });
                    // 是否已经被爬取过，如果已经被爬取过，就不进行二次爬取
                    // tslint:disable-next-line: await-promise
                    this.datavList = (await Datav.find({
                        hrefs: { $in: hrefs }
                    })) as IDatav [];
                    const map_hrefs = global._.map(this.datavList, 'hrefs');
                    // 做个交集，重复剔除
                    const read_hrefs = [...new Set([...map_hrefs, ...hrefs])]
                    child_crawler.queue(read_hrefs);
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
