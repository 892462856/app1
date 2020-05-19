const express = require('express')
// const dal = require('../dal/index')

const dal={}

var router = express.Router()

router.get('/', (req, res) => {
    res.render('index', [])
    // dal.articles.paging().then(data => {
    //     debugger
    //     res.render('index', data)
    // })
})

router.get('/list/:page', (req, res) => {
    const pageIndex = parseInt(req.params.page || 1)
    dal.articles.paging({ pageIndex }).then(data => {
        res.render('index', data)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    dal.articles.get(id).then(data => {
        debugger
        res.render('page', data.length ? data[0] : {})
    })
})

module.exports = router