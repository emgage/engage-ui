const BaseConfig = require('./webpack.base.config');
const path = require('path');

BaseConfig.entry = {
    index: './src/index.ts', 
};
BaseConfig.output = {
    filename: '[name].js',
    path: path.join(__dirname, 'lib'),
    libraryTarget: 'umd',
    library: 'EngageUI'
},
BaseConfig.externals = [
    {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
    },
    {
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    }
],

module.exports = BaseConfig;