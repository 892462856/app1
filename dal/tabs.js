const simpleKeyBase = require('./simpleKeyBase')

class tabs extends simpleKeyBase {
  constructor(connection) {
    super('tabs')
    this.conn = connection
  }
}

module.exports = tabs