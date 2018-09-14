import { IUser } from "db/schema/user";
import { emit } from '../config/index'
import Socket, { ISocket } from '../db/schema/socket';
export default (socket: any) => {
  // 实现需求，使用一条手机号向对应的客户端发送添加好友的请求
	socket.on('addFriendRequest', async (Mobile: string) => {
    // 登录之后把user放进socket对象，然后完事
   // socket.sockets.sockets[socket.id].emit('message', 'for your eyes only');
   
    // socket.emit(`isLogin_${emit}`, {
    //   user,
    //   socketId: socket.id
    // });
	});
};