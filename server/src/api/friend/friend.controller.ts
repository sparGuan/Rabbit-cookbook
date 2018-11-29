import { statusCode } from '../../config/index';
import User, { IUser } from '../../db/schema/user';
const { isValid } = require('mongoose').Types.ObjectId;
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
// 实验目的：能够在子类的controller里面使用basecontroller的公共方法
// this指向了BASE_OPEN_SOURCE_API，实验目的：this指向baseController
import FriendService from './friend.service';
class FriendsController extends BASE_OPEN_SOURCE_API <FriendService, IUser> {
  private user: IUser;
  private acceptUserId: string;
  private userId: string;
  private userList: IUser[];
  constructor(model: any) {
    super(model);
  }
  /**
   *  响应该好友请求，添加成功
   *  @param {string} acceptUserId 发起请求添加的id
   *  @param {string} userId 当前用户ID
   *  @return void
   */
  public addNewFriend() {
    return async (ctx: any) => {
      // 让异步变同步
      const { body } = ctx.request;
      try {
        this.acceptUserId = body.acceptUserId;
        this.userId = body.userId;
        if (
          !global._.isEmpty(this.acceptUserId) &&
          isValid(this.acceptUserId) &&
          isValid(this.userId) &&
          !global._.isEmpty(this.userId)
        ) {
          const acceptUser: IUser = (await User.findByIdAndUpdate(
            this.acceptUserId,
            {
              $push: {
                friends: this.userId
              },
              $pull: {
                requestList: this.userId
              }
            },
            { new: true }
          )
            .populate({
              path: 'friends',
              select: '-passWord -updateTime -logoutTime -createTime'
            })
            .populate({
              path: 'requestList',
              select: '-passWord -updateTime -logoutTime -createTime'
            })
            .populate({
              path: 'socket',
              select: 'id'
            })) as IUser;
          // 如果id不为空
          const user: IUser = (await User.findByIdAndUpdate(
            this.userId,
            {
              $push: {
                friends: this.acceptUserId
              },
              $pull: {
                requestList: this.acceptUserId
              }
            },
            { new: true }
          )
            .populate({
              path: 'friends',
              select: '-passWord -updateTime -logoutTime -createTime'
            })
            .populate({
              path: 'requestList',
              select: '-passWord -updateTime -logoutTime -createTime'
            })
            .populate({
              path: 'socket',
              select: 'id'
            })) as IUser;
          // 通过验证保存双方数据
          ctx.body = {
            message: statusCode.success,
            relations: { acceptUser, user }
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
        console.log(this.user);
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
