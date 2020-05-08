const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const rf = require("fs")
app.use('/static', express.static('static'))//静态文件托管
const mustacheExpress = require('mustache-express')
// app.engine("html", mustacheExpress())//npm 安装的mustache没有提供模板引擎，不注册模板引擎会报错Error: Module "mustache" does not provide a view engine.
app.engine('html', mustacheExpress('./views/base', '.html'));
app.set('views', './views')
app.set('view engine', 'html')

const webRouter = require('./routes/web')
app.use('/', webRouter)




app.listen(port, () => console.log(`Example app listening on port ${port}!`))