const express = require('express')
const Tabs = require('../dal/connection')

var router = express.Router()
// router.use(function (req, res, next) {
//     next()
// })

router.get('', (req, res) => {
    res.render('index', { a: 12, b: 'gg' })
})
router.get('/c', function (req, res) {
    debugger
    (new Tabs()).getList(rows => {
        res.render('index', { rows })
    })
})

module.exports = router