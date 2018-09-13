// webSockiet连接
export default async (io: any) => new Promise((resolve, reject) => {
    const userTotal = 0;
    const MultiClient = true;
    // 储存所有用户数据
    const userDbData: any[] = [];
    io.on('connection', (socket: any) => {
      const token = socket.handshake.query.token; // 获取token值
      console.log('一个用户连接:' + socket.id);
      // 用户加入推送姓名后
      // socket.on('join', (res: any) => {
      //   // 给自己获取所有用户信息
      //   // 储存在线用户数据
      //   const users: any[] = [];
      //   userDbData.forEach( userDb => {
      //     if (userDb.status === 1 && userDb.userId !== res.userId) users.unshift(userDb)
      //   })
      //   io.to(socket.id).emit('system', { 'code': 'userList', 'userList': users });
      //   // 将用户储存在user对象中
      //   res.id = socket.id;
      //   res.status = 1; // 标记为在线 1 在线 2离线
      //   let isSave = false; // 判断是否存在
      //   if ( !MultiClient) {
      //     userDbData.forEach( userDb => {
      //       if ( userDb.userId === res.userId) {
      //         userDb = res
      //         isSave = true;
      //       }
      //     })
      //   }
      //   // 新用户加入
      //   if (!isSave) {
      //     userDb.unshift(res);
      //   }
      //   // 给除了自己以外的所有用户推送（前台判断，如何和自己的id相同提示在另一地点登录，所有输入框禁用）
      //   socket.broadcast.emit('system', { 'code': 'join', 'user': res });
      //   console.log('用户' + res.username + "登录、用户编号是：" + res.userId);
      // });
    })
    resolve('success')
})
