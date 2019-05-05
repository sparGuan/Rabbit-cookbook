import DatavMeishichina, { IDatavMeishichina, IStuff } from '../../db/schema/datavMeishichina';
import DatavMeishichinaType, { IDatavMeishichinaType } from '../../db/schema/datavMeishichinaType';
const PromiseLimit = require('promise-limit');
const puppeteer = require('puppeteer');
const Crawler = require("crawler");
export declare interface IDatavMeishichinaService {
    // 爬取美食天下数据
    spidersService(): Promise<boolean>;
    // TODO: 爬取类别 动态脚本生成页面爬取
    spidersMeishichinaTypeService(): Promise<boolean>;
    hasDietTyerapy(keys: string[], val: string): boolean;
    queryDavavMeishiChinaListService(): any;
    queryDatavMeishichinaTypeService(): any;
}
export default class Datav_meishichinaService implements IDatavMeishichinaService {
    private datavListMeishichina: IDatavMeishichina[];
    private datavListMeishichinaType: IDatavMeishichinaType[]
    private datavMeishichina: IDatavMeishichina;
    private settings: any = {
        headless: true,
        defaultViewport: {
            width: 1200,
            height: 800
        }
    }
    // 爬取数据
    // TODO: 开一个线程，做一个定时任务，每天爬取网页数据一遍
    public async spidersMeishichinaTypeService(): Promise<boolean> {
        const browser = await puppeteer.launch(this.settings);
        let windowDom: any = null;
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(600000);
        // 监听 console
        page.on('console', (msg: any) => {
            for (let i = 0; i < msg.args().length; ++i) {
                console.log(`${i}: ${msg.args()[i]}`);
            }
        });
        // 遍历Dom 树
        await page.evaluateOnNewDocument(async () => {
            windowDom = window as any;
            windowDom.walkDOM = (node: any) => {
                if (node === null) {
                    return;
                }
                if (node.tagName === 'LI' && node.getAttribute("id") === 'navlist') {
                    const myEvent = new Event('mouseover');
                    node.dispatchEvent(myEvent);
                    // node.click()
                }
                node = node.firstElementChild;
                while (node) {
                    windowDom.walkDOM(node);
                    node = node.nextElementSibling;
                }
            }
        })
        await page.goto('https://home.meishichina.com/recipe.html')
        await page.waitForSelector('#navlist_sub').then(async () => {
            page.hover('#navlist');
        });

        await page.waitFor(1000);
        const result = await page.evaluate(async (body: any) => {
            const CNode = document.querySelectorAll('#navlist_sub div ul li>a[href]') as any;
            let aLinks = [...CNode];
            return aLinks.map((a: any) => {
                let name: string = a.innerText;
                let href: string = a.href;
                return {
                    href,
                    name
                }
            });
        })
        // 执行操作
        const names: string[] = global._.map(result, 'name');
        // 先去数据库查找数据
        const datavMeishichinaTypeList: IDatavMeishichinaType[] = await DatavMeishichinaType.find({
            name: { $in: names }
        });
        // 做个交集，重复剔除
        const result_filter: IDatavMeishichinaType[] = [];
        global._.each(result, (item: any) => {
            const matchItem = global._.find(datavMeishichinaTypeList, { name: item.name })
            if (!matchItem) {
                result_filter.push(item);
            }
        })
        const limit = PromiseLimit(5);
        await Promise.all(
            global._.map(result_filter, async (item: any) => limit(async () => {
                // 执行保存
                const datavMeishichinaType = new DatavMeishichinaType(item);
                return datavMeishichinaType.save();
            }))
        );
        return true;
    }
    // 判断是否是食疗分类
    public hasDietTyerapy(keys: string[], val: string): boolean {
        let hasDiet = false;
        global._.each(keys, (item: string) => {
            if (val.indexOf(item) > -1) {
                hasDiet = true;
            }
        })
        return hasDiet
    }
    public async spidersService(): Promise<boolean> {
        await this.spidersMeishichinaTypeService();
        setTimeout(() => {
            console.log('等待开始5秒执行...');
        }, 5000);
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
                                // 获取父级分类
                                const typehref = _$('#path a').eq(4).attr('href'); // 名称
                                let datavMeishichinaTypeParent: IDatavMeishichinaType | null = null;
                                if (typehref) {
                                    datavMeishichinaTypeParent = await DatavMeishichinaType.findOne({
                                        href: typehref
                                    });
                                }
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
                                            IStuff.num = _$(item).find('.category_s2').text() || '';
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
                                    type: datavMeishichinaTypeParent,
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
                        href: { $in: hrefs }
                    }).select('href')) as IDatavMeishichina[];
                    const map_hrefs = global._.map(this.datavListMeishichina, 'href');
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
        // 在此处寻找所有的分类数据
        const datavMeishichinaTypeList: IDatavMeishichinaType[] = await DatavMeishichinaType.find({}).select('href name');
        // const lanrenshipu_href = ['https://home.meishichina.com/recipe/lanrenshipu/'];
        // 获取完1级分类
        // 放置分页数据
        const datavMeishichinaTypeListHrefs = global._.map(datavMeishichinaTypeList, 'href');
        const child = [];
        for (let i = 0; i < datavMeishichinaTypeListHrefs.length; i++) {
            for (let j = 2; j < 100; j++) {
                if (this.hasDietTyerapy(['yuejingbutiao', 'bugai', 'pinxue', 'tigaomianyili', 'yangwei', 'duikangwumai', 'runfeizhike', 'ziyin', 'zhuangyang', 'shimian', 'yangyan', 'paidu', 'bianmi', 'shoushen', 'fengxiong', 'tongjing'], datavMeishichinaTypeListHrefs[i])) {
                    child.push(`${datavMeishichinaTypeListHrefs[i]}/${j}/`);
                } else if (this.hasDietTyerapy(['recipe-list', 'recipe-list-view-elite', 'recipe-list-view-collection', 'recipe-menu'], datavMeishichinaTypeListHrefs[i])) {
                    const prefx = datavMeishichinaTypeListHrefs[i].replace('.html', '');
                    child.push(`${prefx}-page-${j}.html`);
                }
                else {
                    child.push(`${datavMeishichinaTypeListHrefs[i]}/page/${j}/`);
                }
            }
        }
        c.queue([...datavMeishichinaTypeListHrefs, ...child]);
        return true
    }
    // 获取美食
    public async queryDavavMeishiChinaListService(): Promise<any> {
      this.datavListMeishichina = await DatavMeishichina.find({
      })
      .sort({ updatedAt: -1 })
      .limit(10)
      .exec()
      return this.datavListMeishichina
    }
    // 获取美食分类
    public async queryDatavMeishichinaTypeService(): Promise<any> {
      this.datavListMeishichinaType = await DatavMeishichinaType.find({
      })
      return this.datavListMeishichinaType
    }
}
