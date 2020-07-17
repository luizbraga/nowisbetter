var path = require('path');
var BundleTracker = require('webpack-bundle-tracker');
var webpack = require('webpack');
var config = require('./webpack.base.config.js');

config.entry = {
  main: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../static/js/src/index')
  ]
};

config.mode = 'development';

config.devtool = 'cheap-module-eval-source-map';
config.output = {
  path: path.join(__dirname, '../static/builds-dev/'),
  filename: '[name]-[hash].js',
  publicPath: 'http://0.0.0.0:3000/static/builds/',
};

config.plugins = [
  new BundleTracker({ filename: './webpack/webpack-stats.dev.json' }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      BASE_URL: JSON.stringify('http://0.0.0.0:8000'),
    }
  })
];

config.devServer = {
  inline: true,
  progress: true,
  hot: true,
  historyApiFallback: true,
  host: '0.0.0.0',
  port: 3000
};

module.exports = config;
