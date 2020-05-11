const express = require('express')
const dal = require('../dal/index')
const grab = require('../logic/grab')

const startGrab = function (pageIndex) {
    grab.loadPage(`http://www.yusuan123.com/page/${pageIndex}`).then(home => {
        grab.parseHome(home, (ids) => {
            ids.forEach(id => {
                grab.loadPage(`http://www.yusuan123.com/${id}.html`).then(page => {
                    grab.parsePage(page, obj => {
                        const classifys = obj.classifys
                        const tabs = obj.tabs
                        obj.id = id
                        delete obj.classifys
                        delete obj.tabs
                        dal.articles.insert(obj)
                        classifys.forEach(classify => {
                            // dal.classifys.get(classify).then(rows => {
                            //     if (rows.length === 0) {
                            //         dal.classifys.insert({ id: classify, name: classify })
                            //     }
                            // }) // 结束后从articlesClassify里分组取
                            dal.articlesClassify.insert({ articles_id: id, classifys_id: classify })
                        })
                        tabs.forEach(tab => {
                            // dal.tabs.get(tab).then(rows => {
                            //     if (rows.length === 0) {
                            //         dal.tabs.insert({ id: tab, name: tab })
                            //     }
                            // }) // 结束后从articlesTabs里分组取
                            dal.articlesTabs.insert({ articles_id: id, tabs_id: tab })
                        })
                    })
                })
            })
        })
        res.send(home)
    }).catch(error => {
        res.send(error.message)
    })
}

class multikeyBase {
    constructor(router, dalClass, keys) {
        const keysUrl = keys.map(key => (`:${key}`)).join('+')
        // router.get('/paging'

        // router.use(function (err, req, res, next) {
        //     console.log('-------------')
        //     console.error(err.stack)
        //     res.status(500).send(err.message)
        //     next(err)
        //   })

        router.get('/grab', (req, res) => {
            for (let i = 1; i < 139; i++) {
                startGrab(i)
            }
        })

        router.get('/list/:page', (req, res) => {
            const pageIndex = parseInt(req.params.page || 1)
            dalClass.paging({ pageIndex }).then(data => {
                res.json(data)
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