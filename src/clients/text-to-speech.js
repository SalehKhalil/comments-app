const got = require('got')
const apiKey = 'YXBpa2V5OjBnLU5BaTk3RWdmb21OQ1pXeTJxSGtYNlhNRm02RGRPbTZDUFR2NVZraWtV'
const voice = 'pt-BR_IsabelaVoice'

function textToSpeech (text) {
  return got.post(`https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/7bd8bdae-ad0c-4607-a31e-641016bf0404/v1/synthesize?voice=${voice}`, {
    headers: {
      Accept: 'audio/wav',
      Authorization: `Basic ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  })
}

module.exports = {
  textToSpeech
}
