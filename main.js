const fs = require('fs')
const path = require('path')
const res = fs.readdirSync(path.resolve(__dirname, './src'))
const jsRes = res.filter(item => /\.js$/.test(item))
const jsMapRes = jsRes.reduce((prev, cur) => {
    const key = path.parse(cur).name
    prev[key] = cur
    return prev
}, {})
console.log('jsMapRes', jsMapRes)
