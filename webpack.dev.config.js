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

BaseConfig.module.rules.splice(2, 1, {
    test: /\.scss$/,
    use: [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader',
            options: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
                modules: true,
                importLoaders: 1,
                sourceMap: false,
            }
        }, 
        {
            loader: 'sass-loader',
            options: {
                includePaths: [
                    join(__dirname, 'example', 'src', 'style'),
                ],
                sourceMap: false
            }
        },
        {
            loader: 'sass-resources-loader',
            options: {
                resources: [
                    './example/src/styles/_variables.scss',
                ],
            },
        },
    ],
    exclude: /node_modules/
});

module.exports = BaseConfig;
