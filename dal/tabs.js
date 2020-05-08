const simpleKeyBase = require('./simpleKeyBase')

class tabs extends simpleKeyBase {
  constructor(connection) {
    super('tabs')
    this.conn = connection
  }

  // insert({ id, name, enabled = 1 }, callback = null) {
  //   var query = this.conn.query('INSERT INTO tabs SET ?', { id, name, enabled }, function (error, results, fields) {
  //     if (error) throw error
  //     if (callback) callback(results)
  //   })
  // }

  // update({ id, name, enabled = 1 }, callback = null) {
  //   this.conn.query("UPDATE tabs SET name = :name, enabled = :enabled WHERE id =  :name", { id, name, enabled }, function (error, results, fields) {
  //     if (error) throw error
  //     if (callback) callback(results)
  //   })
  // }
}

module.exports = tabs