export const port =  3011;
export const connexionString = 'mongodb://193.112.125.250:27017/BASE_Meerkat';
export const baseApi = '/api';
export const secret = 'jwt_secret';
export const webServerDoMain = 'localhost';
export const limit = '10';
export const emit = 'SURE';
export const qsms = {
  appid: 1400106290,
  appkey: '53977389a4ef6a7fce4b916881e583a2'
}; // 腾讯短信认证接口配置
export const statusCode = {
  success: 'success',
  error: 'error',
  noOne: '没有该用户',
  expiredTime: 3 // 过期时间是倒数三天
};
// 8011是gitlab库的端口
// 3306是服务器静态资源路径
// 导出服务器端口必须要0.0.0.1
// /usr/local/etc/nginx/nginx.conf
// 必须先下载ImageMagick brew => ImageMagick gm是基于ImageMagick剪裁图片
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
