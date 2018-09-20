import { IUser } from "../db/schema/user";
import { emit } from '../config/index';
// 实现提醒双方的好友关系已经更新
export default (socket: any) => {
socket.on('updateBothRelations', async (acceptUser: IUser) => {
    // 登录之后把user放进socket对象，然后完事
    // console.log(`>>>>>>>> here is updateBothRelations ${acceptUser}`)
   socket.nsp.sockets[acceptUser.socket.id].emit(`updateBothRelations_${emit}`, acceptUser )
});
};
