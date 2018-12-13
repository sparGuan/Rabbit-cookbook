export const port =  process.env.PORT || 3011;
export const domain =  'www.jingz100.com' // 'https//www.jingz100.com';
export const connexionString = 'mongodb://193.112.125.250:27017/BASE_Meerkat';
export const baseApi = '/api';
export const secret = 'jwt_secret';
export const webServerDoMain = '192.168.0.101';
export const limit = '10';
export const emit = 'sent';
// 微信js-sdk服务
export const wx = {
token: 'weixinToken',
appId: 'wx26fea37fd3a656f2', // 'wx42b982ad407ac631',
secret: '0b70076eca4f17839d205f6a352aa9af'// 'd58ed25a0d470f1bc6d861dc846e1768'
}
export const qsms = {
  appid: 1400106290,
  appkey: '53977389a4ef6a7fce4b916881e583a2'
}; // 腾讯短信认证接口配置
export const statusCode = {
  success: 'success',
  error: 'error',
  noOne: 'noOne',
  isFriend: 'isFriend',
  disconnected: 'disconnected',
  expiredTime: 3 // 过期时间是倒数三天
};
// 8011是gitlab库的端口
// 3306是服务器静态资源路径
// 导出服务器端口必须要0.0.0.1
// /usr/local/etc/nginx/nginx.conf
// 必须先下载ImageMagick brew => ImageMagick gm是基于ImageMagick剪裁图片
// 49001 是jenkins的服务器端口
export const processingImagePosition = {
  // 剪裁图片的位置配置
  NorthWest: 'NorthWest',
  North: 'North',
  NorthEast: 'NorthEast',
  West: 'West',
  Center: 'Center',
  East: 'East',
  South: 'South',
  SouthWest: 'SouthWest',
  SouthEast: 'SouthEast'
};
