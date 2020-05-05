const express = require('express')
const app = express()
const port = 3000

const rf = require("fs")
app.use('/static', express.static('static'))//静态文件托管
const mustacheExpress = require('mustache-express')
app.engine("html", mustacheExpress())//npm 安装的mustache没有提供模板引擎，不注册模板引擎会报错Error: Module "mustache" does not provide a view engine.
app.set('views', __dirname +'/views')
app.set('view engine', 'html')

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/a', function (req, res) {
    res.render('index', {a:12,b:'gg'})//把读取的数据填充进模板
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))