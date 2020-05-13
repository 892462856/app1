const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const rf = require("fs")
app.use('/static', express.static('static')) //静态文件托管
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

const apiRouter = require('./routes/api')
const webRouter = require('./routes/web')

app.use('/api/tab', apiRouter.tabs)
app.use('/api/classify', apiRouter.classifys)
app.use('/api/menu', apiRouter.menu)
app.use('/api/article', apiRouter.articles)
app.use('/api/articleClassify', apiRouter.articlesClassify)
app.use('/api/articlesTab', apiRouter.articlesTabs)

app.use(webRouter)

// app.get('', (req, res) => {
//   res.render('index', { a: 12, b: 'gg' })
// })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))