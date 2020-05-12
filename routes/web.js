const express = require('express')
const dal = require('../dal/index')

var router = express.Router()

router.get('/', (req, res) => {
  dal.articles.paging().then(data => {
    debugger
    res.render('index', data)
  })
})

router.get('/list/:page', (req, res) => {
  const pageIndex = parseInt(req.params.page || 1)
  dal.articles.paging({ pageIndex }).then(data => {
    res.render('index', data)
  })
})

module.exports = router