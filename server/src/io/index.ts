
const IO = require('koa-socket');
import friendValid from './friendValid.io'
import { port, webServerDoMain } from '../config/index';
export default (app: any) => {
  const io = new IO({
    ioOptions: {
        pingTimeout: 10000,
        pingInterval: 5000,
    },
  });
  
  // 注入应用
  io.attach(app);
  // const io = require('socket.io')({
  //   path: `${webServerDoMain}:${port}/ioServer`
  // });
  // console.log(server)
  // io.listen(server)
  io.use((socket: any, next: any) => {
    const token = socket.handshake.query.token;
    // todo 使用一个token解析出userId,然后去查找该用户，有该用户就进入
    // if (isValid(token)) {
    return next();
    // }
    // return next(new Error('authentication error'));
  });
  friendValid(io);
}
