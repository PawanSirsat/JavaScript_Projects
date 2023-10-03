const result = document.getElementById('result-container')
const questionContainer = document.getElementById('question-container')
const form = document.getElementById('quiz-form')
const sliderLabel = document.querySelector('#slidertext')
const progressContainers = document.getElementsByClassName('progress-container')
const resultLink = document.getElementById('studentListLink')
const dropmenu = document.getElementById('dropid')
const quizlink = document.getElementById('quizlink')
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  where,
  query,
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

// Your web app's Firebase configuration
import firebaseConfig from './firebaseConfig.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

//Retrive Function
async function getFireBaseJSON(lang, level) {
  const querySnapshot = await getDocs(
    query(
      collection(db, 'questions'),
      where('questionData.lang', '==', lang),
      where('questionData.level', '==', level)
    )
  )
  return querySnapshot
}
let quizData
let importData = []
let currentQuestionIndex = 0
let correct, wrong, userlength
let timeout = false

// Add an event listener to the checkbox
let timer = true
const quizSlider = document.getElementById('quiz-slider').checked
if (quizSlider) {
  sliderLabel.textContent = 'On'
  console.log(sliderLabel.textContent)
  sliderLabel.classList.add('slider-label-on')
}

document.getElementById('quiz-slider').addEventListener('change', function () {
  if (this.checked) {
    timer = true
    sliderLabel.textContent = 'On'
    sliderLabel.classList.remove('slider-label-off')
    sliderLabel.classList.add('slider-label-on')
    console.log('Timer ' + timer)
  } else {
    timer = false
    console.log('Timer ' + timer)
    sliderLabel.textContent = 'Off'
    sliderLabel.classList.remove('slider-label-on')
    sliderLabel.classList.add('slider-label-off')
  }
  // console.log('Slider ' + quizSlider)
})

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

async function loadQuizData(language, difficulty) {
  try {
    const data = await getFireBaseJSON(language, difficulty)
    console.log('Data Loaded')
    console.log(data)

    data.forEach((doc) => {
      const JSONData = doc.data().questionData
      importData.push(JSONData)
    })

    if (importData.length === 0) {
      dispFeedback(`Questions not found for ${language}`, 'error')

      setTimeout(function () {
        location.reload()
      }, 2000) // 4000 milliseconds = 4 seconds
    }

    //Filter By Difficulty Level
    quizData = importData
    //Define length
    if (userlength > quizData.length) {
      userlength = quizData.length
    }
    console.log('Length ' + userlength)

    shuffleArray(quizData)
    //Display First Que
    displayQuestion(currentQuestionIndex)
  } catch (error) {
    console.error('Error loading quiz data:', error)
  }
}

function startQuiz() {
  const language = document.getElementById('language').value
  const difficulty = document.getElementById('difficulty').value
  userlength = document.getElementById('quiz-type').value

  console.log('Lan : ' + language)

  correct = 0
  wrong = 0

  if (language === 'none' || difficulty === 'none') {
    alert('Please select a language and difficulty level.')
    return
  }
  loadQuizData(language, difficulty)
  document.getElementById('quiz-form').style.display = 'none'
}

