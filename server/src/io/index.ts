
import friendValid from './friendValid.io'
import { port, webServerDoMain } from '../config/index';
export default (server: any) => {
  const io = require('socket.io')({
    path: `${webServerDoMain}:${port}/ioServer`
  });
  io.listen(server)
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
