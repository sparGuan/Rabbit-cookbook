import * as glob from 'glob';
import fs = require('fs');
import path = require('path');
// 遍历所有文件夹，每遍历一次，判断该文件夹下是否存在index.ts文件
// 如果存在index.ts文件，即使用Index.ts文件，否则生成默认的Index.ts路由函数
/**
 * 遍历所有文件夹，每遍历一次，判断该文件夹下是否存在index.ts文件
 * @param filePath 需要遍历的文件路径
 */
export default (filePath: string) => {
  return new Promise((resolve, reject) => {
    // 根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, (err: Error, files: any []) => {
      if (err) {
        throw err;
      } else {
        const routes: any[] = [];
        // 遍历读取到的文件列表 -> 返回文件名
        files.forEach((filename: any) => {
          // 获取当前文件的绝对路径
          const filedir: string = path.join(filePath, filename);
          // 根据文件路径获取文件信息，返回一个fs.Stats对象
          const stats: fs.Stats = fs.statSync(filedir);
          // 是文件夹
          if (stats.isDirectory()) {
            // 如果是文件夹
            // 遍历下面所有的文件，判断是否存在index.ts
            // 如果存在index.ts，就直接执行默认导出路由的方法
            // 如果不存在，就获取controller返回controller对象
            // 如果不存在，将获得的controller对象直接返回默认的index.ts里面的路由函数
            // 去遍历该文件夹下面的所有文件
            const customRoutingAddr = `${filedir}/index.ts`;
            const exists: boolean = fs.existsSync(customRoutingAddr);
            if (exists) {
              const filesArr: string[] = glob.sync(customRoutingAddr, {
                ignore: 'index.ts'
              });
              const Routing = require(filesArr[0]);
              routes.push(Routing);
            } else {
              // 不存在之下，去读controller.ts，使用导出的controller，生成默认的Route导出函数
              const filesArr: string[] = glob.sync(`${filedir}/*.controller.ts`, {
                ignore: '*.controller.ts'
              });
              const Controller = require(filesArr[0]);
              const Routing = (Router: any) => {
                const ControllerdirName = filedir.substring(
                  filedir.lastIndexOf('/') + 1
                );
                for (const reqMethod of Object.getOwnPropertyNames(
                  Object.getPrototypeOf(Controller.default)
                )) {
                  // 不是构造器所有的非静态方法作为post
                  if (reqMethod !== 'constructor') {
                    Router.post(
                      `/${ControllerdirName}/${reqMethod}`,
                      Controller.default[reqMethod].apply(Controller.default)
                    );
                  }
                }
                return Router;
              };
              routes.push({ Routing });
            }
          }
        });
        resolve(routes);
      }
    });
  });
};
