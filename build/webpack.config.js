const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const resolve = dir => path.resolve(__dirname, dir);
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  entry: {
    about: resolve('../src/js/about.js'),
    home: resolve('../src/js/home.js')
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  // module: {
  // 	rules: [
  // 		{
  // 			test: /\.tsx?$/,
  // 			use: "ts-loader",
  // 			exclude:resolve("./node_modules")
  // 		},
  // 	],
  // },
  devServer: {
    contentBase: './dist',
    stats: 'errors-only',
    compress: true,
    host: 'localhost',
    port: 3001
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [resolve('./dist')]
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: true,
        mangle: {
          properties: false
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: resolve('../src/views/home.html'),
      filename: './home.html',
      inject: true,
      hash: true,
      chunks: ['vendors', 'home'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      template: resolve('../src/views/about.html'),
      filename: './about.html',
      inject: true,
      hash: true,
      chunks: ['vendors', 'about'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    })
  ]
};
