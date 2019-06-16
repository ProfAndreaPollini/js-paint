const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins


module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        }]
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}