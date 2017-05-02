const path = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const TypeScriptConfigFile = require('./tsconfig.json');

module.exports = {
    entry: {
        style: './src/styles.scss',
        index: './src/index.ts', 
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'lib'),
        libraryTarget: 'umd',
        library: 'Polaris'
    },
    resolveLoader: {
        alias: {
            "shopify-icons-loader": path.join(__dirname, "./scripts/SvgToJsonPlugin.js")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            }, 
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
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
                            sourceMap: true,
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.join(__dirname, 'src'),
                                path.join(__dirname, 'src', 'styles'),
                                path.join(__dirname, 'src', 'styles', 'components'),
                            ],
                            sourceMap: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'shopify-icons-loader'
            }, 
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug=false'
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js', '.jsx'
        ],
        plugins: [
             new TsConfigPathsPlugin(TypeScriptConfigFile),
        ]
    },

  externals: [
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new CheckerPlugin(),
    ],
    devtool: 'source-map'
};