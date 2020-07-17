const path = require('path');

module.exports = {
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
