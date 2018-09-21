import User , { IUser } from "../db/schema/user";
export default (socket: any) => {
  // 实现需求，使用一条手机号向对应的客户端发送添加好友的请求
socket.on('addFriendRequest', async (Mobile: string, userId: string) => {
    // 登录之后把user放进socket对象，然后完事
   // 发送请求到好友呀
   const sentUser: IUser = await User.findById(userId).select('-passWord -updateTime -logoutTime -createTime ').populate({ path: 'requestList', select: ' headImg nickName descPerson sex ' })
   .populate({ path: 'friends', select: ' headImg nickName descPerson sex ' })
   .exec()  as IUser

   const acceptUser: IUser = await User.findOneAndUpdate({Mobile}, {$push: {requestList: sentUser}}, {new: true}).populate({ path: 'socket', select: 'id' })
   .select('-passWord -updateTime -logoutTime -createTime ').populate({ path: 'requestList', select: ' headImg nickName descPerson sex ' })
   .populate({ path: 'friends', select: ' headImg nickName descPerson sex ' })
   .exec()  as IUser
   // 转发到当前用户客户端
   // console.log(`here is addFriendRequest.nect >>>>>>>${sentUser}`)
   // 将自己的个人信息发送到好友
   // 第一个蚕食是要发送的好友，第二个参数是当前用户
   socket.nsp.sockets[acceptUser.socket.id].emit('message', {sentUser,acceptUser} )
});
};
