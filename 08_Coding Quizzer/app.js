const result = document.getElementById('result-container')
const questionContainer = document.getElementById('question-container')
const form = document.getElementById('quiz-form')

let quizData
let currentQuestionIndex = 0
let correct, wrong, userlength

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

async function loadQuizData(language, difficulty) {
  try {
    const response = await fetch(`./${language}-quiz.json`)
    quizData = await response.json()
    //Filter By Difficulty Level
    quizData = quizData[difficulty]
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
  questionContainer.style.display = 'block'
  const question = quizData[questionIndex]

  const shuffledOptions = [...question.options]
  shuffleArray(shuffledOptions)
  if (!question) {
    endQuiz()
    return
  }
  const questionHTML = `
          <h2>${question.question}</h2>
          <ul>
           <div id="options-container">
  ${shuffledOptions
    .map(
      (option, index) => `
        <div class="option">
          <input type="radio" name="answer" value="${index}" id="option${index}" />
          <label for="option${index}">${option.text}</label>
        </div>
      `
    )
    .join('')}
</div>
          </ul>
          <button type="button" onclick="checkAnswer(${questionIndex})">Submit</button>
        `
  questionContainer.innerHTML = questionHTML
  currentQuestionIndex = questionIndex
}

function checkAnswer(questionIndex) {
  const selectedAnswerText = document.querySelector(
    'input[name="answer"]:checked + label'
  ).textContent

  // Now selectedAnswerText will contain the text of the selected option.

  console.log(selectedAnswerText)

  if (!selectedAnswerText) {
    alert('Please select an answer.')
    return
  }
  const correctAnswerText = quizData[questionIndex].options.find(
    (option) => option.correct
  ).text

  if (selectedAnswerText === correctAnswerText) {
    correct++
    alert('Correct answer!')
  } else {
    wrong++
    alert('Wrong answer. Correct Answer : ' + correctAnswerText)
  }
  displayNextQuestion()
}

function displayNextQuestion() {
  if (currentQuestionIndex < userlength - 1) {
    displayQuestion(currentQuestionIndex + 1)
  } else {
    document.getElementById('question-container').style.display = 'none'
    result.style.display = 'block'
    const innerHTML = `
              <h2>Quiz completed!</h2>
              <h3>Score :  ${correct} / ${correct + wrong} </h3>
              <h3 id="res">Correct : ${correct}</h3>
              <h3 id="res">Wrong : ${wrong}</h3>
              <button type="button" onclick="startAgain()">Start Again</button>
    `
    result.innerHTML = innerHTML
    alert('No more questions.')
  }
}

function startAgain() {
  currentQuestionIndex = 0
  form.reset()
  result.style.display = 'none'
  form.style.display = 'block'
}

function endQuiz() {
  const questionContainer = document.getElementById('question-container')
  questionContainer.innerHTML = '<h2>Quiz completed!</h2>'
}

document.getElementById('quiz-form').addEventListener('submit', function (e) {
  e.preventDefault()
  startQuiz()
})
