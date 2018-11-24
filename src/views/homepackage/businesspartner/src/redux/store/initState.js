/**
 * 本文件的作用就是直观呈现 整个应用状态结构树 及其 初始值
 * 所有的初始状态值
 * // 计算所有初始值
 */
export default {
  /* 用户 session */
  // 调用默认函数，渲染路由页面
  displayAnyTop: {
    isShow: true,
    showType: 0, // 0是带有搜索框的页面，1是带有标题的页面
    showArrow: true
  },
  displayAnyBottom: {
    isShow: true,
    showType: 0 // 0是默认的地步菜单
  }
  /*  留言板模块（按需加载） */
  
}
