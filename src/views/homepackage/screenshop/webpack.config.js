const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WpPluginWatchOffset = require('wp-plugin-watch-offset');
const rootPath = path.resolve(__dirname, './'), // 项目根目录
  src = path.join(rootPath, 'src'),// 开发源码目录
  env = process.env.NODE_ENV.trim(),// 当前环境
  resolve = (dir) => path.join(__dirname, './', dir),
  NODE_ENV = process.env.NODE_ENV || 'dev'; //环境类型
module.exports = {
    stats: { assets: true, children: false, chunks: false, modules: false, source: false },
    mode: "development",
    entry: {
        bundle: path.join(__dirname, './src/index.js')
    },
    plugins: [
        // new AssetsPlugin({ filename: 'build/manifest.json', prettyPrint: true }),
        new webpack.DefinePlugin({
          // __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
          'process.env':{
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('production')
          },
          // ================================
          // 配置开发全局常量
          // ================================
          __DEV__: env === 'dev',
          __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
          __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
        }),
        new HtmlWebpackPlugin({
            title: 'screenShop',
            template: './index.html', //html模板路径
			inject: true, //允许插件修改哪些内容，包括head与body
			minify: {
				//压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: false //删除空白符与换行符
				//removeAttributeQuotes: true
			}
        }),
        /*设置热更新*/
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json'],
        alias: { 
            '@': resolve('src'),
            'react-native': 'react-native-web' ,
             // ================================
             // 自定义路径别名
             // ================================
             UTIL: path.join(src, 'utils'),
             ACTION: path.join(src, 'redux/actions'),
             REDUCER: path.join(src, 'redux/reducers'),
             STORE: path.join(src, 'redux/store')
        },
        modules: ['web_modules', 'node_modules'],
    },
    module: {
      rules: [
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/,
                    /\.svg$/,
                ],
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'media/[name].[hash:8].[ext]',
                        emitFile: true,
                    },
                }],
            },
            {
              test: /\.css$/,
              exclude: /^node_modules$/,
              use: [ 'style-loader', 'css-loader' ]
            },
            {
              test: /\.less/,
              exclude: /^node_modules$/,
            },
            {
              test: /\.js$|\.jsx$/,
              include: [
                path.join(__dirname, './src')
              ],
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                cacheDirectory: true,
                presets: ['react', 'es2015','stage-0'],
                plugins:["transform-runtime"]
              }
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'media/[name].[hash:8].[ext]',
                        emitFile: true,
                    },
                }],
            },
        ],
    },
    // 添加devServer字段,其中字段变动比较大，配置时需要根据文档进行配置
    devServer: {
      historyApiFallback: true,
      port:'8086',   // 我电脑上默认的8080端口无法访问，所以设置port为8086
        after() {  /*打开浏览器 并打开本项目网址*/
          console.log('http://localhost:' + this.port);
      }
    },
    output: {
        libraryTarget: 'umd',
        path: path.join(__dirname, './', 'build'), // 通过HtmlWebpackPlugin插件生成的html文件存放在这个目录下面
        publicPath: NODE_ENV === 'production' ? './' : '/static/',
        filename: '[name].js', // //编译生成的js文件存放到根目录下面的js目录下面,如果js目录不存在则自动创建
        chunkFilename: '[name].js',
    },
    devtool: 'inline-source-map',
};
