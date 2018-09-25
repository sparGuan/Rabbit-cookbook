import User, { IUser } from "../db/schema/user";
import { emit } from '../config/index';
import ChatOne, { IChatOne } from '../db/schema/chatOne';
// 实现提醒双方的好友关系已经更新
export default (socket: any) => {
socket.on('updateChatList', async (userId: string, ChatId: string,message: string) => {
    // 更新聊天信息
  if (!global._.isEmpty(ChatId) && !global._.isEmpty(userId)) {
    const user: IUser = await User.findById(userId).select('nickName headImg').populate({ path: 'socket', select: 'id' }) as IUser
    // 向数据库更新数据
    const chatOne: IChatOne = await ChatOne.findByIdAndUpdate(ChatId,{$push: {
      Meta: {
        user,
        message,
        UserMsgDate: new Date()
      }
    }},{new:true}) as IChatOne
    const acceptUser: IUser = await User.findById(chatOne.acceptUser).select('nickName headImg').populate({ path: 'socket', select: 'id' }) as IUser
    socket.nsp.sockets[user.socket.id].emit(`updateChatList_${emit}`, chatOne )
    socket.nsp.sockets[acceptUser.socket.id].emit(`updateChatList_${emit}`, chatOne )
  }
});
};