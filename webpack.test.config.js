const HtmlWebpackPlugin = require('html-webpack-plugin');
const BaseDevConfig = require('./webpack.dev.config');

BaseDevConfig.entry = [
  './test/index.tsx',
];

BaseDevConfig.devServer = {
  port: 8083
};

BaseDevConfig.plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './test/index.html',
}));

module.exports = BaseDevConfig;
