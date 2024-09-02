const base = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require("webpack");
const { Configuration: DevServerConfiguration } = require("webpack-dev-server")

const rootPath = path.resolve(__dirname, '../');
const key = 'preview.index';
base.entry[key] = `${rootPath}/preview/index.tsx`;


const ACCESS_TOKEN_KEY = 'access_token';

const onProxyReq = function (proxyReq, req) {
  const accessToken = (req.headers||{})[ACCESS_TOKEN_KEY] || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEsInVzciI6ImFkbWluIiwiZXhwaXJlX3RpbWUiOjE3MjUzNDQ5NTAyODJ9.TOWRXFWuwrsgGelUBYGtn6FSL4AjaDC1Pkjc4Fa-2DE';
  proxyReq.setHeader('Authorization', `Bearer ${accessToken}`);
  console.log(`[proxy] ${req.path} to ${proxyReq.host}${proxyReq.port}${(proxyReq.path || '').split('?')[0] || ''}`)
}


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
    hot: true,
    proxy: {
      '/dev/api/*': {
        target: 'http://10.66.79.72:8998',
        pathRewrite: {'^/dev/api': ''},
        changeOrigin: true,
        onProxyReq,
      },
    }
  }
}
module.exports = config;
