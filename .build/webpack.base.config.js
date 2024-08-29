const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');


const cssLoader = ['style-loader', 'css-loader'];
const rootPath = path.resolve(__dirname, '../');

const getCacheLoader = (cacheDir) => ({
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.resolve(rootPath, `node_modules/.cache/cache-loader/${cacheDir}`)
  }
})

const entry = {app:  path.resolve(rootPath, 'preview/index.tsx')};

const config = {
  mode: 'development',
  entry,
  output: {
    path: `${rootPath}/dist`,
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      process: {
        env: {}
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [getCacheLoader('css'), ...cssLoader]
      },
      {
        test: /\.less$/,
        use: [
          getCacheLoader('less'), 
          'style-loader', 
          {
            loader: 'css-loader?modules', // 转换 CSS into JS modules
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]', // 生成唯一的类名
              },
            },
          },
          'less-loader'
        ]
      },
      {
        test: /\.(tsx|ts)?$/,
        use: [
          getCacheLoader('ts'),
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              // cacheDirectory: path.resolve(rootPath, 'node_modules/.cache/ts-loader')
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jsx|js)$/,
        use: [
          getCacheLoader('js'),
          'babel-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      'src': path.resolve(rootPath, 'src'), // 指定 'src' 别名到项目的 src 目录
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less'],
  },
};
module.exports = config;
