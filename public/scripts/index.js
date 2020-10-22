const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true })
const registerCommentButton = document.getElementById('register-button')
const listOfComments = document.getElementById('list-comments')
let audioIsPlaying = false

function handleRequestError (err, errorType) {
  return Toast.fire({ icon: 'error', title: `Erro ao ${errorType}. Erro: ${err.message}` })
}

function commentIsValid (comment) {
  return !!comment.length
}

function setLoader (fatherElement) {
  const originalChild = fatherElement.innerHTML
  const divElement = document.createElement('div')
  divElement.className = 'loader'
  fatherElement.appendChild(divElement)

  return isLoading => {
    if (isLoading) {
      const divElement = document.createElement('div')
      divElement.className = 'loader'
      fatherElement.innerHTML = ''
      fatherElement.appendChild(divElement)
    } else {
      fatherElement.innerHTML = originalChild
    }
  }
}

function setListOfCommentOnScreen (comments) {
  if (!comments) return Toast.fire({ icon: 'error', title: 'Erro ao carregar comentários, por favor, recarregue a página.' })

  if (!comments.length) {
    listOfComments.innerHTML = 'Nenhum comentário foi cadastrado ainda'
    return
  }

  if (comments.length > 2) {
    listOfComments.classList.add('scroll')
  }

  const commentsDesc = comments.reverse()
  listOfComments.innerHTML = ''

  commentsDesc.forEach(({ text }, i) => {
    const liElement = document.createElement('li')
    const pElement = document.createElement('p')
    const buttonElement = document.createElement('button')

    pElement.innerHTML = text
    buttonElement.innerHTML = 'Ouvir'
    buttonElement.id = 'listen-' + i
    buttonElement.onclick = event => playAudio(event, text)

    liElement.appendChild(pElement)
    liElement.appendChild(buttonElement)
    listOfComments.appendChild(liElement)
  })
}

function playAudio (event, text) {
  if (!audioIsPlaying) {
    audioIsPlaying = true
    const loader = setLoader(event.target)

    loader(true)

    listenText(text)
      .then(data => data.json())
      .then(base64 => {
        const audio = new window.Audio('data:audio/wav;base64,' + base64)
        loader(false)
        audio.play()
        audioIsPlaying = false
      })
      .catch(err => {
        loader(false)

        handleRequestError(err, 'carregar áudio')
      })
  }
}

function registerComment () {
  const comment = document.getElementById('comment').value

  if (!commentIsValid(comment)) return Toast.fire({ icon: 'error', title: 'A área de texto de "Comentário" é obrigatória' })

  const loader = setLoader(registerCommentButton)

  loader(true)

  insertComment(comment)
    .then(() => {
      document.getElementById('comment').value = ''
      loader(false)
      Toast.fire({ icon: 'success', title: 'Comentário cadastrado com sucesso' })
      getComments()
        .then(data => data.json())
        .then(setListOfCommentOnScreen)
        .catch(err => {
          loader(false)

          handleRequestError(err, 'carregar comentários')
        })
    })
    .catch(err => {
      loader(false)

      handleRequestError(err, 'cadastrar comentário')
    })
}

function onLoad () {
  const loader = setLoader(listOfComments)

  loader(true)

  getComments()
    .then(data => data.json())
    .then(comments => {
      loader(false)

      return setListOfCommentOnScreen(comments)
    })
    .catch(err => {
      loader(false)

      handleRequestError(err, 'carregar comentários')
    })
}
