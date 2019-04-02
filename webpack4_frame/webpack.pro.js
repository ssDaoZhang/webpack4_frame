const common_config = require('./webpack.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');
//压缩代码插件删除引入未应用
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");
// 创建多个实例
const extractSCSS = new ExtractTextPlugin('[name]sass[hash:8].css');
const extractLESS = new ExtractTextPlugin('[name]less[hash:8].css');
const extractCSS = new ExtractTextPlugin('[name][hash:8].css');

const path = require('path');

module.exports = merge(common_config, {
  // devtool: 'source-map',//上线产品可以取消
  mode:'production',//指定当前运行的模式：
  //"production"：产品模式，代码会压缩打包
  //"development":开发模式，代码不会压缩

  optimization: {
    //分离公共模块/分离第三方模块
    // runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new UglifyJSPlugin({
      // sourceMap: true
      }),
      //定义环境变量
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      extractCSS
      // ,
      // extractSCSS,
      // extractLESS
  ],
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {loader:'postcss-loader', options: {config:{path:'./'}}}
      //   ]
      // }
      //分离样式但不能兼容
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use:[
            'css-loader',
            'postcss-loader'
          ]})
      }
      // ,
      // {
      //   test: /\.sass$/,
      //   use: extractSCSS.extract({
      //     use:[
      //       'css-loader',
      //       'postcss-loader',
      //       'sass-loader'
      //     ]})
      // },
      // {
      //   test: /\.less$/,
      //   use: extractLESS.extract({
      //     use:[
      //       'css-loader',
      //       'postcss-loader',
      //       'less-loader'
      //     ]})
      //  }
    ]
  }
});