const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'db4free.net',
    user: 'adminrw',
    password: 'b62cf0f6',
    database: 'smarkiocomments'
  },
  log: {
    warn (message) {
      console.log(message)
    },
    error (message) {
      console.log(message)
    }
  }
})

module.exports = knex
