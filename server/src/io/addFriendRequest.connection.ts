import User , { IUser } from "../db/schema/user";
import Socket, { ISocket } from '../db/schema/socket';
export default (socket: any) => {
  // 实现需求，使用一条手机号向对应的客户端发送添加好友的请求
socket.on('addFriendRequest', async (Mobile: string, userId: string) => {
    // 登录之后把user放进socket对象，然后完事
   // 发送请求到好友呀
   try {
    if (!global._.isEmpty(Mobile) && !global._.isEmpty(userId)) {
      // 增加判断处理，如果已经是好友了，就不再添加了
      // 1.处理已经是好友关系的问题
      // 2.处理socketId报错的问题
      console.log(userId)
      const sentUser: IUser = await User.findById(userId).select('-passWord -updateTime -logoutTime -createTime ').populate({ path: 'requestList', select: ' headImg nickName descPerson sex ' })
      .populate({ path: 'friends', select: ' headImg nickName descPerson sex ' })
      .exec()  as IUser
      // 先判断双方是否是好友
      // 不允许传入空值！！！
      if (!global._.isEmpty(sentUser)) {
        const acceptUser: IUser = await User.findOneAndUpdate({Mobile}, {$push: {requestList: sentUser}}, {new: true})
        .select('-passWord -updateTime -logoutTime -createTime ').populate({ path: 'requestList', select: ' headImg nickName descPerson sex ' })
        .populate({ path: 'friends', select: ' headImg nickName descPerson sex ' })
        .exec()  as IUser
        if (!global._.isEmpty(acceptUser) ) {
          const socket_schema: ISocket = (await Socket.findById(acceptUser.socket) ) as ISocket;
          console.log(socket_schema)
          if (!global._.isEmpty(socket_schema)) {
            // .populate({ path: 'socket', select: 'id' })
            // 转发到当前用户客户端
            // console.log(`here is addFriendRequest.nect >>>>>>>${sentUser}`)
            // 将自己的个人信息发送到好友
            // 第一个蚕食是要发送的好友，第二个参数是当前用户
            acceptUser.socket = socket_schema
            socket.nsp.sockets[socket_schema.id].emit('message', {sentUser,  acceptUser} )
          } else {
            console.log(`被请求的用户已下线`)
          }
        }
      }
      // 被请求的用户下线了
     }
   } catch (error) {
     throw error
   }
});

// 通过用户id查找好友
socket.on('addFriendRequestById', async (acceptUserId: string, userId: string) => {
  // 登录之后把user放进socket对象，然后完事
 // 发送请求到好友呀
 try {
   if (!global._.isEmpty(acceptUserId) && !global._.isEmpty(userId)) {
    const sentUser: IUser = await User.findById(userId).select('-passWord -updateTime -logoutTime -createTime ').populate({ path: 'requestList', select: ' headImg nickName descPerson sex ' })
    .populate({ path: 'friends', select: ' headImg nickName descPerson sex ' })
    .exec()  as IUser
    const acceptUser: IUser = await User.findOneAndUpdate({_id: acceptUserId}, {$push: {requestList: sentUser}}, {new: true}).populate({ path: 'socket', select: 'id' })
    .select('-passWord -updateTime -logoutTime -createTime ').populate({ path: 'requestList', select: ' headImg nickName descPerson sex ' })
    .populate({ path: 'friends', select: ' headImg nickName descPerson sex ' })
    .exec()  as IUser
  // 转发到当前用户客户端
  // console.log(`here is addFriendRequest.nect >>>>>>>${sentUser}`)
  // 将自己的个人信息发送到好友
  // 第一个蚕食是要发送的好友，第二个参数是当前用户
    socket.nsp.sockets[acceptUser.socket.id].emit('message', {sentUser,  acceptUser} )
   }
 } catch (error) {
   throw error
 }
});
};
