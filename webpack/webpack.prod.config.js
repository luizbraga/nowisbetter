var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var config = require('./webpack.base.config.js');

config.entry = {
  main: [
    path.join(__dirname, '../static/js/src/index')
  ]
};

config.mode = 'production';


config.output = {
  path: path.join(__dirname, '../static/builds/'),
  filename: '[name]-[hash].min.js',
  publicPath: '/static/builds/'
};

config.plugins = [
  new BundleTracker({ filename: './webpack/webpack-stats.prod.json' }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      BASE_URL: JSON.stringify('http://0.0.0.0:5000'),
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    mangle: false,
    sourcemap: false
  })
];

module.exports = config;
