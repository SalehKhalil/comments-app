function getComments () {
  return window.fetch('/comments', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

function insertComment (comment) {
  return window.fetch('/comments', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment })
  })
}

function listenText (text) {
  return window.fetch('/text-to-speech', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  })
}
