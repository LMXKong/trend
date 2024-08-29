const base = require('./webpack.base.config');
const uglify = require('uglifyjs-webpack-plugin');

module.exports = Object.assign({}, base, {
  mode: 'production',
  plugins: [new uglify()].concat(base.plugins || [])
})
