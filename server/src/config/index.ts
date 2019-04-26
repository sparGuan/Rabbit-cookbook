export const port = process.env.PORT || 3011;
export const domain = 'www.jingz100.com' // 'https//www.jingz100.com';
export const connexionString = 'mongodb://193.112.125.250:27017/BASE_Meerkat';
export const baseApi = '/api';
export const secret = 'jwt_secret';
export const webServerDoMain = 'localhost';
export const redis_host = '127.0.0.1'; //  redis配置
export const redis_port = 6379;
export const redis_db = 0;
export const redis_password = '';
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
    isExist: 'ISEXIST',
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
// 用户代理，爬取出具所需要的源
export const userAgents = [
    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
    'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20',
    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0) ,Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0b13pre) Gecko/20110307 Firefox/4.0b13pre',
    'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER)',
    'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
    'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
    'Opera/9.25 (Windows NT 5.1; U; en), Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
  ];
