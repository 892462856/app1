

const simpleKeyBase = require('./simpleKeyBase')

class multikeyBase extends simpleKeyBase {
  constructor(table, keys) {
    super(table)
    this.keys = keys
    this.whereKeys = keys.map(key => (`${key} = ?`)).join(' and ')
    this.whereKeys2 = keys.map(key => (`${key} = :${key}`)).join(' and ')
  }

  get(ids) {
    return this.promiseQuery(`SELECT * from ${this.table} where ${this.whereKeys}`, ids)
  }

  delete(ids) {
    return this.promiseQuery(`DELETE FROM ${this.table} WHERE ${this.whereKeys}`, ids)
  }

  update(obj) {
    const sqlFragment = Object.keys(obj).map(key => {
      if (this.keys.includes(key)) return ''
      return `${key} = :${key}`
    }).join(',')
    return this.promiseQuery(`UPDATE ${this.table} SET ${sqlFragment} WHERE ${this.whereKeys2}`, obj)
  }

  enable(ids, enabled) {
    const obj = { ...ids, enabled }
    return this.promiseQuery(`UPDATE ${this.table} SET enabled=:enabled WHERE ${this.whereKeys2}`, obj)
  }
}

module.exports = multikeyBase