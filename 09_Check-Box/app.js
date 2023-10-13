const box1 = document.getElementById('box1')
const box2 = document.getElementById('box2')
const leftbtn = document.getElementById('left')
const rightbtn = document.getElementById('right')

let con1 = ['apple', 'banana', 'orange']
let con2 = ['mango', 'pineapple']

rightbtn.addEventListener('click', () => {
  const checkedCheckboxes = Array.from(
    box1.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value)

  console.log('Checked items in box1:', checkedCheckboxes)

  checkedCheckboxes.forEach((element) => {
    con2.push(element)
    con1 = con1.filter((item) => item !== element)
  })
  printRight()
  printleft()
  console.log('Checked items in box1:', con2)
})

leftbtn.addEventListener('click', () => {
  const checkedCheckboxes = Array.from(
    box2.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value)

  console.log('Checked items in box2:', checkedCheckboxes)

  checkedCheckboxes.forEach((element) => {
    con1.push(element)
    con2 = con2.filter((item) => item !== element)
  })
  printleft()
  printRight()
  console.log('Checked items in box2:', con1)
})

function printleft() {
  box1.innerHTML = ''
  for (let i = 0; i < con1.length; i++) {
    const checkbox = document.createElement('INPUT')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('name', `checkbox_${i}`)
    checkbox.setAttribute('value', con1[i])

    const space = document.createElement('span')

    const label = document.createElement('LABEL')
    label.setAttribute('for', `checkbox_${i}`)
    label.textContent = con1[i]

    box1.appendChild(checkbox)
    box1.appendChild(label)
    box1.appendChild(space)
  }
}

function printRight() {
  box2.innerHTML = ''
  for (let i = 0; i < con2.length; i++) {
    const checkbox = document.createElement('INPUT')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('name', `checkbox_${i}`)
    checkbox.setAttribute('value', con2[i])

    const space = document.createElement('span')

    const label = document.createElement('LABEL')
    label.setAttribute('for', `checkbox_${i}`)
    label.textContent = con2[i]

    box2.appendChild(checkbox)
    box2.appendChild(label)
    box2.appendChild(space)
  }
}

printleft()
printRight()
