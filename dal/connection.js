var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'app1'
})
connection.connect()

class Tabs {
  getList(callback) {
    connection.query('SELECT * from tabs', function (err, results, fields) {
      if (err) throw err
      callback(results)
    })
  }

  get(id, callback) {
    connection.query('SELECT * from tabs where id=?', id, function (err, results, fields) {
      if (err) throw err
      callback(results)
    })
  }

  insert({ id, name, enabled = 1 }, callback = null) {
    var query = connection.query('INSERT INTO tabs SET ?', { id, name, enabled }, function (error, results, fields) {
      if (error) throw error
      if (callback) callback(results)
    })
  }

  update({ id, name, enabled = 1 }, callback = null) {
    connection.query("UPDATE tabs SET name = :name, enabled = :enabled WHERE id =  :name", { id, name, enabled }, function (error, results, fields) {
      if (error) throw error
      if (callback) callback(results)
    })
  }
}


// connection.end()

module.exports = Tabs