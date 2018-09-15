import User ,{ IUser } from "db/schema/user";
import { emit } from '../config/index'
import Socket, { ISocket } from '../db/schema/socket';
export default (socket: any) => {
  // 实现需求，使用一条手机号向对应的客户端发送添加好友的请求
	socket.on('addFriendRequest', async (Mobile: string) => {
    // 登录之后把user放进socket对象，然后完事
   // socket.sockets.sockets[socket.id].emit('message', 'for your eyes only');
   // 发送情趣到好友呀
   const user:IUser = await User.findOne(Mobile) as IUser
   // 转发到当前用户客户端
   socket.sockets.sockets[socket.id].emit('message', user);
   // 回应请求是否添加
   // 返回数据：是否添加好友，userId---》客户端的用户
    // socket.emit(`echo_${emit}`, {
    //   user,
    //   socketId: socket.id
    // });
	});
};