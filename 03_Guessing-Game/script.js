const btn = document.querySelector('#startBtn')
const checkbtn = document.querySelector('#nextBtn')
const alert = document.querySelector('#success')

let chance = 5
let randomNumber

checkbtn.addEventListener('click', function () {
  checkGuess()
})
document.querySelector('#guess').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    checkGuess()
  }
})

console.log(btn.textContent)
btn.addEventListener('click', function () {
  alert.style.display = 'none'
  document.querySelector('.view').style.display = 'block'
  document.querySelector('#startBtn').style.display = 'none'
  randomNumber = Math.floor(Math.random() * 100) + 1
  console.log('Num Generated : ' + randomNumber)
  chance = 5
})
let zero = 0

function checkGuess() {
  const userGuess = parseInt(document.querySelector('#guess').value)
  chance--

  if (userGuess == randomNumber) {
    document.querySelector('#guess').value = ''
    console.log('You Win')
    document.querySelector('.view').style.display = 'none'
    document.querySelector('#startBtn').style.display = 'block'
    alert.style.display = 'block'
    alert.textContent = `${userGuess} is Correct You Win !!!`
    alert.className = 'alert alert-success'
    win()
  } else if (userGuess < randomNumber) {
    document.querySelector('#guess').value = ''
    console.log('Too low')
    alert.style.display = 'block'
    alert.textContent = `${userGuess} is Too low , ${chance} chance left`
    alert.className = 'alert alert-warning'
  } else if (userGuess > randomNumber) {
    document.querySelector('#guess').value = ''
    console.log('Too high')
    alert.style.display = 'block'
    alert.textContent = `${userGuess} is Too High , ${chance} chance left`
    alert.className = 'alert alert-warning'
  }

  if (chance === 0) {
    document.querySelector('.view').style.display = 'none'
    document.querySelector('#startBtn').style.display = 'block'
    alert.style.display = 'block'
    alert.textContent = 'You Lost All Chances !!!'
    alert.className = 'alert alert-danger'
  }
}
