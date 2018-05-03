const HtmlWebpackPlugin = require('html-webpack-plugin');
const BaseDevConfig = require('./webpack.dev.config');

BaseDevConfig.entry = [
  './docs/src/index.tsx',
];

BaseDevConfig.devServer = {
  port: 8084
};

BaseDevConfig.plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './docs/src/index.html',
}));

module.exports = BaseDevConfig;
