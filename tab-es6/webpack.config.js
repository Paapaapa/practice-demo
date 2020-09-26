const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 单入口
  entry: './index.js',

  // 加载器配置 loader
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.tpl$/,
        loader: 'ejs-loader',
        options: {
          esModule: false,
        },
      },
    ],
  },

  // 插件配置 plugins
  plugins: [
    // html文件生成插件
    new HtmlwebpackPlugin({
      template:'./index.html',
    }),

    // 开启热更新
    new webpack.HotModuleReplacementPlugin(),
  ],

  mode: 'development',// 环境 mode

  // webpack dev server配置
  devServer: {
    contentBase: './dist',// 告诉dev server，在哪里查找文件
    hot: true,// 开启热更新
  },

  // 开启source map
  devtool: 'source-map',
};