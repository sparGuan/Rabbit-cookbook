import DatavMeishichina, { IDatavMeishichina, IStuff } from '../../db/schema/datavMeishichina';
import DatavMeishichinaType, { IDatavMeishichinaType } from '../../db/schema/datavMeishichinaType';
import { statusCode } from '../../config/index';
const PromiseLimit = require('promise-limit');

const Crawler = require("crawler");
export declare interface IDatavMeishichinaService {
    // 爬取美食天下数据
    spidersService(): Promise<boolean>;
    // TODO: 爬取类别
    spidersMeishichinaTypeService(): Promise<boolean>;
}
export default class Datav_meishichinaService implements IDatavMeishichinaService {
    private datavListMeishichina: IDatavMeishichina[];
    private datavMeishichina: IDatavMeishichina;
    private datavMeishichinaType: IDatavMeishichinaType
    // 爬取数据
    // TODO: 开一个线程，做一个定时任务，每天爬取网页数据一遍
    public async spidersMeishichinaTypeService(): Promise<boolean> {
        const c = new Crawler({
            maxConnections: 10,
            jQuery: true,
            callback: async (error: any, res: any, done: any) => {
                const $ = res.$;
                const limit = PromiseLimit(5);
                console.log($('.nav_wrap2').html())
                await Promise.all(
                    $('#navlist #navlist_sub>div ul li>a').map(async (i: number, el: any) => limit(async () => {
                        const href = $(el).attr('href');
                        const name = $(el).text();
                        // 执行保存
                        this.datavMeishichinaType = new DatavMeishichinaType({ name, href });
                        // 剔除已经存在的名称
                        const datavMeishichinaType = DatavMeishichinaType.findOne({
                            name
                        });
                        if (!datavMeishichinaType) {
                            return this.datavMeishichinaType.save();
                        };
                        return () => {};
                    }))
                );
            }
        })
        c.queue(['https://home.meishichina.com/recipe.html']);
        return true;
    }
    public async spidersService(): Promise<boolean> {
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
                        callback: async (_error: any, _res: any, _done: any) => {
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
                                const name = _$('.recipe_De_title a').text(); // 名称
                                const big_image = _$('.recipe_De_imgBox img').attr('src') || '' // 大图
                                const purchase_details: IStuff[] = []; // 材料详细
                                let taste = ''; // 口味
                                let cook_time = ''; // 耗时
                                const images: string[] = [];
                                const practice: string[] = [];
                                const href = _$('.recipe_De_title a').attr('href');
                                if (global._.isEmpty(href) || global._.isEmpty(name)) {
                                    return false;
                                }
                                // 遍历主料
                                _$('.recipeCategory_sub_R').each((key: number, item: any) => {
                                    if (key < 2) {
                                        _$(item).find('ul li').each((key: number, item: any) => {
                                            const IStuff: any = {} // 材料
                                            IStuff.type = key // 主料 辅料
                                            IStuff.name = _$(item).find('.category_s1 b').text() || '';
                                            IStuff.num = _$(item).find('.category_s2 b').text() || '';
                                            purchase_details.push(IStuff);
                                        })
                                    } else {
                                        // 设置口味
                                        taste = _$(item).find('ul li:first-child a').text() || '';
                                        // 设置耗时
                                        cook_time = _$(item).find('ul li').eq(2).find('.category_s1').text() || '';
                                    }
                                })
                                _$('.recipeStep li').each((key: number, item: any) => {
                                    if (_$(item).find('img').attr('src')) { // 获取小图
                                        images.push(_$(item).find('img').attr('src'))
                                    }
                                    practice.push(_$(item).find('.recipeStep_word').text()) // 获取
                                });
                                // 保存一条数据
                                this.datavMeishichina = new DatavMeishichina({
                                    href,
                                    name,
                                    big_image,
                                    purchase_details,
                                    taste,
                                    cook_time,
                                    images,
                                    practice
                                })
                                // 保存数据
                                this.datavMeishichina = await this.datavMeishichina.save();
                            }
                            _done();
                        }
                    });
                    // 是否已经被爬取过，如果已经被爬取过，就不进行二次爬取
                    // tslint:disable-next-line: await-promise
                    this.datavListMeishichina = (await DatavMeishichina.find({
                        hrefs: { $in: hrefs }
                    })) as IDatavMeishichina[];
                    const map_hrefs = global._.map(this.datavListMeishichina, 'hrefs');
                    // 做个交集，重复剔除
                    const read_hrefs = [...new Set([...map_hrefs, ...hrefs])];
                    // 保存进数据库
                    child_crawler.queue(read_hrefs);
                }
                done();
            }
        });
        // 遵循先入后出了
        // 先去拉所有a标签，再去获取a标签里面的链接的详情页
        const lanrenshipu_href = ['https://home.meishichina.com/recipe/lanrenshipu/'];
        for (let i = 2; i < 999; i++) {
            lanrenshipu_href.push(`https://home.meishichina.com/recipe/lanrenshipu/page/${i}/`);
        }
        c.queue(lanrenshipu_href);
        return true
    }
}
