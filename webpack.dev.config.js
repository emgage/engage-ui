const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BaseConfig = require('./webpack.base.config');

BaseConfig.entry = [
  './example/src/index.tsx',
];

BaseConfig.output = {
  path: join(__dirname, 'build'),
  filename: 'bundle.js',
  publicPath: '/',  
};

BaseConfig.devServer = {
  historyApiFallback: true,
};

BaseConfig.plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './example/src/index.html',
}));

module.exports = BaseConfig;
