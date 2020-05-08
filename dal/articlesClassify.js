const multikeyBase = require('./multikeyBase')

class articlesClassify extends multikeyBase {
  constructor(connection) {
    super('articlesClassify',['articles_id','classifys_id'])
    this.conn = connection
  }
}

module.exports = articlesClassify