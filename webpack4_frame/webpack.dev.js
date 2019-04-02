const common_config = require('./webpack.config');
const merge = require('webpack-merge');
//1.同一个模板文件模板文件可以使用多次
//2.一个指定的html导出文件只能引入一个编译后的js文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const AddAssetHtmlPlugin =require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
module.exports = merge(common_config, {
  devtool: 'inline-source-map-map',
  mode:'development',//指定当前运行的模式：
  //"production"：产品模式，代码会压缩打包
  //"development":开发模式，代码不会压缩
  plugins: [
    new webpack.NamedModulesPlugin(),//当开启热更新的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.HotModuleReplacementPlugin()//热更新插件
  ],
  watch:                true,//启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改。
  devServer:{//开发服务器webpack-dev-server配置
      contentBase:path.resolve('./dist'),//静态文件地址
      port:8088,//默认端口号为8080,可以自定义
      hot:                  true,//启用热更新
      historyApiFallback:   true,//任意的404响应都可能需要被替代为 index.html
      inline:               true,
      publicPath:           '/',//dev-sever下访问资源根路径  映射output.publicPath
      stats: {
          color: true//彩色输出信息
        },
      clientLogLevel: 'none',//控制运行dev-server或热更新时，控制态输出的信息：noen禁用、error出错输出、warning警告输出、info(默认)全输出
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {loader:'postcss-loader', options: {config:{path:'./'}}}
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {loader:'postcss-loader', options: {config:{path:'./'}}}
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          "less-loader",
          {loader:'postcss-loader', options: {config:{path:'./'}}}
        ]
      }
    ]
  }
});