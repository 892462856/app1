const http = require("http")
const { debug } = require('console')

const regexs =
{
  listItem: /<article class="excerpt excerpt-\d+?">((.|\r|\n)+?)<\/article>/igm,  //'<article class="excerpt excerpt-\d+?">((.|\r|\n)+?)<\/article>',
  id: /<a target="_blank" class="focus" href="http:\/\/www.yusuan123.com\/(.+?).html">/im,//'<a target="_blank" class="focus" href="http://www.yusuan123.com/(.+?).html">',
  smallImg: /<img data-src="(.+?)"/im,//'<img data-src="(.+?)"',
  intro: /<p class="note">(.+?)<\/p>/im,//'<p class="note">(.+?)</p>',
  title: /<h1 class="article-title"><a href=".+?">(.+?)<\/a><\/h1>/im, // '<h1 class="article-title"><a href=".+?">(.+?)</a></h1>',
  content: /<article class="article-content">((.|\r|\n)+?)<\/article>/im, // '<article class="article-content">((.|\r|\n)+?)</article>',
  link: /链接：<a target="_blank" rel="nofollow" href=".+?"  target="_blank"  rel="nofollow" >(.+?)<\/a>/im, // '链接：<a target="_blank" rel="nofollow" href=".+?"  target="_blank"  rel="nofollow" >(.+?)</a>',
  fetchCode: /提取码：(.+?)<\/p>/im, // '提取码：(.+?)</p>',
  trash2: /<iframe .+?<\/iframe>/img, // '<iframe .+?</iframe>',
  trash3: /<script (.|\r|\n)+?<\/script>/img, //'<script (.|\r|\n)+?</script>',
  trash4: /<a target="_blank" rel="nofollow" (.|\r|\r)+?<\/a>/img, //'<a target="_blank" rel="nofollow" (.|\r|\r)+?</a>',
  trash5: /<div .+?><\/div>/img, //'<div class="asb asb-post asb-post-01"></div>',
  trash6: /<img class="alignnone size-full .+?>/img,
  trash7: /<p .+?链接：(.|\r|\n)+?提取码：.+?<\/p>/img,

  classify: /<a href=".+?" rel="category tag">(.+?)<\/a>/img, // '<a href=".+?" rel="category tag">(.+?)</a>',
  tab: /<a href="http:\/\/www.yusuan123.com\/tag\/.+?" rel="tag">(.+?)<\/a>/img, // '<a href="http://www.yusuan123.com/tag/.+?" rel="tag">(.+?)</a>'
  menuHtml: /<div class="breadcrumbs">(.|\r|\n)+<div class="container">当前位置：(.|\r|\n)+?<\/div>/im,
  menu: /<a href=".+?">(.+?)<\/a>/img
}

const downloadImg = function (targetSrc, id) {
  const request = require("request")
  const fs = require('fs')
  const writeStream = fs.createWriteStream(`${process.cwd()}/static/images/excerpts/${id}-220x150.jpg`)
  const readStream = request(targetSrc)
  readStream.pipe(writeStream)
  readStream.on('end', function () {
    // console.log('文件下载成功')
  })
  readStream.on('error', function () {
    console.log("错误信息:" + err)
  })
  writeStream.on("finish", function () {
    // console.log("文件写入成功")
    writeStream.end()
  })
}

const parsePage = function (html, callback) {
  debugger
  const obj = {}

  obj.title = (html.match(regexs.title) || [,])[1] || ''
  obj.content = ((html.match(regexs.content) || [,])[1] || '')
    .replace(regexs.trash2, '')
    .replace(regexs.trash3, '')
    .replace(regexs.trash4, '')
    .replace(regexs.trash5, '')
    .replace(regexs.trash6, '')
    .replace(regexs.trash7, '')
  obj.link = (html.match(regexs.link) || [,])[1] || ''
  obj.fetchCode = (html.match(regexs.fetchCode) || [,])[1] || ''
  obj.classifys = [...(html.matchAll(regexs.classify) || [])].map(t => t[1])
  obj.tabs = [...(html.matchAll(regexs.tab) || [])].map(t => t[1])

  const menuHtml = (html.match(regexs.menuHtml) || [null])[0] || ''
  const menus = [...(menuHtml.matchAll(regexs.menu) || [])].map(t => t[1])
  obj.menu_id = menus.length ? menus[menus.length - 1] : ''
  callback(obj)
}

const parseHome = function (html, callback) {
  // debugger
  // console.log(process.execPath)
  // console.log(__dirname)
  // console.log(process.cwd())
  const items = html.match(regexs.listItem).map(t => ({ html: t }))

  items.forEach(item => {
    let matchResult = item.html.match(regexs.id)
    if (matchResult) {
      item.id = matchResult[1]
    }
    matchResult = item.html.match(regexs.smallImg)
    if (matchResult) {
      item.smallImg = matchResult[1]
    }
    matchResult = item.html.match(regexs.intro)
    if (matchResult) {
      item.intro = matchResult[1]
    }

    downloadImg(item.smallImg, item.id)
  })
  console.log(items.map(t => t.id))
  callback(items)
}

const loadPage = function (n, isDetail = false) {
  const http = require('http')
  const path = isDetail ? `/${n}.html` : `/page/${n}`
  const option = {
    hostname: 'www.yusuan123.com',
    path,
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


// const loadPage2 = function () {
//   const request = require("request");

//   const options = {
//     method: 'GET',
//     url: 'http://www.yusuan123.com/page/2',
//     qs: { section: '33' },
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36'
//     }
//   }

//   request(options, function (error, response, body) {
//     debugger
//     if (error) console.log(error)
//     // console.log(body)
//   })
// }

