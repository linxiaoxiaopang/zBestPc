const webpack = require('webpack')
const path = require("path")
module.exports = {
    mode: "development",
    devtool: '',
    entry: {
        jquery: ['jquery'],
        myJquery: ['./src/myJquery.js'],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, './src/dist/dll'),
        library:'jquery'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            format: true,
            path: path.resolve(__dirname, './src/dll/[name].manifest.json')
        })
    ]
}
