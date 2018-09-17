import User, { IUser } from '../db/schema/user';
import { emit } from '../config/index';
import Socket, { ISocket } from '../db/schema/socket';
export default (socket: any) => {
  // 判断是否登录，更新用户的socketId
  socket.on('isLogin', async (user: any, token: string) => {
    // 登录之后把user放进socket对象，然后完事
    // socket.sockets.sockets[socket.id].emit('message', 'for your eyes only');
   const socket_schema: ISocket =  (await Socket.findOneAndUpdate(
      { id: socket.id },
      {
        user,
        update_at: new Date()
      },
      {
        new: true
      }
    )) as ISocket;
    const userInfo: IUser = await User.findByIdAndUpdate(user._id, { $set: {
      socket: socket_schema,
      updateTime: new Date()
    }}, {new: true}) as IUser
    console.log(`?>>>>>> ------> isLogin_${emit}`, userInfo)
    // 返回去的token码是不带socket值的
    socket.emit(`isLogin_${emit}`, {userInfo, token});
  });
};
