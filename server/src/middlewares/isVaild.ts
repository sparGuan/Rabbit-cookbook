/**
 * 拦截未登录请求
 */
module.exports = () => {
  const noUseLoginEvent: any = {
      login: true, // 是否登录
      getDefalutGroupHistoryMessages: true, // 获取当前所有历史留言
      getDefaultGroupOnlineMembers: true // 获取所有在线成员
  };
  return async (ctx: any, next: any) => {
      if (!noUseLoginEvent[ctx.event] && !ctx.socket.user) {
          ctx.res = '请登录后再试';
          return;
      }
      await next();
  };
};
