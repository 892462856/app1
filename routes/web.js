const express = require('express')
const dal = require('../dal/index')

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
        // router.get('/paging', (req, res) => {
        //     dal.tabs.paging(rows => {
        //         res.render('paging', { rows })
        //     })
        // })
        router.get('/list', (req, res) => {
            dalClass.getList(rows => {
                res.render('list', { rows })
            })
        })
        router.get(`/${keysUrl}`, (req, res) => {
            const ids = keys.reduce((ids,key)=>{
                ids[key]=req.query[key]
                return ids
            },{})
            dalClass.get(ids, rows => {
                res.render('list', { rows })
            })
        })
        router.delete(`/${keysUrl}`, (req, res) => {
            const ids = keys.reduce((ids,key)=>{
                ids[key]=req.query[key]
                return ids
            },{})
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
            const ids = keys.reduce((ids,key)=>{
                ids[key]=req.query[key]
                return ids
            },{})
            const enabled = req.body.enabled
            dalClass.enable(ids, enabled, rows => {
                res.json(rows)
            })
        })
    }
}

class simpleKeyBase extends multikeyBase{
    constructor(router, dalClass) {
        super(router, dalClass, ['id'])
        // router.get('/paging', (req, res) => {
        //     dal.tabs.paging(rows => {
        //         res.render('paging', { rows })
        //     })
        // })
        // router.get('/list', (req, res) => {
        //     dalClass.getList(rows => {
        //         res.render('list', { rows })
        //     })
        // })
        // router.get('/:id', (req, res) => {
        //     const id = req.query.id
        //     dalClass.get(id, rows => {
        //         res.render('list', { rows })
        //     })
        // })
        // router.delete('/:id', (req, res) => {
        //     const id = req.query.id
        //     dalClass.delete(id, rows => {
        //         res.json(rows)
        //     })
        // })
        // router.put('/', (req, res) => {
        //     const obj = req.body
        //     dalClass.insert(obj, rows => {
        //         res.json(rows)
        //     })
        // })
        // router.post('/', (req, res) => {
        //     const obj = req.body
        //     dalClass.update(obj, rows => {
        //         res.json(rows)
        //     })
        // })
        // router.post('/enable/:id', (req, res) => {
        //     const id = req.query.id
        //     const enabled = req.body.enabled
        //     dalClass.enable(id, enabled, rows => {
        //         res.json(rows)
        //     })
        // })
    }
}

var tabsRouter = express.Router()
new simpleKeyBase(tabsRouter,dal.tabs)

module.exports = router