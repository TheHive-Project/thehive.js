/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2
const polyfill = require("babel-polyfill");

let libraryName = 'thehive';

let plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

const config = {
  entry: ['babel-polyfill', __dirname + '/src/index.js'],
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        use: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: [
      'axios',
      'https',
      'base64-js',
      'ieee754',
      'isarray',
      'lodash',
      'q',
      'form-data',
      'fs',
      'hapi',
      'babel-polyfill'
  ],
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;
