import { statusCode } from '../../config/index';
import User, { IUser } from '../../db/schema/user';
const { isValid } = require('mongoose').Types.ObjectId;
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
// 实验目的：能够在子类的controller里面使用basecontroller的公共方法
// this指向了BASE_OPEN_SOURCE_API，实验目的：this指向baseController
class FriendsController extends BASE_OPEN_SOURCE_API {
  private user: IUser;
  private allowableUserId: string;
  private userId: string;
  constructor() {
    super();
  }
 /**
   *  响应该好友请求，添加成功
   *  @param {string} allowableUserId 发起请求添加的id
   *  @param {string} userId 当前用户ID
   *  @return void
   */
  public addNewFriend() {
    return async (ctx: any) => {
      // 让异步变同步
      try {
        const  { body }  = ctx.request;
        this.allowableUserId = body._id
        if (!global._.isEmpty(this.allowableUserId) && isValid(this.allowableUserId) && isValid(this.userId) && !global._.isEmpty(this.userId)) {
          await User.findByIdAndUpdate(this.userId, { $push: {
            friends: this.allowableUserId
            }}, {new: true})
          // 如果id不为空
          await User.findByIdAndUpdate(this.allowableUserId, { $push: {
          friends: this.userId
          }}, {new: true})
          // 通过验证保存双方数据
          ctx.body = {
            message: statusCode
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
      const  { body }  = ctx.request;
      if (!global._.isEmpty(body.Mobile)) {
        this.user = (await User.findOne({ Mobile: body.Mobile })) as IUser;
        if (!global._.isEmpty(this.user)) {
          // 返回的数据只需要昵称，年龄，描述，头像
         const user = {
          _id: this.user._id,
          nickName: this.user.nickName,
          headImg: this.user.headImg,
          sex: this.user.sex,
          age: this.user.age,
          descPerson: this.user.descPerson
         }
          ctx.body = {
            message: statusCode.success,
            user
          };
        } else {
          ctx.body = {
            message: statusCode.noOne
          };
        }
      }
    }
  }
}
export default new FriendsController();