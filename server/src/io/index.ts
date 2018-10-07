const path = require('path');
import * as glob from 'glob';
import fs = require('fs');
const resolve = (dir: string) => path.join(__dirname, '..', dir);
module.exports = {
  // 两个函数， 一个是connection
  // 一个是 disconnect
  filePath: resolve('/io'),
  socketConnect(socket: any) {
    const filesArr: string[] = glob.sync(`${this.filePath}/*.connection.ts`, {
      ignore: '*.connection.ts'
    });
    filesArr.forEach(item => {
      const fn = require(item);
      fn.default(socket)
    });
  }
};
