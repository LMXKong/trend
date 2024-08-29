const base = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require("webpack")

const rootPath = path.resolve(__dirname, '../');
const key = 'preview.index';
base.entry[key] = `${rootPath}/preview/index.tsx`;

const config = {
  ...base,
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      process: {
        env: {}
      }
    }),
    new HtmlWebpackPlugin({filename:'index.html', inject: 'body', template: `${rootPath}/preview/index.html`, chunks:[key]}),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '0.0.0.0',
    compress: true // 开启服务端压缩
    // port: 8080
  }
}
module.exports = config;
