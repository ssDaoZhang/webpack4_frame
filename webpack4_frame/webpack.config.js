//1.同一个模板文件模板文件可以使用多次
//2.一个指定的html导出文件只能引入一个编译后的js文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const AddAssetHtmlPlugin =require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const webpack = require('webpack');
const path = require('path');
//指定输入文件
let fileEntry = {
  f1:"./src/index.js"
  // f2:"./src/index2.js"
}
module.exports = {
  entry: fileEntry,
  output: {
    filename: '[name]-[hash:8].js',
    chunkFilename: '[name].ooo.js',//懒加载
    path: path.resolve('./dist')
  },
  //devtool: 'inline-source-map',//开发环境使用
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {//文件小于limit byte是编码为base64
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20000
            }
          }
        ]
      },
        //字体loader
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       }
      
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),//清理生成文件夹
    new HtmlWebpackPlugin({
        template: path.resolve('./static/index.html'), // 源模板文件
                                /*  1、filename配置的html文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
                                    2、指定生成的html文件内容中的link和script路径是相对于生成目录下的，写路径的时候请写生成目录下的相对路径。*/
        filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path
                                    /*  1、template配置项在html文件使用file-loader时，其所指定的位置找不到，导致生成的html文件内容不是期望的内容。
                                        2、为template指定的模板文件没有指定任何loader的话，默认使用ejs-loader。如template: './index.html'，若没有为.html指定任何loader就使用ejs-loader*/
        showErrors: true,//默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。
        inject: 'body', //、true或者body：所有JavaScript资源插入到body元素的底部
                        //2、head: 所有JavaScript资源插入到head元素中
                        //3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
        chunks: ['f1'],//指定导入该html的入口文件，元素时String与导出文件名的[name]相对
        // excludeChunks: ['f2'],/*这个与chunks配置项正好相反，用来配置不允许注入的thunk。*/
        hash:true,/*是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值，添加hash形式如下所示：
                            html <script type="text/javascript" src="common.js?a3e1396b501cdd9041be"></script>*/
        
    }),
    // new HtmlWebpackPlugin({
    //     template: path.resolve('./static/index.html'), // 源模板文件
    //     filename: './index1.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
    //     showErrors: true,
    //     inject: 'body',
    //     chunks: ['f2']
    // })
  ]
};