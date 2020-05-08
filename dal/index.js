const menu = require('./menu')
const tabs = require('./tabs')
const classifys = require('./classifys')
const articles = require('./articles')
const articlesTabs = require('./articlesTabs')
const articlesClassify = require('./articlesClassify')

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'app1'
})
connection.connect()

// connection.end()

module.exports = {
  menu: new menu(connection),
  tabs: new tabs(connection),
  classifys: new classifys(connection),
  articles: new articles(connection),
  articlesTabs: new articlesTabs(connection),
  articlesClassify: new articlesClassify(connection),
}