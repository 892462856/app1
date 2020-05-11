const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const rf = require("fs")
app.use('/static', express.static('static'))//静态文件托管
const mustacheExpress = require('mustache-express')
app.engine('html', mustacheExpress('./views/base', '.html'));
app.set('views', './views')
app.set('view engine', 'html')

// app.use(function (err, req, res, next) {
//   console.log('-------------')
//   console.error(err.stack)
//   res.status(500).send('err.message')
//   next(err)
// })

const router = require('./routes/api')
// app.use('api/article', router.tab)
// app.use('api/classify', router.tab)
app.use('/tab', router.tab)
// app.use('api/menu', router.tab)
// app.use('api/articleClassify', router.tab)
// app.use('api/articleTab', router.tab)
app.get('', (req, res) => {
  res.render('index', { a: 12, b: 'gg' })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))