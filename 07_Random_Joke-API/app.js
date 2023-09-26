const setup = document.getElementById('setup')
const punchline = document.getElementById('punchline')

const generateBtn = document.getElementById('generate-btn')
const apiUrl = 'https://official-joke-api.appspot.com/random_joke'
const jokes = 'https://official-joke-api.appspot.com/random_ten'

function print() {
  console.log('Types')

  fetch(jokes)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((joke) => {
        console.log(`: ${joke.type}`)
        console.log(`Joke ${joke.punchline}`)
      })
    })
}
print()
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
