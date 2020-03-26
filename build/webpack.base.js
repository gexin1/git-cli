const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    about: resolve('../src/js/about.js'),
    home: resolve('../src/js/home.js')
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/',
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[id].chunk.[contenthash].js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    usedExports: true
  },
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   exclude: /node_modules/,
      //   include: path.resolve(__dirname, '../src'),
      //   use: ['html-loader']
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
              publicPath: '/css/'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[name].[ext]?[hash]',
            outputPath: 'images/',
            limit: 4096
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    stats: 'errors-only',
    compress: true,
    host: 'localhost',
    port: 3001
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/' + (devMode ? '[name].css' : '[name].[contenthash].css'),
      chunkFilename:
        'css/' + (devMode ? '[name].css' : '[name].[contenthash].css')
    }),
    new HtmlWebpackPlugin({
      template: resolve('../src/views/home.html'),
      filename: './home.html',
      inject: true,
      hash: true,
      chunks: ['vendors', 'common', 'home'],
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
      chunks: ['vendors', 'common', 'about'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    })
  ]
};
