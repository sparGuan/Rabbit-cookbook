// TODO: 执行沙箱代码，执行爬虫
import { Safeify } from "safeify";
const schedule = require('node-schedule');
import DatavMeishichinaService, { IDatavMeishichinaService } from '../api/datav/datavMeishichina.service';

const safeifymeishichina = async () =>{
  // 创建 safeify 实例
  const safeVm = new Safeify({
    timeout: 3000,
    asyncTimeout: 60000
  });
  const datavMeishichinaService: IDatavMeishichinaService = new DatavMeishichinaService();
  // 定义 context
  const context = {
    system: {
      meishisanbox() {
        return datavMeishichinaService.spidersService();
      }
    }
  };
  // 执行动态代码
  const result = await safeVm.run(`return system.meishisanbox()`, context);
  // 释放资源
  // safeVm.destroy();
  return safeVm
};

export const scheduleObjectLiteralSyntax = () => {
    //dayOfWeek
    //month
    //dayOfMonth
    //hour
    //minute
    //second
      // 每周一的下午16：11分触发，其它组合可以根据我代码中的注释参数名自由组合
      // 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
    schedule.scheduleJob('30 1 1 * * *', () => {
        safeifymeishichina()
    });
   
}
