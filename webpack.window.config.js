
const BaseConfig = require('./webpack.base.config');
const path = require('path');

BaseConfig.entry = {
    Emgage: './src/index.ts', 
    DeliciousTheme: './themes/Delicious/index.tsx',
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

module.exports = BaseConfig;