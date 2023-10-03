import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  where,
  query,
  doc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

// Your web app's Firebase configuration
import firebaseConfig from './firebaseConfig.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

console.log('Load File')

document.getElementById('addlang').addEventListener('click', () => {
  console.log('AddLang')
  document.getElementById('addlangform').style.display = 'block'

  document.getElementById('slideid').style.display = 'none'
  document.getElementById('quizform').style.display = 'none'
  document.getElementById('result-container').style.display = 'none'
  document.getElementById('add-form').style.display = 'none'
  document.getElementById('question-container').style.display = 'none'
  document.getElementById('popup3').style.display = 'none'
  document.getElementById('results-container').style.display = 'none'

  document.getElementById('addedlang').addEventListener('click', function () {
    document.getElementById('popup3').style.display = 'flex'
  })

  document.getElementById('closePopup3').addEventListener('click', function () {
    document.getElementById('popup3').style.display = 'none'
  })

  document.getElementById('reloadPage3').addEventListener('click', function () {
    document.getElementById('popup3').style.display = 'none'
  })
})

const createLanguageForm = document.getElementById('create-language-form')

// Add an event listener to the 'submit' event of the form.
createLanguageForm.addEventListener('submit', async function (event) {
  event.preventDefault()

  // Get the new language name from the input field.
  const newLanguage = event.target.elements.language.value
  const docRef = doc(db, 'question', 'iFvontYgnRDynLeL741k')
  const languages = await getDoc(docRef).then((doc) => doc.data().languages)

  languages.push(newLanguage)
  await updateDoc(docRef, { languages: languages })
  console.log('New Lang Added')

  event.target.elements.language.value = ''
})
