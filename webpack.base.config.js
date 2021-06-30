const path = require('path');
const webpack = require('webpack');
const TypeScriptConfigFile = require('./tsconfig.json');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// From SASS -> CSS, we use the same loaders
// When it comes to theme, we want to use style loader options
// to put styles in body, for base styles, we want them in head
const sharedCssLoaders = [{
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
                path.join(__dirname, 'src', 'styles', 'foundation'),
                path.join(__dirname, 'src', 'styles', 'components'),
                path.join(__dirname, 'src', 'themes', 'Delicious'),
            ],
            sourceMap: false
        }
    },
    {
        loader: 'sass-resources-loader',
        options: {
            resources: [
                // './src/styles/calendar.scss',
                './src/styles/foundation.scss',
                './themes/Delicious/foundation.scss',
                './src/styles/shared.scss',
                './themes/Delicious/shared.scss',
            ],
        },
    },
];

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
                query: {compact: false},
                exclude: /node_modules/,
            }, 
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader?compact=false', 'awesome-typescript-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    ...sharedCssLoaders,
                ],
                exclude: [/node_modules/, /themes/]
            },
            // Theme styles need to be put in body to override base
            {
                test: /themes.*\.scss/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert: 'body',
                        },
                    },
                    ...sharedCssLoaders,
                ],
                exclude: [/node_modules/]
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
            debug: true,
       })
    ],
    devtool: 'source-map',
    mode: 'development',
};
