

class base {
  constructor(table) {
    this.table = table
  }

  getList(callback) {
    this.conn.query(`SELECT * from ${this.table}`, function (err, results, fields) {
      if (err) throw err
      callback(results)
    })
  }

  get(id, callback) {
    this.conn.query(`SELECT * from ${this.table} where id=?`, id, function (err, results, fields) {
      if (err) throw err
      callback(results)
    })
  }

  delete(id, callback = null) {
    this.conn.query(`DELETE FROM ${this.table} WHERE id =  :id`, { id }, function (error, results, fields) {
      if (error) throw error
      if (callback) callback(results)
    })
  }

  insert(obj, callback = null) {
    var query = this.conn.query(`INSERT INTO ${this.table} SET ?`, obj, function (error, results, fields) {
      if (error) throw error
      if (callback) callback(results)
    })
  }

  update(obj, callback = null) {
    const sqlFragment = Object.keys(obj).map(key => {
      if (key === 'id') return ''
      return `${key} = :${key}`
    }).join(',')
    this.conn.query(`UPDATE ${this.table} SET ${sqlFragment} WHERE id =  :id`, obj, function (error, results, fields) {
      if (error) throw error
      if (callback) callback(results)
    })
  }

  enable(id, enabled, callback = null) {
    this.conn.query(`UPDATE ${this.table} SET enabled=:enabled WHERE id =  :id`, { id, enabled }, function (error, results, fields) {
      if (error) throw error
      if (callback) callback(results)
    })
  }

  // paging({pageSize,pageIndex},callback) {
  //   this.conn.query('SELECT * from articles', function (err, results, fields) {
  //     if (err) throw err
  //     callback(results)
  //   })
  // }
}

module.exports = base