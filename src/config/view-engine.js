const nunjucks = require('nunjucks')

module.exports = (app, express) => {
  app.set('view engine', 'njk')
  app.use(express.static('public'))

  nunjucks.configure('./src/views', {
    express: app
  })
}
