const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const dirRes = fs.readdirSync(path.resolve(__dirname, './src'))
const jsRes = dirRes.filter(item => /\.js$/.test(item))
const res = jsRes.reduce((prev, cur) => {
    const key = path.parse(cur).name
    prev.entries[key] = `./src/${cur}`
    prev.htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        template: `./src/${key}.html`,
        filename: `${key}.html`,
        chunks: [`${key}`]
    }))
    return prev
}, {
    entries: {},
    htmlWebpackPlugins: []
})
// console.log('res', res)

module.exports = {
    entry: res.entries,
    mode: 'development',
    devtool: '',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './src/dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?url=false']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'bg-img'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        ...res.htmlWebpackPlugins,
        new CopyPlugin({
            patterns: [
                { from: "./src/img", to: "./img" }
            ]
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}
