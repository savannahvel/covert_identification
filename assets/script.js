// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

function checkYesOrNo(prompt) {
  let cleanedPrompt = prompt.toUpperCase();

  if (cleanedPrompt === "Y" || cleanedPrompt === "N") { 
    return cleanedPrompt;
  } else {
    window.alert("Please enter either a Y or N response.");
  }
}

function includeCapitals() {
  let capital = prompt("Would you like to include capital letters? Y/N");

  if (!(capital == "Y" || capital == "N")) { 
    let cleanedCapital = checkYesOrNo(capital)
    if (!cleanedCapital) {
      includeCapitals();
    }
    return cleanedCapital;
  }

  return capital;
}

function includeLowerCase() {
  let lowerCase = prompt("Would you like to include lower case letters? Y/N");

  if (!(lowerCase == "Y" || lowerCase == "N")) { 
    let cleanedLowerCase = checkYesOrNo(lowerCase)
    if (!cleanedLowerCase) {
      includeLowerCase();
    }
    return cleanedLowerCase;
  }

  return lowerCase;
}

function includeNumbers() {
  let numbers = prompt("Would you like to include numbers letters? Y/N");

  if (!(numbers == "Y" || numbers == "N")) { 
    let cleanedNumbers = checkYesOrNo(numbers)
    if (!cleanedNumbers) {
      includeCapitals();
    }
    return cleanedNumbers;
  }

  return numbers;
}

function includeSpecialCharacters() {
  let specialCharacters = prompt("Would you like to include special characters? Y/N");

  if (!(specialCharacters == "Y" || specialCharacters == "N")) { 
    let cleanedSpecialCharacters = checkYesOrNo(specialCharacters)
    if (!specialCharacters) {
      includeSpecialCharacters();
    }
    return cleanedSpecialCharacters;
  }

  return specialCharacters;
}

function lengthPrompt() {
  var length = prompt("How many characters do you want to generate? Minimum 8 characters, maximum 128.");
  let passwordLength;

  if (length == null) {
    return null;
  } else {
    passwordLength = Number(length);
  }

  if (passwordLength < 8) {
    window.alert("That length is too short. Minimum length is 8. Please try again.");
    lengthPrompt();
  } else if (passwordLength > 128) {
    window.alert("That length is too long. Maximum length is 128. Please try again.");
    lengthPrompt();
  }

  return passwordLength;
}

function generateCharacters(characters) {
  let randomChar = Math.floor(Math.random() * characters.length);
  return characters[randomChar];
}

function generatePassword() {
  let password = '';
  let length = lengthPrompt();
  let capitals = includeCapitals();
  let lowerCase = includeLowerCase();
  let numbers = includeNumbers();
  let specialCharacters = includeSpecialCharacters();
  
  let lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  let upperCaseAlphabet = lowerAlphabet.toUpperCase();
  let numberValue = '123456789';
  let specialCharList = '!"#$%&()*+,-./:;<=>?@[]^_`{|}~'

  for (let i = 0; i < length; i++) {
    let emptyString = '';
    if (capitals === "Y") {
      let capitalCharacters = generateCharacters(upperCaseAlphabet)
      emptyString += capitalCharacters;
    }

    if (lowerCase === "Y") {
      let lowerCaseCharacters = generateCharacters(lowerAlphabet)
      emptyString += lowerCaseCharacters;
    }
    
    if (numbers === "Y") {
      let numberCharacters = generateCharacters(numberValue)
      emptyString += numberCharacters;
    }
    
    if (specialCharacters === "Y") {
      let specialChar = generateCharacters(specialCharList)
      emptyString += specialChar;
    } 
    console.log(emptyString);
    let randomChar = Math.floor(Math.random() * emptyString.length)
    password += emptyString[randomChar];
  }

  return password;
}

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
