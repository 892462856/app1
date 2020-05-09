const express = require('express')
const dal = require('../dal/index')
const grab = require('../logic/grab')

const router = express.Router()
// router.use(function (req, res, next) {
//     next()
// })
router.get('', (req, res) => {
    res.render('index', { a: 12, b: 'gg' })
})
// router.get('/c', function (req, res) {
//     debugger
//     dal.tabs.getList(rows => {
//         res.render('index', { rows })
//     })
// })

class multikeyBase {
    constructor(router, dalClass, keys) {
        const keysUrl = keys.map(key => (`:${key}`)).join('+')
        // router.get('/paging'

        router.get('/grab', (req, res) => {
            grab.loadPage('http://www.yusuan123.com/page/1').then(home => {
                grab.parseHome(home, (ids) => {
                    ids.forEach(id => {
                        grab.loadPage(`http://www.yusuan123.com/${id}.html`).then(page => {
                            grab.parsePage(page, obj => {
                                obj.id = id
                                dal.articles.insert(obj, t => {
                                    console.log(t)
                                })
                            })
                        })
                    })
                })
                res.send(home)
            }).catch(error => {
                res.send(error.message)
            })
        })

        router.get('/list', (req, res) => {
            dalClass.getList(rows => {
                // res.render(`${dalClass.table}/list`, { rows })
                res.json(rows)
            })
        })
        router.get(`/${keysUrl}`, (req, res) => {
            const ids = keys.map((key) => req.params[key])
            dalClass.get(ids, rows => {
                debugger
                // res.render('list', { rows })
                res.json(rows)
            })
        })
        router.delete(`/${keysUrl}`, (req, res) => {
            const ids = keys.map((key) => req.params[key])
            dalClass.delete(ids, rows => {
                res.json(rows)
            })
        })
        router.put('/', (req, res) => {
            const obj = req.body
            dalClass.insert(obj, rows => {
                res.json(rows)
            })
        })
        router.post('/', (req, res) => {
            const obj = req.body
            dalClass.update(obj, rows => {
                res.json(rows)
            })
        })
        router.post(`/enable/${keysUrl}`, (req, res) => {
            const ids = keys.reduce((ids, key) => {
                ids[key] = req.params[key]
                return ids
            }, {})
            const enabled = req.body.enabled
            dalClass.enable(ids, enabled, rows => {
                res.json(rows)
            })
        })
    }
}

var tabsRouter = express.Router()
new multikeyBase(tabsRouter, dal.tabs, ['id'])

module.exports = {
    tab: tabsRouter
}