function displayQuestion(questionIndex) {
  timeout = false

  questionContainer.style.display = 'block'
  const question = quizData[questionIndex]

  const shuffledOptions = [...question.options]
  console.log('Options ')
  console.log(shuffledOptions)
  console.log('Ans ')
  console.log(quizData[questionIndex].ans)
  shuffleArray(shuffledOptions)
  if (!question) {
    endQuiz()
    return
  }
  const questionHTML = `
  <div class="progress-container">
          <div class="progress-bar" id="progress-bar"></div>
        </div>
          <h5>${question.question}</h5>
          <ul>
  ${shuffledOptions
    .map(
      (option, index) => `
     <div class="option">
  <input type="radio" name="answer" value="${index}" id="option${index}" />
  <label for="option${index}">${option}</label>
</div>

`
    )
    .join('')}
</div>
          </ul>
          <div id="feedback-container" class="feedback"></div>
          <div class="btncontainer">
          <button type="button" id="btn">Submit</button>
          <button type="button" id="btn2">Next Quiz</button>
          <button type="button" id="btn3">Exit</button>
          </div>
           <div id="popup" class="popup">
       <div class="popup-content">
    <span class="close-button" id="closePopup">&times;</span>
    <h2>Quiz Exit Confirmation</h2>
    <p>If you exit, any unsaved progress will be lost.</p>
    <button id="reloadPage">Exit Quiz</button>
</div>

    </div>
        `
  questionContainer.innerHTML = questionHTML
  console.log('Timer ' + timer)
  setTimeout(function () {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  }, 100) // Adjust the delay (in milliseconds) as needed
  document.getElementById('popup').style.display = 'none'

  document.getElementById('btn3').addEventListener('click', function () {
    document.getElementById('popup').style.display = 'flex'
  })
  // Get all option divs
  const optionDivs = document.querySelectorAll('.option')

  // Add a click event listener to each option div
  optionDivs.forEach((optionDiv) => {
    optionDiv.addEventListener('click', () => {
      // Check the corresponding radio button
      const radioButton = optionDiv.querySelector('input[type="radio"]')
      radioButton.checked = true
    })
  })

  document.getElementById('closePopup').addEventListener('click', function () {
    document.getElementById('popup').style.display = 'none'
  })

  document.getElementById('reloadPage').addEventListener('click', function () {
    location.reload()
  })

  if (!timer) {
    for (const container of progressContainers) {
      container.style.display = 'none'
    }
  } else {
    for (const container of progressContainers) {
      container.style.display = 'block'
    }
    console.log('Progress Start')
    startProgressBar()
  }
  currentQuestionIndex = questionIndex
  const submitButton = document.getElementById('btn')
  submitButton.addEventListener('click', function () {
    checkAnswer(currentQuestionIndex)
  })

  const nextButton = document.getElementById('btn2')
  nextButton.addEventListener('click', function () {
    displayNextQuestion(currentQuestionIndex)
  })
}
function disableQuizOptions() {
  const optionContainers = document.querySelectorAll('.option')

  optionContainers.forEach(function (container) {
    const input = container.querySelector('input[type="radio"]')
    input.disabled = true

    // Optionally, you can add a class to visually indicate that the option is disabled
    container.classList.add('disabled-option')
  })
}
function startProgressBar() {
  const progressBar = document.getElementById('progress-bar')
  progressBar.style.width = '0%' // Initially set to 0%

  let submitButtonClicked = false // Flag to check if the "Next" button was clicked
  const animationDuration = 10000 // 10 seconds
  const animationSteps = 400
  const stepWidth = 50 / animationSteps

  let currentWidth = 0
  const animationInterval = animationDuration / animationSteps

  const animation = setInterval(function () {
    currentWidth += stepWidth
    progressBar.style.width = currentWidth + '%'

    if (currentWidth >= 100) {
      clearInterval(animation)
      if (!submitButtonClicked) {
        console.log('Next')
        // If the "Next" button was not clicked, move to the next question
        timeout = true
        displayFeedback('Time Out', 'error')
        checkAnswer(currentQuestionIndex)
      }
    }
  }, animationInterval)

  const submitButton = document.getElementById('btn')
  submitButton.addEventListener('click', function () {
    submitButtonClicked = true
    clearInterval(animation) // Stop the animation if the "Next" button is clicked
  })
}

// Function to reset the progress bar
// function resetProgressBar() {
//   progressBar.style.width = '0'
// }

// Example: Start the progress bar for each quiz question

// You can call startProgressBar() for each question in your quiz.

