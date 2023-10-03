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

//Show Data
document
  .getElementById('filter-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault()

    var selectedLanguage = document.getElementById('languageinput').value
    var selectedLevel = document.getElementById('levelinput').value
    const resultContainer = document.getElementById('result-container')

    console.log(selectedLanguage)
    console.log(selectedLevel)

    // Create a reference to the cities collection
    try {
      // Retrieve student data and add it to 'result-container'
      const querySnapshot = await getDocs(
        query(
          collection(db, 'question'),
          where('questionData.level', '==', selectedLevel),
          where('questionData.lang', '==', selectedLanguage)
        )
      )

      querySnapshot.forEach((doc) => {
        const studentData = doc.data().questionData
        console.log(studentData)
      })
      const headers = ['Name', 'Level', 'lang']

      querySnapshot.forEach((doc) => {
        const selectElement = document.createElement('select')

        const studentData = doc.data().questionData

        const questionText = document.createElement('h3')
        questionText.textContent = studentData.question
        console.log('Que :')
        console.log(studentData.question)

        console.log('Option :')

        studentData.options.forEach((option) => {
          console.log(option)
          const optionElement = document.createElement('option')
          optionElement.value = option
          optionElement.textContent = option
          selectElement.appendChild(optionElement)
        })
        console.log('Append : ')
        resultContainer.appendChild(questionText)
        resultContainer.appendChild(selectElement)
      })

      // Append the table to the 'result-container'
    } catch (error) {
      console.log('Error ' + error)
    }

    // You may want to add logic to handle errors appropriately.
  })

export default firebaseData
