import User, { IUser } from '../db/schema/user';
import ChatOne, { IChatOne } from '../db/schema/chatOne';
import { emit } from '../config/index';
export default (socket: any) => {
  // 实现需求，好友双方添加到共同的组里面去
  // 尝试使用不分频道的方式去做
  // 更改需求，直接读取数据库里面的元信息，然后渲染列表
  // 同时发送双方客户端，只要打开或者关闭就取消该发送信息的状态
  socket.on(
    'chatOne',
    async (
      acceptUserId: string,
      userId: string,
      message: any
    ) => {
      // 先判断是否存在chat表
      // 如果有chat表，就直接读取chat表里面的数据列表，两边渲染
      // 如果没有，就开始创建chat表
      // 然后返回空数据
      // 用户没发送一条数据，往chat表里面添加数据
      // 转发到发送者
      const user: IUser = (await User.findById(userId)
        .select('descPerson headImg nickName sex socket')
        .populate({ path: 'socket', select: 'id' })
        .exec()) as IUser; // 当前用户
      const acceptUser: IUser = (await User.findById(acceptUserId)
        .populate({ path: 'socket', select: 'id' })
        .select('descPerson headImg nickName sex socket')
        .exec()) as IUser; // 需要请求的用户
      let chat = await ChatOne.find({
        acceptUser,
        user
      }, { Meta: { $slice: [ -6 , 6 ] }})
      // 如果搜不到，反过来再搜一次
      if (global._.isEmpty(chat)) {
        chat = await ChatOne.find({
          acceptUser: user,
          user: acceptUser
        }, { Meta: { $slice: [ -6, 6 ] }})
      }
      // 获取所有的频道，判断是否在对应的频道上
      // 新需求，创建一张频道表，将聊天双方存入信息存入数据库，，读取双方数据发送双方聊天窗口
      if (global._.isEmpty(chat[0])) {
        // 创建channel表
        const body = {
          acceptUser,
          user
        };
        let chatOne: IChatOne = new ChatOne(body);
        chatOne = (await chatOne.save()) as IChatOne;
        // 创建组
        // 转发到各自用户客户端
        socket.nsp.sockets[user.socket.id].emit(`onChatOne_${emit}`, chatOne);
        socket.nsp.sockets[acceptUser.socket.id].emit(
          `onChatOne_${emit}`,
          chatOne
        );
      } else {
        // 将chat列表发送到客户端
        if (!global._.isEmpty(message)) {
          const chatOne = await ChatOne.findByIdAndUpdate(
            { _id: chat[0]._id },
            {
              $push: {
                Meta: {
                  userId: user._id,
                  nickName: user.nickName,
                  headImg: user.headImg,
                  message
                }
              }
            },
            {
              new: true ,
              select: { Meta: { $slice: [ -6, 6 ] }}
            }
          );
          socket.nsp.sockets[user.socket.id].emit(`onChatOne_${emit}`, chatOne);
          socket.nsp.sockets[acceptUser.socket.id].emit(
            `onChatOne_${emit}`,
            chatOne
          );
          // 发送你有新消息的io
            if (Object.is(user._id.toString(), userId)) {
            socket.nsp.sockets[acceptUser.socket.id].emit(
              `hasNewChating_${emit}`,
              {
                user ,
                isHasNewChating: true
              }
            );
          } else if (Object.is(acceptUser._id.toString(), userId)) {
            socket.nsp.sockets[user.socket.id].emit(
              `hasNewChating_${emit}`,
              {
                user ,
                isHasNewChating: true
              }
            );
          }
        } else {
          socket.nsp.sockets[user.socket.id].emit(`onChatOne_${emit}`, chat[0]);
          socket.nsp.sockets[acceptUser.socket.id].emit(
            `onChatOne_${emit}`,
            chat[0]
          );
        }
      }
    }
  );
};
