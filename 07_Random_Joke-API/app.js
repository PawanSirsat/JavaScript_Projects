const setup = document.getElementById('setup')
const punchline = document.getElementById('punchline')

const generateBtn = document.getElementById('generate-btn')
const apiUrl = 'https://official-joke-api.appspot.com/random_joke'

generateBtn.addEventListener('click', () => {
  // Make an AJAX request to the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Display the joke from the API response
      const setup = data.setup
      const punchline = data.punchline
      console.log(setup)
      console.log(punchline)

      this.setup.textContent = setup
      this.punchline.textContent = punchline
    })
    .catch((error) => {
      console.error('Error fetching joke: ', error)
    })
})