function displayFeedback(message, className) {
  const feedbackContainer = document.getElementById('feedback-container')
  feedbackContainer.textContent = message
  feedbackContainer.classList.add('feedback', className)
  feedbackContainer.style.display = 'block'
}
function dispFeedback(message, className) {
  const feedbackContainer = document.getElementById('feedback-cont')
  feedbackContainer.textContent = message
  feedbackContainer.classList.add('feedback', className)
  feedbackContainer.style.display = 'block'
}
function checkAnswer(questionIndex) {
  console.log('Check')
  const progressBar = document.getElementById('progress-bar')
  progressBar.style.width = '100%'

  let selectedAnswerText
  progressBar.style.width = '0%' // Initially set to 0%

  const selectedRadioButton = document.querySelector(
    'input[name="answer"]:checked'
  )
  if (selectedRadioButton) {
    selectedAnswerText = selectedRadioButton.nextElementSibling.textContent
    // Now you can use the selectedAnswerText
    console.log(selectedAnswerText)
  } else {
    // Handle the case where no option is selected
    console.log('Please select an option.')
  }

  if (!selectedAnswerText && timeout == false) {
    console.log(selectedAnswerText)
    alert('Please select an answer')
    return
  } else {
    console.log('Option selected')
  }

  const selectedAnswerElement = document.querySelector(
    'input[name="answer"]:checked + label'
  )

  // Now selectedAnswerText will contain the text of the selected option.

  console.log(!selectedAnswerText && selectedAnswerText)

  const correctAnswerText = quizData[questionIndex].ans
  const correctAnswerOption = quizData[questionIndex].options.find(
    (option) => option.correct
  )
  document.getElementById('btn2').style.display = 'block'
  document.getElementById('btn').style.display = 'none'
  if (timeout == true) {
    disableQuizOptions()
    wrong++
    console.log('Time Out, selected, not submitted ')
    const allLabels = document.querySelectorAll('label')
    for (const label of allLabels) {
      if (label.textContent === correctAnswerText) {
        label.classList.add('correct')
        break // Stop searching after finding the correct label
      }
    }
  } else if (!selectedAnswerText) {
    alert('Please select an answer.')
    return
  } else {
    if (selectedAnswerText === correctAnswerText && timeout == false) {
      disableQuizOptions()
      console.log('In Time, selected, submitted ')
      correct++
      selectedAnswerElement.classList.add('correct')
      // displayFeedback('Correct answer!', 'green')
    } else {
      disableQuizOptions()
      wrong++
      selectedAnswerElement.classList.add('incorrect')
      const allLabels = document.querySelectorAll('label')
      for (const label of allLabels) {
        if (label.textContent === correctAnswerText) {
          label.classList.add('correct')
          break // Stop searching after finding the correct label
        }
      }
    }
  }
}
function displayNextQuestion() {
  document.getElementById('btn').style.display = 'block'
  document.getElementById('btn2').style.display = 'none'

  if (currentQuestionIndex < userlength - 1) {
    displayQuestion(currentQuestionIndex + 1)
  } else {
    document.getElementById('question-container').style.display = 'none'
    result.style.display = 'block'
    win()
    const innerHTML = `
              <h2>Quiz completed!</h2>
              <h3>Score :  ${correct} / ${correct + wrong} </h3>
              <h3 id="res">Correct : ${correct}</h3>
              <h3 id="res">Wrong : ${wrong}</h3>
              <button type="button" class="btncss" id="startagain">Start Again</button>
    `
    result.innerHTML = innerHTML
    const uname = document.getElementById('name').value

    window.addToFireBase(uname, correct, correct, wrong)

    const startagain = document.getElementById('startagain')
    startagain.addEventListener('click', function () {
      startAgain()
    })
    // alert('No more questions.')
  }
}
function startAgain() {
  console.log('Data in startAgain : ')

  console.log(importData)
  console.log(quizData)

  importData = []
  quizData = importData
  console.log('Remove')
  console.log(importData)
  console.log(quizData)

  currentQuestionIndex = 0
  form.reset()
  result.style.display = 'none'
  form.style.display = 'block'
  resultLink.classList.remove('disable-link')
  quizlink.classList.remove('disable-link')
  dropmenu.classList.remove('disable-link')

  // Enable the checkbox
  document.getElementById('quiz-slider').removeAttribute('disabled')
  document.getElementById('feedback-cont').style.display = 'none'
}

function endQuiz() {
  const questionContainer = document.getElementById('question-container')
  questionContainer.innerHTML = '<h2>Quiz completed!</h2>'
}

document.getElementById('quiz-form').addEventListener('submit', function (e) {
  e.preventDefault()
  // document.getElementById('popup').style.display = 'none'

  document.getElementById('quiz-slider').setAttribute('disabled', 'disabled')
  resultLink.classList.add('disable-link')
  quizlink.classList.add('disable-link')
  dropmenu.classList.add('disable-link')
  startQuiz()
  setTimeout(function () {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  }, 100) // Adjust the delay (in milliseconds) as needed
})
