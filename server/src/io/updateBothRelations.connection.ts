import User , { IUser } from "../db/schema/user";
// 实现提醒双方的好友关系已经更新
export default (socket: any) => {
socket.on('updateBothRelations', async (relations: any) => {
    // 登录之后把user放进socket对象，然后完事
   socket.nsp.sockets[relations.acceptUser.socket.id].emit('message', relations )
});
};
