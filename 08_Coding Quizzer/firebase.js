// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

// Your web app's Firebase configuration
import firebaseConfig from './firebaseConfig.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const docRef = doc(db, 'question', 'iFvontYgnRDynLeL741k')

// Get the languages array from the document.
const languages = await getDoc(docRef).then((doc) => doc.data().languages)

const languageOptions = languages.map((language) => {
  return `<option value="${language}">${language}</option>`
})

const selectElement = document.getElementById('language')
const selectElement2 = document.getElementById('languageinput')

selectElement.innerHTML += languageOptions.join('')
selectElement2.innerHTML += languageOptions.join('')
//
const addToFireBase = async (uname, uscore, uright, uwrong) => {
  try {
    // Add the student record to Firebase
    const docRef = await addDoc(collection(db, 'QuizDataBase'), {
      name: uname,
      score: uscore,
      right: uright,
      wrong: uwrong,
    })
    console.log('Student added with ID: ', docRef.id)
  } catch (error) {
    console.error('Error adding student: ', error)
  }
}
window.addToFireBase = addToFireBase

// Select the element by its 'id'
const studentListLink = document.getElementById('studentListLink')

studentListLink.addEventListener('click', async (e) => {
  console.log('Show Result :')

  document.getElementById('slideid').style.display = 'none'
  document.getElementById('quizform').style.display = 'none'
  document.getElementById('result-container').style.display = 'none'
  document.getElementById('add-form').style.display = 'none'
  document.getElementById('question-container').style.display = 'none'
  document.getElementById('addlangform').style.display = 'none'

  const resultContainer = document.getElementById('results-container')
  resultContainer.style.display = 'block'

  try {
    // Retrieve student data and add it to 'result-container'
    const querySnapshot = await getDocs(collection(db, 'QuizDataBase'))

    // Create a table element
    const table = document.createElement('table')

    // Create a table header row
    const headerRow = document.createElement('tr')

    // Define the table headers
    const headers = ['Name', 'Score', 'Correct', 'Wrong']

    headers.forEach((headerText) => {
      const headerCell = document.createElement('th')
      headerCell.textContent = headerText
      headerRow.appendChild(headerCell)
    })

    // Append the header row to the table
    table.appendChild(headerRow)

    querySnapshot.forEach((doc) => {
      const studentData = doc.data()

      // Create a table row for each student
      const row = document.createElement('tr')

      // Create table data cells for each piece of student information
      const nameCell = document.createElement('td')
      nameCell.textContent = studentData.name

      const scoreCell = document.createElement('td')
      scoreCell.textContent = studentData.score

      const correctCell = document.createElement('td')
      correctCell.textContent = studentData.right

      const wrongCell = document.createElement('td')
      wrongCell.textContent = studentData.wrong

      // Append cells to the row
      row.appendChild(nameCell)
      row.appendChild(scoreCell)
      row.appendChild(correctCell)
      row.appendChild(wrongCell)

      // Append the row to the table
      table.appendChild(row)
    })

    // Append the table to the 'result-container'
    resultContainer.appendChild(table)
  } catch (error) {
    console.log('Error ' + error)
  }

  // You may want to add logic to handle errors appropriately.
})
