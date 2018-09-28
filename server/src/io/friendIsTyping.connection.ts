import { emit } from '../config/index';
import ChatOne, { IChatOne } from '../db/schema/chatOne';
// 实现提醒双方的好友关系已经更新
export default (socket: any) => {
  socket.on(
    'friendIsTyping',
    async (chatId: string, userId: string, startOrEnd: boolean) => {
      // 登录之后把user放进socket对象，然后完事
      // console.log(`>>>>>>>> here is updateBothRelations ${acceptUser}`)
      const chat: IChatOne = (await ChatOne.findById(chatId)
        .select('user acceptUser')
        .populate({ path: 'user', populate: { path: 'socket', select: 'id' } })
        .populate({
          path: 'acceptUser',
          populate: { path: 'socket', select: 'id' }
        })
        .exec()) as IChatOne;
      if (
        !global._.isEmpty(chat) &&
        !global._.isEmpty(chat.acceptUser) &&
        !global._.isEmpty(chat.user)
      ) {
        if (Object.is(chat.user._id.toString(), userId)) {
          socket.nsp.sockets[chat.acceptUser.socket.id].emit(
            `friendIsTyping_${emit}`,
            startOrEnd
          );
        } else if (Object.is(chat.acceptUser._id.toString(), userId)) {
          socket.nsp.sockets[chat.user.socket.id].emit(
            `friendIsTyping_${emit}`,
            startOrEnd
          );
        }
      }
    }
  );
};
