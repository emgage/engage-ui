const path = require('path');
const webpack = require('webpack');
const TypeScriptConfigFile = require('./tsconfig.json');

module.exports = {
    resolveLoader: {
        alias: {
            "shopify-icons-loader": path.join(__dirname, "./config/webpack/SvgToJsonPlugin.js")
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }, 
            {
                test: /\.tsx?$/,
                loader: 'babel-loader!ts-loader',
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
                            importLoaders: 1,
                            sourceMap: false,
                        }
                    }, 
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.join(__dirname, 'src'),
                                path.join(__dirname, 'src', 'styles'),
                                path.join(__dirname, 'src', 'styles', 'components'),
                            ],
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                './src/styles/calendar.scss',
                                './src/styles/foundation.scss',
                                './themes/Delicious/foundation.scss',
                                './src/styles/shared.scss',
                                './themes/Delicious/shared.scss',
                            ],
                        },
                    },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'shopify-icons-loader',
                exclude: path.join(__dirname, 'src/components/DatePicker')
            }, 
            {
              test: /DatePicker.*\.svg/,
              loader: [
                {
                  loader: 'babel-loader',
                },
                {
                  loader: 'react-svg-loader',
                  query: {
                    jsx: false,
                  }
                }
              ],
            }, 
            {
                test: /\.(jpe?g|ico|png|gif)$/i,
                loader: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug=false'
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js', '.jsx', '.scss'
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true
       })
    ],
    devtool: 'source-map',
};