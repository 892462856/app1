const http = require("http")
const { debug } = require('console')

const regexs =
{
  // list: '<article class="excerpt .+?"><a target="_blank" class="focus" href="http://www.yusuan123.com/(.+?).html">',
  listItem: '<article class="excerpt excerpt-\d+?">(.+?)<\/article>',
  listItem2: /<article class="excerpt excerpt-\d+?">((.|\r|\n)+?)<\/article>/igm,  //'<article class="excerpt excerpt-\d+?">((.|\r|\n)+?)<\/article>',
  id: /<a target="_blank" class="focus" href="http:\/\/www.yusuan123.com\/(.+?).html">/im ,//'<a target="_blank" class="focus" href="http://www.yusuan123.com/(.+?).html">',
  smallImg: /<img data-src="(.+?)"/im ,//'<img data-src="(.+?)"',
  intro: /<p class="note">(.+?)<\/p>/im ,//'<p class="note">(.+?)</p>',
  title: '<h1 class="article-title"><a href=".+?">(.+?)</a></h1>',
  content: '<article class="article-content">((.|\r|\n)+?)</article>',
  link: '链接：<a target="_blank" rel="nofollow" href=".+?"  target="_blank"  rel="nofollow" >(.+?)</a>',
  fetchCode: '提取码：(.+?)</p>',
  trash2: '<iframe .+?</iframe>',
  trash3: '<script (.|\r|\n)+?</script>',
  trash4: '<a target="_blank" rel="nofollow" (.|\r|\r)+?</a>',
  trash5: '<div class="asb asb-post asb-post-01"></div>',

  classify: '<a href=".+?" rel="category tag">(.+?)</a>',
  tab: '<a href="http://www.yusuan123.com/tag/.+?" rel="tag">(.+?)</a>'
}

const downloadImg = function (targetSrc, id) {
  const request = require("request")
  const fs = require('fs')
  const writeStream = fs.createWriteStream(`/static/images/excerpts/${id}-220x150.jpg`)
  const readStream = request(targetSrc)
  readStream.pipe(writeStream)
  readStream.on('end', function () {
    console.log('文件下载成功')
  })
  readStream.on('error', function () {
    console.log("错误信息:" + err)
  })
  writeStream.on("finish", function () {
    console.log("文件写入成功")
    writeStream.end()
  })
}

const parsePage = function (html, callback) {
  const obj = { classifys: [], tabs: [] }
  let reg = new RegExp(regexs.title, 'im')
  html.replace(reg, (a, b) => {
    // debugger
    obj.title = b
    return a
  })
  reg = new RegExp(regexs.content, 'im')
  html.replace(reg, (a, content) => {
    // debugger
    reg = new RegExp(regexs.trash2, 'igm')
    content = content.replace(reg, (a, b) => (''))
    reg = new RegExp(regexs.trash3, 'igm')
    content = content.replace(reg, (a, b) => (''))
    reg = new RegExp(regexs.trash4, 'igm')
    content = content.replace(reg, (a, b) => (''))
    reg = new RegExp(regexs.trash5, 'igm')
    content = content.replace(reg, (a, b) => (''))

    obj.content = content
    return a
  })
  reg = new RegExp(regexs.link, 'im')
  html.replace(reg, (a, b) => {
    // debugger
    obj.link = b
    return a
  })
  reg = new RegExp(regexs.fetchCode, 'im')
  html.replace(reg, (a, b) => {
    // debugger
    obj.fetchCode = b
    return a
  })
  reg = new RegExp(regexs.classify, 'igm')
  html.replace(reg, (a, b) => {
    // debugger
    obj.classifys.push(b)
  })
  reg = new RegExp(regexs.tab, 'igm')
  html.replace(reg, (a, b) => {
    // debugger
    obj.tabs.push(b)
  })
  callback(obj)
}

const parseHome = function (html, callback) {
  debugger
  console.log(html)
  // const items = [] // {id,smallImg,intro}
  // const reg = new RegExp(regexs.listItem2, 'igm')
  const items = html.match(regexs.listItem2).map(t=>({html:t}))
  // html.replace(reg, (a, b) => {
  //   items.push({ html: b })
  //   return a
  // })
  
  items.forEach(item => {
    reg = new RegExp(regexs.id, 'im')
    const matchResult = item.html.match(reg)
    if (matchResult) {
      item.id = matchResult[1]
    }

    reg = new RegExp(regexs.smallImg, 'im')
    matchResult = item.html.match(reg)
    if (matchResult) {
      item.smallImg = matchResult[1]
    }

    reg = new RegExp(regexs.intro, 'im')
    matchResult = item.html.match(reg)
    if (matchResult) {
      item.intro = matchResult[1]
    }

    downloadImg(item.smallImg, item.id)
  })
  console.log(items.map(t => t.id))
  callback(items)
}

const loadPage2 = function () {
  debugger
  const request = require("request");

  const options = {
    method: 'GET',
    url: 'http://www.yusuan123.com/page/2',
    qs: { section: '33' },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36'
    }
  }

  request(options, function (error, response, body) {
    debugger
    if (error) console.log(error)
    // console.log(body)
  })
}

const loadPage = function (pageIndex) {
  debugger
  var http = require('http')
  var option = {
    hostname: 'www.yusuan123.com',
    path: `/page/${pageIndex}`,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', // '*/*',
      'Accept-Encoding': 'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Connection': 'keep-alive',
      'Cookie': 'themepark_advertisement=; UM_distinctid=171e943cf9c14b-06b227a99fb513-4e400228-13c680-171e943cf9d3a0; themepark_advertisement=; bdshare_firstime=1588845837178; CNZZDATA1277371342=1049681142-1588752057-%7C1590805574; amvid=120edc07da545991122f58ebbc139b34; Hm_lvt_29658eecd79b8ac9f364fcc2809c15bf=1588756468,1590806093; Hm_lpvt_29658eecd79b8ac9f364fcc2809c15bf=1590807740',
      'Host': 'www.yusuan123.com',
      'Referer': '/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    }
  };
  const pm = new Promise(function (resolve, reject) {
    // debugger
    http.get(option, function (res) {
      // const html = ''
      const chunks = []
      res.on('data', function (chunk) {
        chunks.push(chunk);
      })
      res.on('end', function () {
        const html = Buffer.concat(chunks).toString()
        resolve(html)
      })
      // res.on('data', function (d) {
      //   html += d.toString()
      // })
      // res.on('end', function () {
      //   resolve(html)
      // })
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