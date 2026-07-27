let firstNum = "";
let secondNum = "";
let operand = "";
let isPowerOn = false; // calculator starts turned OFF

const btnContainer = document.querySelector('.btn-container');
const calcScreen = document.querySelector('#result');
const powerBtn = document.querySelector('#on-off');

// power toggle
powerBtn.addEventListener('click', () => {
    isPowerOn = !isPowerOn; // toggle the state between true and false

    if (!isPowerOn) {
        expression = "";
        calcScreen.innerText = ""; // make screen blank
        calcScreen.classList.add('screen-off'); // for CSS styling
    } else {
        calcScreen.innerText = "0";
        calcScreen.classList.remove('screen-off');
    }
});

// main button container listener
btnContainer.addEventListener('click', (event) => {
  // exit if user clicked empty space between buttons
  if (event.target.tagName !== 'BUTTON') return;
  let buttonText = event.target.innerText;

    // triage logic

    // 1.handle numbers & decimals
    if (!isNaN(buttonText) || buttonText === '.') {
      // builds first number while no operator is selected
      if (operand === "") {
        firstNum += buttonText;
        calcScreen.innerText = `${firstNum}`;
      } else {
        secondNum += buttonText;
        calcScreen.innerText += `${secondNum}`;
      }
    } 
    
    // 2. handle operators
    else if (['+', '-', '*', '/', '^', '√', '!', '%'].includes(buttonText)) {
        // when user already has a full equation, evaluate it first before chaining the next operator
        if (firstNum !== "" && operand !== "" && secondNum !== "") {
            firstNum = operate().toString();
            secondNum = "";
        }
        
        operand = buttonText;
        calcScreen.innerText = `${firstNum}${operand}`;
        
        // single-number operations (factorial / square Root) can evaluate instantly
        if (operand === '!' || operand === '√') {
            firstNum = operate().toString();
            operand = "";
            secondNum = "";
            calcScreen.innerText = firstNum;
        }
    } 

    // 3. handle equals
    else if (buttonText === '=') {
      if (firstNum === "" || operand === "") return;
      const finalAnswer = operate();
      calcScreen.innerText = finalAnswer;
        
      // prep variables for the next operation
      firstNum = finalAnswer.toString();
      secondNum = "";
      operand = "";
    }  
    
    // 4. handle Clear & Undo
   else if (buttonText === 'Clear') {
        firstNum = ""; secondNum = ""; operand = "";
        calcScreen.innerText = "0";
    } 
    else if (buttonText === 'Undo') {
        if (secondNum !== "") {
            secondNum = secondNum.slice(0, -1);
        } else if (operand !== "") {
            operand = "";
        } else if (firstNum !== "") {
            firstNum = firstNum.slice(0, -1);
        }
        calcScreen.innerText = `${firstNum}${operand}${secondNum}` || "0";
    }
}); 

// math logic
function operate() {
    let a = Number(firstNum);
    let b = Number(secondNum);

    switch (operand) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b === 0 ? "Error" : a / b; // Avoid division by zero
        case "^": return Math.pow(a, b);
        case "√": return Math.sqrt(a);
        case "!": return factorial(a);
        default: return a;
    }
}

function add(a,b) {
	let num = (a) + (b);
  return num;
};

function subtract(a,b) {
	let num = (a - b);
  return num;
};

function multiply(array) {
  let total = 1;
  for (let i = 0; i < array.length; i++) {
    total *= array[i];
  }
  return total;
};

function divide(a,b) {
    let num = (a/b);
  return num;
}

function power(a,b) {
	let total = a ** b;
  return total;
}

function squareRoot(a) {
  let total = Math.sqrt(a);
  return total;
}

function factorial(a) {
    if (a < 0) return "Error";
    let total = 1;
    for (let i = a; i > 1; i--) total *= i;
    return total;
}

function sum(array) {
	  let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i];
    }
    return total;
}

