import { statusCode } from '../../config/index';
import User, { IUser } from '../../db/schema/user';
import Socket, { ISocket } from '../../db/schema/socket';
const { isValid } = require('mongoose').Types.ObjectId;
import mongoose = require('mongoose');
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
// 实验目的：能够在子类的controller里面使用basecontroller的公共方法
// this指向了BASE_OPEN_SOURCE_API，实验目的：this指向baseController
import FriendService from './friend.service';
class FriendsController extends BASE_OPEN_SOURCE_API <FriendService, IUser> {
  private user: IUser;
  private acceptUser: IUser;
  private acceptUserId: string;
  private userId: string;
  private userList: IUser[];
  private willBeFriend: boolean = false; // 判断是否已经是好友再去添加好友关系
  private friendService: any;
  constructor(model: any) {
    super(model);
    this.friendService = new FriendService()
  }
  /**
   *  响应该好友请求，添加成功
   *  @param {string} acceptUserId 发起请求添加的id
   *  @param {string} userId 当前用户ID
   *  @return void
   * // 旧的接口先写在controller上面了，后面新的接口放在service里面处理
   */
  public addNewFriend() {
    return async (ctx: any) => {
      // 让异步变同步
      const { body } = ctx.request;
      try {
        this.acceptUserId = body.acceptUserId;
        this.userId = body.userId;
        const relations = await this.friendService.addNewFriendService(this.acceptUserId, this.userId)
        console.log(relations)
        if (typeof relations === 'object' && !global._.isEmpty(relations)) {
          ctx.body = {
            message: statusCode.success,
            relations
          };
        } else {
          ctx.body = {
            message: relations
          };
        }
      } catch (error) {
        throw error;
      }
    };
  }
  // 搜索手机号，获取该好友信息
  /**
   * @param {string} Mobile 用户手机号
   */
  public searchNewFriends() {
    return async (ctx: any) => {
      const { body } = ctx.request;
      if (!global._.isEmpty(body.Mobile)) {
        this.user = (await User.findOne({ Mobile: body.Mobile }).select(
          '-passWord -updateTime -logoutTime -createTime '
        )) as IUser;
        if (!global._.isEmpty(this.user)) {
          // 返回的数据只需要昵称，年龄，描述，头像
          ctx.body = {
            message: statusCode.success,
            user: this.user
          };
        } else {
          ctx.body = {
            message: statusCode.noOne
          };
        }
      }
    };
  }
  // 从附近的人查找好友数据，以年龄段为排序
  public loadPeopleNearBy() {
    return async (ctx: any) => {
      const { body } = ctx.request;
      if (!global._.isEmpty(body.userId)) {
        this.user = (await User.findById(body.userId).select(
          ' location friends '
        )) as IUser;
        // 查找附近的人
        // 返回的数据只需要昵称，年龄，描述，头像
        if (!global._.isEmpty(this.user)) {
          const friendsQuery = this.user.friends || [];
          this.userList = (await User.find({
            location: {
              $within: {
                $center: [this.user.location, 1]
              }
            },
            friends: { $nin: friendsQuery }
          })
            .select('-passWord -updateTime -logoutTime -createTime  ')
            .limit(10)
            .sort({ updateTime: -1 })
            .skip(body.page || 1)) as IUser[];
        }
        if (this.userList.length > 0) {
          ctx.body = {
            message: statusCode.success,
            userList: this.userList
          };
        } else {
          ctx.body = {
            message: statusCode.noOne
          };
        }
      }
    };
  }
}
export default new FriendsController(User);
