//Declares all Dom elements for global use
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol

};


// event listener for checkbox computes of the check box is true or false
//Generates the event listener
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
   // console.log(typeof length);
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

   resultEl.innerText = generatePassword(
       hasLower,
       hasUpper,
       hasNumber,
       hasSymbol,
       length
   );

});
//copy paste from clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        window.alert("Could not copy empty password. Please try again!")
        return;
    }

    //command to copy paste clipboard
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
   
})

// generate the password from event listerner

function generatePassword(lower, upper, number, symbol, length) {
    // ini pw var
    //filter check if func is check true or false
    // loop over length call generator function for each type
    //add final password and return
let generatedPassword = '';
const typesCount = lower + upper + number + symbol;
//console.log('typesCount: ', typesCount);

const typesArr = [{ lower}, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
    );

//console.log('typesArr: ', typesArr);
if(typesCount === 0) {
    return;
}

for(let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];

        //console.log('funcName: ', funcName);
        generatedPassword += randomFunc[funcName]();
    });
}
//important: slice (0, length) counts the length value and inputs only it 
// important:  console.log(generatedPassword.slice(0, length));

const finalPassword = generatedPassword.slice(0, length);
return finalPassword;

}



// Generator func

function getRandomLower() {
 return String.fromCharCode(Math.floor( Math.random() * 26) + 97);
            //random letter 26 //97 code for lowercase letters in the alphabet
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor( Math.random() * 26) + 65);
            //random letter 26  // 65 code for uppercase letters in the alphabet
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor( Math.random() * 10) + 48);
            //random numbers 0 to 9  // 48 code for numbers
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*()<>|,';
    return symbols[Math.floor(Math.random() * symbols.length)];
         // stores all given unique sysmbols and randomized them
}

/*
console.log(getRandomSymbol());
console.log(getRandomUpper());
console.log(getRandomLower());
console.log(getRandomNumber());
            //random letter 26 

            */

