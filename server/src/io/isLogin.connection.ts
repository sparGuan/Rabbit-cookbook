import User, { IUser } from '../db/schema/user';
import { emit, wx, domain } from '../config/index';
import Socket, { ISocket } from '../db/schema/socket';
import getWxConfigUtil from '../utils/getWxConfigUtil';
export default (socket: any) => {
  // 判断是否登录，更新用户的socketId
  socket.on('isLogin', async (user: any) => {
    if (!global._.isEmpty(user)) {
      // 登录之后把user放进socket对象，然后完事
      // socket.sockets.sockets[socket.id].emit('message', 'for your eyes only');
      const socket_schema: ISocket = (await Socket.findOneAndUpdate(
        { id: socket.id },
        {
          user,
          update_at: new Date()
        },
        {
          new: true
        }
      )) as ISocket;
      const userInfo: IUser = (await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            socket: socket_schema,
            updateTime: new Date()
          }
        },
        { new: true }
      )
        .select('-passWord -updateTime -logoutTime -createTime ')
        .populate({
          path: 'requestList',
          select: ' headImg nickName descPerson sex '
        })
        .populate({
          path: 'friends',
          select: ' headImg nickName descPerson sex '
        })
        .exec()) as IUser;
      const appId = wx.appId;
      // 在这里生成token和ticket的签名,保存进数据库
      const wxToken = await getWxConfigUtil.getToken();
      // console.log(wxToken)
      const wxTicket = await getWxConfigUtil.getTicket(wxToken);
      // console.log(timestamp)
      // url 为调用页面的完整 url
      const wxConfig = await getWxConfigUtil.sign(
        wxTicket,
        `${domain}${socket.request.url}` // 这个socketId代替url
        // ctx.request.url
      ); // 获取签名
      wxConfig.appId = appId
      // 将微信服务的签名返回到前端展示
      // console.log(`here is isLogin.conn 23 page ${userInfo}`)
      // 返回去的token码是不带socket值的
      // 返回用户信息好签名
      console.log(wxConfig)
      socket.emit(`isLogin_${emit}`, {
        userInfo,
        wxConfig
      });
    }
  });
};
