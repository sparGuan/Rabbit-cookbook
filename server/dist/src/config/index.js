"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = process.env.PORT || 3011;
exports.connexionString = "mongodb://193.112.125.250:27017/BASE_Meerkat";
exports.baseApi = "/api";
exports.secret = "jwt_secret";
exports.webServerDoMain = "localhost";
exports.webSourceDoMain = "localhost";
exports.limit = "10";
exports.qsms = {
    appid: 1400106290,
    appkey: "53977389a4ef6a7fce4b916881e583a2"
}; // 腾讯短信认证接口配置
exports.statusCode = {
    success: "success",
    expiredTime: 3 // 过期时间是倒数三天
};
//# sourceMappingURL=index.js.map