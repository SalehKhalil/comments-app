const database = require('./database')
const { textToSpeech } = require('../clients/text-to-speech')

module.exports = express => {
  const routes = express.Router()

  routes.get('/', async (_req, res) => {
    return res.render('index')
  })

  // comments
  routes.get('/comments', async (_req, res) => {
    try {
      const comments = await database('comments').select()

      res.json(comments)
    } catch (err) {
      res.json(err).status(err.status)
    }
  })

  routes.post('/comments', async (req, res) => {
    try {
      const { comment } = req.body

      await database('comments').insert({ text: comment })

      res.json().status(201)
    } catch (err) {
      res.json(err).status(err.status)
    }
  })

  // ibm watson
  routes.post('/text-to-speech', async (req, res) => {
    try {
      const { text } = req.body
      const data = await textToSpeech(text)

      res.json(data.rawBody.toString('base64'))
    } catch (err) {
      res.json(err).status(err.status)
    }
  })

  return routes
}
