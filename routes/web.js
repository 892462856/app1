const express = require('express')

var router = express.Router()
// router.use(function (req, res, next) {
//     next()
// })

router.get('', (req, res) => {
    res.render('index', { a: 12, b: 'gg' })
})
router.get('/c', function (req, res) {
    res.render('index', { a: 12, b: 'gg' })
})

module.exports = router