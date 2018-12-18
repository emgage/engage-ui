const BaseConfig = require('./webpack.base.config');
const path = require('path');

BaseConfig.entry = {
    index: './src/index.ts', 
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