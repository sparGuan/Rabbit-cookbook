const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WpPluginWatchOffset = require('wp-plugin-watch-offset');

module.exports = {
    stats: { assets: true, children: false, chunks: false, modules: false, source: false },
    mode: "development",
    entry: {
        bundle: path.join(__dirname, './src/index.js'),
    },
    plugins: [
        // new AssetsPlugin({ filename: 'build/manifest.json', prettyPrint: true }),
        new webpack.DefinePlugin({
          // __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
          'process.env':{
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          }
        }),
        new HtmlWebpackPlugin({
            title: 'screenShop'
        }),
        /*设置热更新*/
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json'],
        alias: { 'react-native': 'react-native-web' },
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
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              include: [
                path.resolve(__dirname, "./src"),                
              ],
              loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            },
            {
                test: /\.svg$/,
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
        path: path.join(__dirname, '..', 'build'),
        publicPath: '/static/',
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    devtool: 'inline-source-map',
};