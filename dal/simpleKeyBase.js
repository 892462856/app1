

class base {
  constructor(table) {
    this.table = table
  }

  promiseQuery(sql, params) {
    const conn = this.conn
    return new Promise(function (resolve, reject) {
      var query = conn.query(sql, params, function (error, results, fields) {
        if (error) {
          debugger
          console.log(error.message)
          reject(error)
        }
        resolve(results)
      })
    })
  }

  paging(pageIndex, pageSize, callback) {

  }

  getList(callback) {
    return this.promiseQuery(`SELECT * from ${this.table}`)
  }

  get(id) {
    return this.promiseQuery(`SELECT * from ${this.table} where id = ?`, id)
  }

  delete(id) {
    return this.promiseQuery(`DELETE FROM ${this.table} WHERE id =  ?`, id)
  }

  insert(obj) {
    return this.promiseQuery(`INSERT INTO ${this.table} SET ?`, obj)
  }

  update(obj) {
    const sqlFragment = Object.keys(obj).map(key => {
      if (key === 'id') return ''
      return `${key} = :${key}`
    }).join(',')
    return this.promiseQuery(`UPDATE ${this.table} SET ${sqlFragment} WHERE id =  :id`, obj)
  } // sql可能有问题？？？

  enable(id, enabled) {
    return this.promiseQuery(`UPDATE ${this.table} SET enabled=:enabled WHERE id =  :id`, { id, enabled })
  }

  paging({ pageSize = 15, pageIndex = 1 }, conditions=[]) {
    const whereStr = ['1=1']
    const values = Object.entries(conditions).map(([key, value]) => {
      whereStr.push(`${key}=?`)
      return value
    })
    const p2 = this.promiseQuery(`SELECT count(1) from ${this.table} where ${whereStr.join(' and ')}`)
    const p1 = this.promiseQuery(`SELECT * from ${this.table} where ${whereStr.join(' and ')} limit ${(pageIndex - 1) * pageSize},${pageSize}`, values)
    return Promise.all([p1, p2]).then(([list,[{'count(1)':total}]]) => {
      return {
        pageIndex,
        pageSize,
        total,
        list
      }
    })
  }
}

module.exports = base