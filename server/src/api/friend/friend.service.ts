import { statusCode } from '../../config/index';
import User, { IUser } from '../../db/schema/user';
import Socket, { ISocket } from '../../db/schema/socket';
const { isValid } = require('mongoose').Types.ObjectId;
import mongoose = require('mongoose');
export default class FriendService {
    private user: IUser;
    private acceptUser: IUser;
    private acceptUserId: string;
    private userId: string;
    private userList: IUser[];
    private willBeFriend: boolean = false; // 判断是否已经是好友再去添加好友关系
    public async addNewFriendService(acceptUserId: any, userId: any) {
        try {
            if (
                !global._.isEmpty(acceptUserId) &&
                isValid(acceptUserId) &&
                isValid(userId) &&
                !global._.isEmpty(userId)
            ) {
                // 先查找自己的表，如果已经是好友关系，就不再更新关系而是直接返回了
                const isFriendsCondition: IUser = await User.findById(acceptUserId) as IUser
                this.willBeFriend = false;
                isFriendsCondition.friends.forEach(item => {
                    if (item.toString() === userId) {
                        // 表明了他们已经是好友关系
                        this.willBeFriend = true
                        console.log(`我们已经是好友了。。。。准备return到前端`)
                    }
                })
                console.log(`正在添加双方好友。。。。`)
                console.log(`这个是acceptUser.....${acceptUserId}....`)
                if (!this.willBeFriend) {
                    // 如果双方还不是好友
                    // 准备开始通讯
                    // 先去寻找通讯源的ID是否存在
                    const isOnlineSocket_acceptUser = await Socket.findOne({ user: acceptUserId })
                    const isOnlineSocket_user = await Socket.findOne({ user: userId })
                    // 判断是否掉线了
                    if (!global._.isEmpty(isOnlineSocket_acceptUser)) {
                        console.log(`正在判断相关信息。。。。更新双方关系中....id==>${acceptUserId}`)
                        this.acceptUser = (await User.findByIdAndUpdate(
                            acceptUserId,
                            {
                                $push: {
                                    friends: userId
                                },
                                $pull: {
                                    requestList: userId
                                }
                            },
                            { new: true }
                        )
                            .populate({
                                path: 'friends',
                                select: '-passWord -updateTime -logoutTime -createAt'
                            })
                            .populate({
                                path: 'requestList',
                                select: '-passWord -updateTime -logoutTime -createAt'
                            }).
                            populate({
                                path: 'socket',
                                select: 'id'
                            })) as IUser;
                    } else {
                        // 如果该用户已经掉线了，就直接保存进数据库了
                        console.log(`该用户 ${acceptUserId}在互相添加好友中掉线了...`)
                        this.acceptUser = (await User.findByIdAndUpdate(
                            acceptUserId,
                            {
                                $push: {
                                    friends: userId
                                },
                                $pull: {
                                    requestList: userId
                                }
                            },
                            { new: true }
                        )) as IUser;
                    }
                    if (!global._.isEmpty(isOnlineSocket_user)) {
                        // 如果id不为空
                        console.log(`正在判断相关信息。。。。更新双方关系中....id==>${userId}`)
                        this.user = (await User.findByIdAndUpdate(
                            userId,
                            {
                                $push: {
                                    friends: acceptUserId
                                },
                                $pull: {
                                    requestList: acceptUserId
                                }
                            },
                            { new: true }
                        )
                            .populate({
                                path: 'friends',
                                select: '-passWord -updateTime -logoutTime -createAt'
                            })
                            .populate({
                                path: 'requestList',
                                select: '-passWord -updateTime -logoutTime -createAt'
                            })) as IUser;
                    } else {
                        console.log(`该用户 ${userId}在互相添加好友中掉线了...`)
                        this.user = (await User.findByIdAndUpdate(
                            userId,
                            {
                                $push: {
                                    friends: acceptUserId
                                },
                                $pull: {
                                    requestList: acceptUserId
                                }
                            },
                            { new: true }
                        )) as IUser;
                    }
                    return { acceptUser: this.acceptUser, user: this.user }
                    // 通过验证保存双方数据
                } else {
                    return statusCode.isFriend
                }
            }
        } catch (error) {
            throw error
        }
    }
}
