const nextButton = document.getElementById('next-button')
const saveButton = document.getElementById('saveButton')
const userCard = document.getElementById('user-card')
const savePage = document.getElementById('user-container')
const savebtn = document.getElementById('save-page')
const generatebtn = document.getElementById('generate-page')

async function fetchUserData() {
  generatebtn.disabled = true
  generatebtn.style.color = '#007bff'
  try {
    let response = await fetch('https://random-data-api.com/api/v2/users')
    userData = await response.json()

    console.log('New Data' + JSON.stringify(userData))

    //Display data
    displayUserData(userData)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

//Save in Local Storage
document.getElementById('saveButton').addEventListener('click', () => {
  let savedData = localStorage.getItem('userData')
  // If no data exists in local storage, initialize it as an empty array
  if (!savedData) {
    savedData = []
  } else {
    // Parse the existing data if it exists
    savedData = JSON.parse(savedData)
  }
  // Append the new user data to the existing data
  savedData.push(userData)

  // Save the updated data back to local storage
  localStorage.setItem('userData', JSON.stringify(savedData))
  // console.log('Data saved to local storage:', savedData)
})

document.getElementById('save-page').addEventListener('click', () => {
  savebtn.disabled = true
  savebtn.style.color = '#007bff'
  generatebtn.style.color = '#f4f4f4'

  userCard.style.display = 'none'
  savePage.style.display = 'flex'
  saveButton.disabled = true
  nextButton.disabled = true
  generatebtn.disabled = false

  fetchAndDisplayUserList()
  console.log('user-card Save ' + userCard.style.display)
  console.log('save-page Save ' + savePage.style.display)
})

document.getElementById('generate-page').addEventListener('click', () => {
  userCard.style.display = 'flex'
  savePage.innerHTML = ''
  saveButton.disabled = false
  nextButton.disabled = false
  savebtn.disabled = false
  savebtn.style.color = '#f4f4f4'

  fetchUserData()
  console.log('user-card generate ' + userCard.style.display)
  console.log('save-page generate ' + savePage.style.display)
})

async function fetchAndDisplayUserList() {
  try {
    const users = JSON.parse(localStorage.getItem('userData'))
    const userContainer = document.getElementById('user-container')

    users.forEach((user) => {
      const userCard = document.createElement('div')
      userCard.className = 'user-card1'

      // image  Name Gender
      const avatarImage = document.createElement('img')
      avatarImage.src = user.avatar
      avatarImage.className = 'user-avatar1'

      const username = document.createElement('p')
      username.textContent = `Name : ${user.first_name}`

      // const profileLink = document.createElement('a')
      // profileLink.textContent = `Email`
      // profileLink.href = user.email
      // profileLink.target = '_blank'

      const email = document.createElement('p')
      email.textContent = `Email: ${userData.email}`

      const contact = document.createElement('p')
      contact.textContent = `Contact: ${userData.phone_number}`

      userCard.appendChild(avatarImage)
      userCard.appendChild(username)
      userCard.appendChild(contact)
      userCard.appendChild(email)

      // Fetch additional user info (followers and following)

      userContainer.appendChild(userCard)
    })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

function displayUserData(userData) {
  userCard.innerHTML = `
                <img src="${userData.avatar}" alt="User Avatar" class="user-image">

                <div class="user-data-left">

                <div class="user-data-field">
                    <span class="user-data-label">ID:</span> ${userData.id}
                </div>
              
                <div class="user-data-field">
                    <span class="user-data-label">Password:</span> ${userData.password}
                </div>
                <div class="user-data-field">
                    <span class="user-data-label">First Name:</span> ${userData.first_name}
                </div>
                <div class="user-data-field">
                    <span class="user-data-label">Last Name:</span> ${userData.last_name}
                </div>
                <div class="user-data-field">
                    <span class="user-data-label">Username:</span> ${userData.username}
                </div>
                <div class="user-data-field">
                    <span class="user-data-label">Email:</span> ${userData.email}
                </div>
                <div class="user-data-field">
                    <span class="user-data-label">Gender:</span> ${userData.gender}
                </div>
               
                <div class="user-data-field">
                    <span class="user-data-label">Date of Birth:</span> ${userData.date_of_birth}
                </div>

               
                                </div>

                        <div class="user-data-right">
 <div class="user-data-field">
                    <span class="user-data-label">Phone Number:</span> ${userData.phone_number}
                </div>
                <div class="user-data-field">
                    <span class="user-data-label">Credit Card Number:</span> ${userData.credit_card.cc_number}
                </div>
                <div class="user-data-field">
                    <span class="user-data-label">Subscription Plan:</span> ${userData.subscription.plan}
                </div>
                <div class="user-data-field">
                    <span class="user-data-label">Subscription Status:</span> ${userData.subscription.status}
                </div>
                <div class="user-data-field">
                    <span class="user-data-label">Subscription Payment Method:</span> ${userData.subscription.payment_method}
                </div>
                <div class="user-data-field">
                    <span class="user-data-label">Subscription Term:</span> ${userData.subscription.term}
                </div>
                </div>
                <!-- Add more data fields here -->
            `
}
nextButton.addEventListener('click', fetchUserData)

fetchUserData()
