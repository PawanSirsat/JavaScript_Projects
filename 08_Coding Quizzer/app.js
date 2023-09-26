let quizData
let currentQuestionIndex = 0

async function loadQuizData(language, difficulty) {
  try {
    const response = await fetch(`./${language}-quiz.json`)
    quizData = await response.json()
    quizData = quizData[difficulty]
    displayQuestion(currentQuestionIndex)
  } catch (error) {
    console.error('Error loading quiz data:', error)
  }
}

function displayQuestion(questionIndex) {
  const questionContainer = document.getElementById('question-container')
  const question = quizData[questionIndex]

  if (!question) {
    endQuiz()
    return
  }

  const questionHTML = `
          <h2>${question.question}</h2>
          <ul>
           <div id="options-container">
  ${question.options
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

function displayNextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    displayQuestion(currentQuestionIndex + 1)
  } else {
    alert('No more questions.')
  }
}

function startQuiz() {
  const language = document.getElementById('language').value
  const difficulty = document.getElementById('difficulty').value

  if (language === 'none' || difficulty === 'none') {
    alert('Please select a language and difficulty level.')
    return
  }

  loadQuizData(language, difficulty)

  document.getElementById('quiz-form').style.display = 'none'
  document.getElementById('next-button').style.display = 'block'
}

function checkAnswer(questionIndex) {
  const selectedAnswerIndex = document.querySelector(
    'input[name="answer"]:checked'
  )

  if (!selectedAnswerIndex) {
    alert('Please select an answer.')
    return
  }

  const correctAnswerIndex = quizData[questionIndex].options.findIndex(
    (option) => option.correct
  )

  if (selectedAnswerIndex.value === correctAnswerIndex.toString()) {
    alert('Correct answer!')
  } else {
    alert('Wrong answer. Try again!')
  }

  displayNextQuestion()
}

function endQuiz() {
  const questionContainer = document.getElementById('question-container')
  questionContainer.innerHTML = '<h2>Quiz completed!</h2>'
  document.getElementById('next-button').style.display = 'none'
}

document.getElementById('quiz-form').addEventListener('submit', function (e) {
  e.preventDefault()
  startQuiz()
})
