import { emit } from '../config/index';
import ChatOne, { IChatOne } from '../db/schema/chatOne';
// 实现提醒双方的好友关系已经更新
export default (socket: any) => {
  socket.on('loadHistory', async (page: number, chatId: string, userId: string) => {
    console.log(page)
    // 登录之后把user放进socket对象，然后完事
    // console.log(`>>>>>>>> here is updateBothRelations ${acceptUser}`)
    //  socket.nsp.sockets[acceptUser.socket.id].emit(`updateBothRelations_${emit}`, acceptUser )
    const chat: IChatOne[] = (await ChatOne.find(
      { _id: chatId },
      { Meta: { $slice: [( -6 * page ), (6 * page)] } }
    ).select('user acceptUser')
    .populate({ path: 'user' , select:'socket', populate: { path: 'socket', select: 'id' } })
    .populate({
      path: 'acceptUser',
      select:'socket',
      populate: { path: 'socket', select: 'id' }
    })
    .exec()) as IChatOne[];
    console.log(chat)
    if (Object.is(chat[0].user._id.toString(), userId)) {
      socket.nsp.sockets[chat[0].user.socket.id].emit(
        `loadHistory_${emit}`,
        chat[0]
      );
    } else if (Object.is(chat[0].acceptUser._id.toString(), userId)) {
      socket.nsp.sockets[chat[0].user.socket.id].emit(
        `loadHistory_${emit}`,
        chat[0]
      );
    }
  });
};
