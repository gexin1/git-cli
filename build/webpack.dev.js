const merge = require('webpack-merge');
const base = require('./webpack.base');
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
module.exports = merge(
  {
    mode: 'development',
    output: {
      path: resolve('../dist'),
      publicPath: "./",
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[id].chunk.[contenthash].js'
    }
  },
  base
);
