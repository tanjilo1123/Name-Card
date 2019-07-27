const form = document.forms[0]
const textInputName = document.querySelector('#textInputName')
const textAreaIntro = document.querySelector('#textAreaIntro')
const textInputPhoto = document.querySelector('#textInputPhoto')
const outputArea = document.querySelector('#outputArea')


/*=============================================
                check photo
=============================================*/
function checkPhoto(inputPhoto) {
  const img = document.querySelector('#photo')
  if (inputPhoto.length > 0) {
    img.src = inputPhoto
  }
}

/*=============================================
                change theme
=============================================*/

function changeTheme() {
  let outputStyle = document.querySelector('#outputArea')
  const radioCheck = document.querySelectorAll('.radio')
  // console.log(radioCheck[0].checked)
  for (let i = 0; i < radioCheck.length; i++) {
    if (radioCheck[i].checked && radioCheck[i].value === 'lightTheme') {
      outputStyle.classList.remove('darkStyle')
      outputStyle.classList.add('lightStyle')
      break
    } else {
      outputStyle.classList.remove('lightStyle')
      outputStyle.classList.add('darkStyle')
      break
    }
  }
}

/*=============================================
                check submit wrong
=============================================*/

function checkSubmit() {
  let feedbackDivArea = textAreaIntro.nextElementSibling
  let feedbackDivName = textInputName.nextElementSibling

  if (textInputName.value.length < 1) {
    feedbackDivName.innerHTML = 'Can not blank'
    textInputName.classList.add('warning')
  } else {
    feedbackDivName.innerHTML = ''
  }

  if (textAreaIntro.value.length < 1) {
    feedbackDivArea.innerHTML = 'Can not blank'
    textAreaIntro.classList.add('warning')
  } else if (textAreaIntro.value.length > 200) {
    feedbackDivArea.innerHTML = 'Can not more than 200 word'
    textAreaIntro.classList.add('warning')
  } else {
    feedbackDivArea.innerHTML = ''
  }
}

/*=============================================
                form submit event
=============================================*/

form.addEventListener('submit', function (event) {
  event.preventDefault()
  let name = textInputName.value
  let textArea = textAreaIntro.value
  let inputPhoto = textInputPhoto.value

  if (name.length > 0 && textArea.length > 0 && textArea.length < 201) {
    console.log('pass')

    let addOutputHtml = ''
    addOutputHtml += `
      <div class="outputWapper">
        <div class="leftCol">
          <div class="nameCol">
            <h3 id="outputName">${name}</h3>
          </div>
          <div id="introCol"><p>${textArea}</p></div>
        </div>
        <div id="rightCol">
          <img src="https://vignette.wikia.nocookie.net/evchk/images/e/ec/2471912.jpg/revision/latest?cb=20171012125530" id='photo'>
        </div>
      </div>
    `

    outputArea.innerHTML = addOutputHtml
    checkPhoto(inputPhoto)
    changeTheme()
  } else {
    checkSubmit()
    console.log('no pass')
  }
})

/*=============================================
                form input check
=============================================*/
form.addEventListener('input', checkWrong)

function checkWrong(event) {
  let input = event.target
  let feedbackDiv = event.target.nextElementSibling
  console.log(input.id)
  if (input.id === 'textInputName') {
    if (input.value.length < 0) {
      feedbackDiv.innerHTML = 'Can not blank'
      input.classList.add('warning')
    } else {
      input.classList.remove('warning')
      feedbackDiv.innerHTML = ''
    }
  } else if (input.id === 'textAreaIntro') {
    if (input.value.length < 0) {
      feedbackDiv.innerHTML = 'Can not blank'
      input.classList.add('warning')
    } else {
      input.classList.remove('warning')
      feedbackDiv.innerHTML = ''
    }
  }
}

/*=============================================
            text Area input event
=============================================*/

textAreaIntro.addEventListener('input', function (event) {
  let textAreaLength = event.target.value.length
  let remainSpan = event.target.nextElementSibling.nextElementSibling

  if (textAreaLength > 200) {
    remainSpan.innerHTML = '0 / 200'
    remainSpan.classList.add('feedback')
  } else {
    remainSpan.innerHTML = `${200 - textAreaLength} / 200`
    remainSpan.classList.remove('feedback')
  }
})