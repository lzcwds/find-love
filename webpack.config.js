/**
 * Created by dy on 2018/7/31.
 *
 */
const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

let pathsToClean = [
    'dist'
]

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        entry: "./src/canvas.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "canvas.js"
    },

    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }]
        },
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader?limit=100000&name=img/[hash:8].[name].[ext]'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                loader: 'url-loader?imit=100000&name=./assets/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new uglify(),
        new CleanWebpackPlugin(pathsToClean),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            filename: 'index.html',
            hash: true,
            template: './index.html'

        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname+"/src"),
        host: "localhost",
        compress: true,
        port: 8888
    }
};
