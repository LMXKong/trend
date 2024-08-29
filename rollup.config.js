import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import less from 'rollup-plugin-less';
import multiEntry from 'rollup-plugin-multi-entry';
import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import * as react from 'react';

const fs = require('fs');
const root = path.resolve(__dirname);
const config = {
  input: './index.tsx',
  output: {
    file: './es/index.tsx',
    format: 'es'
  },
  "external": ['react'],
  plugins: [
    resolve({
      extensions: ['.js', '.json'],
    }),
    less({
      output: `${__dirname}/dist/package/index.css`
    }),
    multiEntry(),
    babel({
      exclude: 'node_modules/**'
    }),
    // commonjs({
    //   include: 'node_modules/**',
    //   namedExports: {
    //     react: Object.keys(react),
    //   }
    // })
  ]
}

export default config;
