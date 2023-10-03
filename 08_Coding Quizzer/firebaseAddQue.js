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
const addLink = document.getElementById('addQuestion')

addLink.addEventListener('click', () => {
  document.getElementById('slideid').style.display = 'none'
  document.getElementById('quizform').style.display = 'none'
  document.getElementById('results-container').style.display = 'none'
  document.getElementById('addlangform').style.display = 'none'

  const container = document.getElementById('add-form')
  container.style.display = 'block'
  document.getElementById('addQuestion-container').style.display = 'block'

  document.getElementById('popup2').style.display = 'none'

  document.getElementById('added').addEventListener('click', function () {
    document.getElementById('popup2').style.display = 'flex'
  })

  document.getElementById('closePopup2').addEventListener('click', function () {
    document.getElementById('popup2').style.display = 'none'
  })

  document.getElementById('reloadPage2').addEventListener('click', function () {
    container.reset()
    document.getElementById('popup2').style.display = 'none'
  })
})

// Function to handle form submission
document
  .getElementById('add-form')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    var question = document.getElementById('question').value
    var options = [
      document.getElementById('option1').value,
      document.getElementById('option2').value,
      document.getElementById('option3').value,
      document.getElementById('option4').value,
    ]
    var correctAnswer = document.getElementById('correct-answer').value
    var correctAnswerText = document.getElementById(correctAnswer).value
    var level = document.getElementById('level').value
    var language = document.getElementById('languageinput').value

    console.log('question ' + question)
    console.log('Options ' + options)
    console.log('ansOption ' + correctAnswer)
    console.log('andText ' + correctAnswerText)
    console.log('level ' + level)
    console.log('Lang ' + language)

    // Create data object
    var questionData = {
      question: question,
      options: options,
      ans: correctAnswerText,
      level: level,
      lang: language,
    }

    // Reference to the 'questions' collection
    try {
      // Add the question to Firebase
      const docRef = addDoc(collection(db, 'questions'), {
        questionData,
      })
      console.log('Question added with ID: ', docRef.id)
      document.getElementById('add-form').reset()
    } catch (error) {
      console.error('Error adding question: ', error)
    }
  })
