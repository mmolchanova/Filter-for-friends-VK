const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    entry: PATHS.source + '/index.js',
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    devServer: {
        index: 'index.html'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.hbs',
            filename: 'index.html',
            // chunks: ['index']
        }),
        new CleanWebpackPlugin('build'),
        new ExtractTextPlugin('[name].css'),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common'
        // }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: {removeAll: true } }
        }),
        new StyleLintPlugin({
            configFile: './.stylelintrc'
        }),
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: './',
                    use: ['css-loader','sass-loader'],
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })                
            },
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "eslint-loader",
                options: {
                    fix: true
                }            
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader'
            }
        ]
    }
};