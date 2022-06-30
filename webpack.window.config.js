/*
    Used to generate engage-ui for window library target, so that this lib can be loaded
    standalone in browsers and consumed via window.EngageUI.
*/
const BaseConfig = require('./webpack.base.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

BaseConfig.entry = {
    EngageUI: './src/index.ts',
    'EngageUI.min': './src/index.ts',
    DeliciousTheme: './themes/Delicious/index.tsx',
    'DeliciousTheme.min': './themes/Delicious/index.tsx'
};
BaseConfig.output = {
    filename: '[name].js',
    path: path.join(__dirname, 'lib'),
    libraryTarget: 'window',
    library: '[name]'
};
BaseConfig.externals = {
    react: 'React',
    "react-dom": "ReactDOM",
};
BaseConfig.optimization = {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })]
}

module.exports = BaseConfig;