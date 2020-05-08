const simpleKeyBase = require('./simpleKeyBase')

class classifys extends simpleKeyBase {
  constructor(connection) {
    super('classifys')
    this.conn = connection
  }
}

module.exports = classifys