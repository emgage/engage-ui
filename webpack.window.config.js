/*
    Used to generate engage-ui for window library target, so that this lib can be loaded
    standalone in browsers and consumed via window.EngageUI.
*/
const BaseConfig = require('./webpack.base.config');
const path = require('path');

BaseConfig.entry = {
    EngageUI: './src/index.ts', 
};
BaseConfig.output = {
    filename: '[name].js',
    path: path.join(__dirname, 'lib'),
    libraryTarget: 'window',
    library: 'EngageUI'
};
BaseConfig.externals = {
    react: 'React',
    "react-dom": "ReactDOM",
};

module.exports = BaseConfig;