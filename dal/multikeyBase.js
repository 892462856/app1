

const simpleKeyBase = require('./simpleKeyBase')

class multikeyBase extends simpleKeyBase {
  constructor(table, keys) {
    super(table)
    this.keys = keys
    this.whereKeys = keys.map(key => (`${key} = ?`)).join(' and ')
    this.whereKeys2 = keys.map(key => (`${key} = :${key}`)).join(' and ')
  }

  get(ids, callback) {
    this.conn.query(`SELECT * from ${this.table} where ${this.whereKeys}`, ids, function (err, results, fields) {
      if (err) throw err
      callback(results)
    })
  }

  delete(ids, callback = null) {
    this.conn.query(`DELETE FROM ${this.table} WHERE ${this.whereKeys}`, ids, function (error, results, fields) {
      if (error) throw error
      if (callback) callback(results)
    })
  }

  update(obj, callback = null) {
    const sqlFragment = Object.keys(obj).map(key => {
      if (this.keys.includes(key)) return ''
      return `${key} = :${key}`
    }).join(',')
    this.conn.query(`UPDATE ${this.table} SET ${sqlFragment} WHERE ${this.whereKeys2}`, obj, function (error, results, fields) {
      if (error) throw error
      if (callback) callback(results)
    })
  }

  enable(ids, enabled, callback = null) {
    const obj={...ids,enabled}
    this.conn.query(`UPDATE ${this.table} SET enabled=:enabled WHERE ${this.whereKeys2}`, obj, function (error, results, fields) {
      if (error) throw error
      if (callback) callback(results)
    })
  }
}

module.exports = multikeyBase