const simpleKeyBase = require('./simpleKeyBase')

class menu extends simpleKeyBase {
  constructor(connection) {
    super('menu')
    this.conn = connection
  }
}

module.exports = menu