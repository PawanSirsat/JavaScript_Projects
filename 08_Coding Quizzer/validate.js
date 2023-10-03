// Get references to the form elements
const languageSelect = document.getElementById('language')
const quizTypeSelect = document.getElementById('quiz-type')
const difficultySelect = document.getElementById('difficulty')
const nameInput = document.getElementById('name')
const startButton = document.getElementById('start')

// Function to check if all fields are filled/selected
function checkFields() {
  const languageValue = languageSelect.value
  const quizTypeValue = quizTypeSelect.value
  const difficultyValue = difficultySelect.value
  const nameValue = nameInput.value.trim() // Trim whitespace

  // Enable the start button if all fields are filled/selected
  if (
    languageValue !== 'none' &&
    quizTypeValue !== 'none' &&
    difficultyValue !== 'none' &&
    nameValue !== ''
  ) {
    startButton.disabled = false
  } else {
    startButton.disabled = true
  }
}

// Add event listeners to the form elements
languageSelect.addEventListener('change', checkFields)
quizTypeSelect.addEventListener('change', checkFields)
difficultySelect.addEventListener('change', checkFields)
nameInput.addEventListener('input', checkFields)
