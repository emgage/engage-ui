const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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

BaseConfig.plugins.push(new CopyWebpackPlugin([{
  from: './example/assets/prism.js'
},{
  from: './example/assets/prism.css'
},{
  from: './node_modules/react-table/react-table.css'
}]));

module.exports = BaseConfig;
