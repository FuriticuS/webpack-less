// пути
const path = require('path');
// const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// const {NODE_ENV} = process.env;

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
            minify: false
        })
    ]
}
