const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const multiEntry = require('rollup-plugin-multi-entry');
const autoExternal = require('rollup-plugin-auto-external');
const postcss = require('rollup-plugin-postcss');
import commonjs from '@rollup/plugin-commonjs';
import * as react from 'react';
const _path = require('path');
const fs = require('fs');
const root = _path.resolve(__dirname, '../');

const dirs = [`${root}/es/lib/css`];
const config = {
  // input: './entry/index.tsx',
  output: {
    file: `${root}/es/lib/index.tsx`,
    format: 'es'
  },
  // external: ['moment', 'react', 'antd/dist/antd.css'],
  /*
  onwarn: function (message) {
      if (/The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten./.test(message)) {
        return;
      }
    if(true) {
      return;
    }
  },
  */
  plugins: [
    autoExternal(),
    resolve({
      extensions: ['.js', '.json'],
    }),
    multiEntry(),
    babel({
      exclude: 'node_modules/**',
      presets: ["@babel/preset-react"],
      plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true  }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
      ]
    }),
    commonjs({
			extensions: ['.esm.js', '.mjs', '.js', '.ts'],
      namedExports: {
        react: Object.keys(react),
      }
    })
  ]
}


module.exports =  config;
