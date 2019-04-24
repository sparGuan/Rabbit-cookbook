import Auth, { IAuth } from '../../db/schema/auth';
import { statusCode } from '../../config/index';
import responseJSON from '../../utils/responseJSON';
export default class ActivityService {
    private auth: IAuth;
	/**
	 * @param reqParams {} 前端认证参数
	 * TODO:保存用户认证信息
	 */
    public async saveAuthenticationService(reqParams: any) {
        if (!global._.isEmpty(reqParams)) {
            if (reqParams.userId) {
                this.auth = (await Auth.findOne({ userId: reqParams.userId })) as IAuth;
                if (!global._.isEmpty(this.auth)) {
                    return responseJSON(-1, statusCode.isExist);
                } else {
                    this.auth = new Auth(reqParams);
                    if (!global._.isEmpty(this.auth)) {
                        // 保存
                        const response = responseJSON(0, statusCode.success, await this.auth.save());
                        return response;
                    }
                }
            }
        } else {
            return {};
        }
    }
}
