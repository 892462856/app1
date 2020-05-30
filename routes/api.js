const express = require('express')
const dal = require('../dal/index')
const grab = require('../logic/grab')
const { debug } = require('request')

const grabContent = function (item,update=false) {
    grab.loadPage(item.id, true).then(page => {
        grab.parsePage(page, article => {            
            const classifys = article.classifys
            const tabs = article.tabs
            article.id = item.id
            delete article.classifys
            delete article.tabs
            article.smallImg = item.smallImg ? '1' : '0'
            article.intro = item.intro
            if(update){
                dal.articles.update(article)
            }else{
                dal.articles.insert(article)
            }     
            console.log('save', item.id)       
            classifys.forEach(classify => {
                dal.articlesClassify.insert({ articles_id: item.id, classifys_id: classify })
            })
            tabs.forEach(tab => {
                dal.articlesTabs.insert({ articles_id: item.id, tabs_id: tab })
            })
        })
    }).catch(error => {
        console.log(error.message)
    })
}

const startGrab = function (pageIndex) {
    grab.loadPage(pageIndex).then(home => {
        grab.parseHome(home, (items) => {
            items.forEach(item => {
                grabContent(item)
            })
        })
    }).catch(error => {
        console.log(error.message)
    })
} // 还有 导航 未有

class multikeyBase {
    constructor(router, dalClass, keys) {
        const keysUrl = keys.map(key => (`:${key}`)).join('+')

        router.get('/grab', (req, res) => {
            for (let i = 1; i < 144; i++) {
                startGrab(i)
            }
            res.json('结束')
        })

        router.get('/regrab', (req, res) => {
            // debugger
            dal.articles.getInvalidList().then(list => {
                list.forEach(item => {
                    // debugger
                    grabContent(item,true)
                })
            })
            // for (let i = 1; i < 144; i++) {
            //     startGrab(i)
            // }
            res.json('结束2')
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

var classifysRouter = express.Router()
new multikeyBase(classifysRouter, dal.classifys, ['id'])

var menuRouter = express.Router()
new multikeyBase(menuRouter, dal.menu, ['id'])

var articlesRouter = express.Router()
new multikeyBase(articlesRouter, dal.articles, ['id'])

var articlesClassifyRouter = express.Router()
new multikeyBase(articlesClassifyRouter, dal.articlesClassify, ['articles_id', 'classifys_id'])

var articlesTabsRouter = express.Router()
new multikeyBase(articlesTabsRouter, dal.articlesTabs, ['articles_id', 'tabs_id'])

module.exports = {
    tabs: tabsRouter,
    classifys: classifysRouter,
    menu: menuRouter,
    articles: articlesRouter,
    articlesClassify: articlesClassifyRouter,
    articlesTabs: articlesTabsRouter
}