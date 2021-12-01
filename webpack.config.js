// пути
const path = require('path');
// const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

const TerserPlugin = require('terser-webpack-plugin');

// модули которые будут запускаться с входным и выходным файлом
module.exports = {
    // направление для билда
    // mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './build'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.scss'],
    },

    //оптимизация файлов - убрать пробелы, коменты и тд
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    },

    // localhost сервер
    devServer: {
        port : '6789'
    },

    // массив плагинов webpack
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('development')
        // }),
        //new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: isProd // если прод то сделать minify
        }),

        new MiniCssExtractPlugin({
           filename: '[name].min.css'
        }),
    ],

    // объект loader
    module: {
        rules: [
            {
                test: /.(css|s[ac]ss)$/,
                // ПОРЯДОК ОЧЕНЬ ВАЖЕН !!! читается снизу-вверх
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        }
                    },
                ],
                type: 'javascript/auto'
            },
            {
                test: /.(woff(2)?|eot|otf|ttf|svg)$/,
                exclude: /img/,
                loader: 'file-loader',
                options: {
                    publicPath: '../',
                    context: path.resolve(__dirname, 'src/assets'),
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: true
                    }
                }
            }
        ]
    }
}
