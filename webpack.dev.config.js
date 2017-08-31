const { join } = require('path');
const BaseConfig = require('./webpack.base.config');

BaseConfig.output = {
  path: join(__dirname, 'build'),
  filename: 'bundle.js',
  publicPath: '/',  
};

BaseConfig.devServer = {
  historyApiFallback: true,
};

module.exports = BaseConfig;
