const http = require("http")
const { debug } = require('console')

const regexs =
{
  list: '<article class="excerpt .+?"><a target="_blank" class="focus" href="http://www.yusuan123.com/(.+?).html">',
  title: '<h1 class="article-title"><a href=".+?">(.+?)</a></h1>',
  content: '<article class="article-content">((.|\r|\n)+?)</article>',
  link: '链接：<a target="_blank" rel="nofollow" href=".+?"  target="_blank"  rel="nofollow" >(.+?)</a>',
  fetchCode: '提取码：(.+?)</p>',
  content2: '<iframe .+?</iframe>',
  content3: '<script (.|\r|\n)+?</script>',
  content4: '<a target="_blank" rel="nofollow" (.|\r|\r)+?</a>',
  content5: '<div class="asb asb-post asb-post-01"></div>'
}

const parsePage = function (html, callback) {
  const obj = {}
  let reg = new RegExp(regexs.title, 'im')
  html = html.replace(reg, (a, b) => {
    debugger
    obj.title = b
    return a
  })
  reg = new RegExp(regexs.content, 'im')
  html = html.replace(reg, (a, content) => {
    debugger
    reg = new RegExp(regexs.content2, 'igm')
    content = content.replace(reg, (a, b) => (''))
    reg = new RegExp(regexs.content3, 'igm')
    content = content.replace(reg, (a, b) => (''))
    reg = new RegExp(regexs.content4, 'igm')
    content = content.replace(reg, (a, b) => (''))
    reg = new RegExp(regexs.content5, 'igm')
    content = content.replace(reg, (a, b) => (''))

    obj.content = content
    return a
  })
  reg = new RegExp(regexs.link, 'im')
  html = html.replace(reg, (a, b) => {
    debugger
    obj.link = b
    return a
  })
  reg = new RegExp(regexs.fetchCode, 'im')
  html = html.replace(reg, (a, b) => {
    debugger
    obj.fetchCode = b
    return a
  })
  // console.log(obj)
  callback(obj)
}

const parseHome = function (html, callback) {
  const ids = []
  const reg = new RegExp(regexs.list, 'igm')
  const result = html.replace(reg, (a, b) => {
    ids.push(b)
    return a
  })
  console.log(ids)
  callback(ids)
}


const loadPage = function (url) {
  var http = require('http')
  var pm = new Promise(function (resolve, reject) {
    http.get(url, function (res) {
      var html = ''
      res.on('data', function (d) {
        html += d.toString()
      })
      res.on('end', function () {
        resolve(html)
      })
    }).on('error', function (e) {
      reject(e)
    })
  })
  return pm
}

module.exports = {
  loadPage,
  parseHome,
  parsePage
}