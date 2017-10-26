const HtmlWebpackPlugin = require('html-webpack-plugin');
const BaseDevConfig = require('./webpack.dev.config');

BaseDevConfig.entry = [
  './example/src/index.tsx',
];

BaseDevConfig.devServer = {
  port: 8082
};

BaseDevConfig.plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './example/src/index.html',
}));

module.exports = BaseDevConfig;
