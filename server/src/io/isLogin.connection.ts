import { IUser } from "db/schema/user";
import { emit } from '../config/index'
import Socket, { ISocket } from '../db/schema/socket';
export default (socket: any) => {
	socket.on('isLogin', async (user: IUser) => {
    // 登录之后把user放进socket对象，然后完事
   // socket.sockets.sockets[socket.id].emit('message', 'for your eyes only');
   await Socket.findOneAndUpdate({id:socket.id}, {
    user,
    update_at: new Date()
   }, {
    new: true
    }) as ISocket;
    socket.emit(`isLogin_${emit}`, {
      user,
      socketId: socket.id
    });
	});
};
