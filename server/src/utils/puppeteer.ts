const puppeteer = require('puppeteer');
const PromiseLimit = require('promise-limit');
import DatavMeishichinaType, { IDatavMeishichinaType } from '../db/schema/datavMeishichinaType';
require('./cycle.js')
const JSONPARSE = JSON as any;
// const _ = require('lodash');
const settings = {
    headless: true,
    defaultViewport: {
        width: 1200,
        height: 800
    }
}
// 注册windows并且执行悬停事件
export const main = async () => {
    const browser = await puppeteer.launch(settings)
    let windowDom: any = null;
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(600000)
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
    const bodyHandle = JSONPARSE.decycle({_: global._, DatavMeishichinaType})
    console.log(bodyHandle)
    // const bodyHandle = await page.$('body');
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
    console.log(result)
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
    console.log(result_filter)
    await Promise.all(
        global._.map(result_filter, async (item: any) => limit(async () => {
            // 执行保存
            const datavMeishichinaType = new DatavMeishichinaType(item);
            return datavMeishichinaType.save();
        }))
    );
}
