const multikeyBase = require('./multikeyBase')

class articlesTabs extends multikeyBase {
  constructor(connection) {
    super('articlesTabs',['articles_id','tabs_id'])
    this.conn = connection
  }
}

module.exports = articlesTabs