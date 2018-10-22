const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = path.resolve(__dirname, './src');
// const WpPluginWatchOffset = require('wp-plugin-watch-offset');
const babelLoaderConfiguration = {
    test: /\.js$/,
    // Add every directory that needs to be compiled by Babel during the build
   /* include: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules/react-native-uncompiled')
    ],*/
    include: [
        appDirectory,
        path.resolve(__dirname, 'node_modules/react-native-uncompiled'),
        path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
        path.resolve(__dirname, 'node_modules/react-navigation'),
        path.resolve(__dirname, 'node_modules/react-native-drawer-layout'),
        path.resolve(__dirname, 'node_modules/react-native-dismiss-keyboard'),
        path.resolve(__dirname, 'node_modules/react-native-safe-area-view'),
        path.resolve(__dirname, 'node_modules/react-native-tab-view')
      ],
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        // This aliases 'react-native' to 'react-native-web' and includes only
        // the modules needed by the app
        plugins: [
            'babel-polyfill',
            'react-native-web',
            // needed to support async/await
            'transform-runtime'
        ],
        // The 'react-native' preset is recommended (or use your own .babelrc)
        presets: ['react-native']
      }
    }
  };
  
module.exports = {
    stats: { assets: true, children: false, chunks: false, modules: false, source: false },
    mode: "development",
    entry: [
        "babel-polyfill",
        path.resolve(appDirectory, 'index.js')
    ],
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
        alias: Object.assign(
            { 
           // 'react-native': 'react-native-web' 
           'react-native$': 'react-native-web/dist/cjs'
        },
        // mock haste resolver
        [
            'ActivityIndicator',
            'Alert',
            'AsyncStorage',
            'Button',
            'DeviceInfo',
            'Modal',
            'NativeModules',
            'Platform',
            'SafeAreaView',
            'SectionList',
            'StyleSheet',
            'Switch',
            'Text',
            'TextInput',
            'TouchableHighlight',
            'TouchableWithoutFeedback',
            'View',
            'ViewPropTypes'
        ].reduce(
            (acc, curr) => {
            acc[curr] = `react-native-web/dist/cjs/exports/${curr}`;
            return acc;
            }
        )
        ),
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
            babelLoaderConfiguration,
            // {
            //     loader: 'babel-loader',
            //     test: /\.js$/,                
            //     query: {
            //         presets: ['es2015', 'react','stage-0']
            //     }
            //   }, 
              {
                test: /\.jsx$/,
                loader: 'babel-loader!jsx-loader?harmony',
                query: {
                    presets: ['es2015', 'react','stage-0']
                  }
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