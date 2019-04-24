import { statusCode } from '../../config/index';
import Auth, { IAuth } from '../../db/schema/auth';
import DirExistUtils from '../../utils/DirExistUtils';
// import ProcessingImage from '../../utils/ProcessingImage';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
import AuthService from './auth.service';
const formidable = require('formidable');
// 获取参数信息
// const getParameters = require('../../utils/getParameters').default;
// 此处需要的是路由 =====> 先测试，再封装底层
class AuthController extends BASE_OPEN_SOURCE_API<AuthService, IAuth> {
    private authService: any;
    constructor(model: any) {
        super(model);
        this.authService = new AuthService();
    }
	/**
	 * 保存用户认证信息
	 */
    public saveAuthentication() {
        return async (ctx: any) => {
            const reqParams = this.getParameters(ctx);
            if (Object.keys(reqParams).length > 0) {
                const response = await this.authService.saveAuthenticationService(reqParams);
                console.log(response);
                return response;
            }
        };
    }
}
export default new AuthController(Auth);
