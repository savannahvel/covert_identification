// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

let promptCount = 0;

function checkYesOrNo(prompt) {
  let cleanedPrompt = prompt.toUpperCase();

  if (cleanedPrompt === "Y") {
    promptCount ++
  }

  if (cleanedPrompt === "Y" || cleanedPrompt === "N") { 
    return cleanedPrompt;
  } else {
    window.alert("Please enter either a Y or N response.");
  }
}

function includeCapitals() {
  let capital = prompt("Would you like to include capital letters? Y/N");

  if (capital === "Y") {
    promptCount ++
  }

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

  if (lowerCase === "Y") {
    promptCount ++
  }

  if (!(lowerCase == "Y" || lowerCase == "N")) { 
    let cleanedLowerCase = checkYesOrNo(lowerCase)
    if (!cleanedLowerCase) {
      includeLowerCase();
    }
    return cleanedLowerCase;
  }
  promptCount ++
  return lowerCase;
}

function includeNumbers() {
  let numbers = prompt("Would you like to include numbers letters? Y/N");

  if (numbers === "Y") {
    promptCount ++
  }

  if (!(numbers == "Y" || numbers == "N")) { 
    let cleanedNumbers = checkYesOrNo(numbers)
    if (!cleanedNumbers) {
      includeCapitals();
    }
    return cleanedNumbers;
  }
  promptCount ++
  return numbers;
}

function includeSpecialCharacters() {
  let specialCharacters = prompt("Would you like to include special characters? Y/N");

  if (specialCharacters === "Y") {
    promptCount ++
  }

  if (!(specialCharacters == "Y" || specialCharacters == "N")) { 
    let cleanedSpecialCharacters = checkYesOrNo(specialCharacters)
    if (!specialCharacters) {
      includeSpecialCharacters();
    }
    return cleanedSpecialCharacters;
  }
  promptCount ++
  return specialCharacters;
}

function lengthPrompt() {
  var length = Number(prompt("How many characters do you want to generate? Minimum 8 characters, maximum 128."));

  if (length < 8) {
    window.alert("That length is too short. Minimum length is 8. Please try again.");
    lengthPrompt();
  } else if (length > 128) {
    window.alert("That length is too long. Maximum length is 128. Please try again.");
    lengthPrompt();
  }
  return length;
}

function generateCharacters(passwordLength, numOfPrompts, characters) {
  console.log("numOfPrompts: ", numOfPrompts);
  console.log("Password length: ", passwordLength);
  // console.log(characters)
  
  characterString = '';

  if (numOfPrompts == 1) {
    for (let i = 0; i < passwordLength; i++) { 
      // console.log(characters)
      let randomChar = Math.floor(Math.random() * characters.length);
      characterString += characters[randomChar];
      // console.log(characters[randomChar])
    }
    console.log(characterString)
    return {
      charString: characterString
    }
  } 

  percentage = Math.floor(passwordLength / numOfPrompts); 
  let totalReplacedChars = Math.floor(Math.random() * percentage) + 1;
  
  for (let i = 0; i < totalReplacedChars; i++) { 
    let randomChar = Math.floor(Math.random() * characters.length);
    characterString += characters[randomChar];
  }

  //subtract from promptCount
  promptCount -= 1;
  
  return {
    charString: characterString,
    charCount: totalReplacedChars
  };
}

function generatePassword() {
  let password = '';
  let length = lengthPrompt();
  let capitals = includeCapitals();
  // let lowerCase = includeLowerCase();
  // let numbers = includeNumbers();
  // let specialCharacters = includeSpecialCharacters();

  
  let lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  let upperCaseAlphabet = lowerAlphabet.toUpperCase();
  let numberValue = '123456789';
  let specialCharList = '!"#$%&()*+,-./:;<=>?@[]^_`{|}~'

  
  
  if (capitals === "Y") {
    let capitalCharacters = generateCharacters(length, promptCount, upperCaseAlphabet)
    let addToPassword = capitalCharacters.charString;
    let newTotalChars = capitalCharacters.charCount;
    
    // console.log("Length: " + length);
    // // console.log("characters length: " + addToPassword.length);
    // console.log("Password before set: " + password)
    
    password += addToPassword;
    // console.log("Password after set: " + password)

    length -= newTotalChars;
    // console.log("New Password Length: " + length)
  }

  // if (lowerCase === "Y") {
  //   console.log("in lower case block")
  //   let lowerCaseCharacters = generateCharacters(length, promptCount, lowerAlphabet)
  //   let addToPassword = lowerCaseCharacters.charString;
  //   let newTotalChars = lowerCaseCharacters.charCount;
    
  //   console.log("Length: " + length);
  //   console.log("characters length: " + addToPassword.length);
  //   console.log("Password before set: " + password)
    
  //   password += addToPassword;
  //   console.log("Password after set: " + password)

  //   length -= newTotalChars;
  //   console.log("New Password Length: " + length)
    
  //   password += addToPassword;
  //   length -= newTotalChars;
  // }
  
  // if (numbers === "Y") {
  //   let numberCharacters = generateCharacters(length, promptCount, numberValue)
  //   password += numberCharacters;
  //   console.log("password length in numbers: " + password.length)
  //   length -= password.length;
  //   console.log("PW length in numbers: " + length);
  // }
  
  // if (specialCharacters === "Y") {
  //   let specialChar = generateCharacters(length, promptCount, specialCharList)
  //   password += specialChar;
  //   length -= password.length;
  // } 
  
  
  // clear prompt when done so user can regenerate w/o refreshing page
  promptCount = 0;
  // return password;

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