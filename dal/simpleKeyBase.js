

class base {
  constructor(table) {
    this.table = table
  }

  promiseQuery(sql, params) {
    const conn = this.conn
    return new Promise(function (resolve, reject) {
      var query = conn.query(sql, params, function (error, results, fields) {
        if (error){
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

  // paging({pageSize,pageIndex},callback) {
  //   this.conn.query('SELECT * from articles', function (err, results, fields) {
  //     if (err) throw err
  //     callback(results)
  //   })
  // }
}

module.exports = base