let generateBtn = document.getElementById('generate')
let decrementBtn = document.getElementById('decrement')
let incrementBtn = document.getElementById('increment')
let lengthInput = document.getElementById('password-length')
let passwordEls = document.querySelectorAll('.password')
let popUp = document.getElementById('pop-up')


function updateLength(number) {
  number = Number(number)  // make sure number is not a string

  if (number >= 5 && number <= 20) {
    passwordLength = number
  } else {
    alert("Password length must be between 5 and 20 characters.")
  }
  
  lengthInput.value = passwordLength
}

function generatePassword() {
  let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let lowercase = 'abcdefghijklmnopqrstuvwxyz'
  let numbers = '1234567890'
  let logograms = '#$%&@^~'
  let mathSymbols = '<*+!?='

  let characters = uppercase + lowercase + numbers + logograms + mathSymbols
  characters = characters.split('')

  let password = ''
  for (let i = 0; i < passwordLength; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length)
    password += characters[randomIndex]
  }

  return password
}

function generatePasswords() {
  // generate a list of passwords based on the number of password elements
  let passwords = []
  for (let i = 0; i < passwordEls.length; i++) {
    let password = generatePassword()
    passwords.push(password)
  }

  // display the passwords on the page
  for (let i = 0; i < passwords.length; i++) {
    passwordEls[i].textContent = passwords[i]
    passwordEls[i].classList.remove('hidden')
  }
}

async function copyToClipboard(event) {
  let password = event.target.textContent
  try {
    await navigator.clipboard.writeText(password)
  } catch(err) {
    console.log("Clipboard access denied. Time to go old school...")
    copyUsingExecCommand(password)
  }

  // show a pop-up to notify the user
  clearTimeout(timeoutId)
  popUp.style.opacity = 0.9
  timeoutId = setTimeout(() => popUp.style.opacity = '', 3000)
}

function copyUsingExecCommand(text) {
  let input = document.createElement("input")
  input.value = text
  input.readOnly = true
  input.style = {
    position: "absolute",
    left: "-9999px"
  }
  document.body.append(input)
  input.select()
  document.execCommand("copy")
  input.remove()
}


let timeoutId
let passwordLength = 10
lengthInput.value = passwordLength

decrementBtn.addEventListener('click', () => updateLength(passwordLength - 1))
incrementBtn.addEventListener('click', () => updateLength(passwordLength + 1))
lengthInput.addEventListener('blur', () => updateLength(lengthInput.value))

generateBtn.addEventListener('click', generatePasswords)

passwordEls.forEach(element => {
  element.addEventListener('click', copyToClipboard)
})
