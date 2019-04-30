// TODO: 执行沙箱代码，执行爬虫
import { Safeify } from "safeify";

import DatavMeishichinaService, { IDatavMeishichinaService } from '../api/datav/datavMeishichina.service';
export const safeifymeishichina = async () =>{
  console.log(1423424242141421341344214)
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
        console.log(2342414234144141)
        return datavMeishichinaService.spidersService();
      }
    }
  };
  // 执行动态代码
  const result = await safeVm.run(`return system.meishisanbox()`, context);
  console.log('result', result);
  // 释放资源
  // safeVm.destroy();
  return safeVm
};
