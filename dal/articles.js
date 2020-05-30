const simpleKeyBase = require('./simpleKeyBase')

class articles extends simpleKeyBase {
  constructor(connection) {
    super('articles')
    this.conn = connection
  }

  getInvalidList(){
    return this.promiseQuery(`SELECT * from ${this.table} where title = ?`,'')
  }

  // insert({ id, title, content, order, datetime = new Date(), link, fetchCode, enabled = 1 }, callback = null) {
  //   var query = this.conn.query('INSERT INTO articles SET ?', { id, title, content, order, datetime, link, fetchCode, enabled }, function (error, results, fields) {
  //     if (error) throw error
  //     if (callback) callback(results)
  //   })
  // }

  // update({id, title, content, order, datetime = new Date(), link, fetchCode, enabled = 1}, callback = null) {
  //   this.conn.query("UPDATE articles SET name = :name,title = :title,content = :content,order = :order,datetime = :datetime,link = :link,fetchCode = :fetchCode, enabled = :enabled WHERE id =  :name", { id, title, content, order, datetime , link, fetchCode, enabled  }, function (error, results, fields) {
  //     if (error) throw error
  //     if (callback) callback(results)
  //   })
  // }
}

module.exports = articles