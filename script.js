let firstNum = "";
let secondNum = "";
let operand = "";

const btnContainer = document.querySelector('.btn-container');
let calcScreen = document.querySelector('#result');

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
        calcScreen.innerText = firstNum;
      } else {
        secondNum += buttonText;
        calcScreen.innerText += `${firstNum}${operand}${secondNum}`;
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
    
    else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/' || buttonText === '*' || buttonText === '(' || buttonText === ')' || buttonText === '^' || buttonText === '√' || buttonText === '.' || buttonText === '%' || buttonText === '!') {
      operand = buttonText; // stores the operator so the next number clicked goes to secondNum
      calcScreen.innerText += buttonText;
    
    } else if (buttonText === 'Clear') {
      firstNum = "";
      secondNum = "";
      operand = "";
      calcScreen.innerText = "0";
      
    } else if (buttonText === 'Undo') {
      
    if (secondNum !== "") {
      // chop the last character off secondNum
      secondNum = secondNum.slice(0, -1);
      calcScreen.innerText = `${firstNum}${operand}${secondNum}`;
        
    } else if (operand !== "") {
      // if undo right after hitting an operator, remove the operator
      operand = "";
      calcScreen.innerText = firstNum; // Show the first number again
        
    } else if (firstNum !== "") {
      // chop the last character off firstNum
      firstNum = firstNum.slice(0, -1);
      calcScreen.innerText = firstNum;
      // if user deletes everything, show a 0 instead of a blank screen
      calcScreen.innerText = firstNum === "" ? "0" : firstNum;
    }
      
  }
}); 

function operate() {
  let a = Number(firstNum);
  let b = Number(secondNum);

  if (operand === "+") {
     return add(a, b);
  } else if (operand === "-") {
    return subtract(a, b);
  } else if (operand === "*") {
    return multiply([a, b]);
  } else if (operand === "/") {
    return divide(a, b);
  } else if (operand === "^") {
    return power(a, b);
  } else if (operand === "√") {
    return squareRoot(a);
  } else if (operand === "*=") {
    return factorial(a);
  } else if (operand === "+=") {
    return sum([a, b]);
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

const power = function(a,b) {
	let total = a ** b;
  return total;
};

const squareRoot = function(a) {
  let total = Math.sqrt(a);
  return total;
}

const factorial = function(a) {
	let total = 1;
  for ( let i = a; i > 1; i--) {
    total *= i;
  }
  return total;
};

const sum = function(array) {
	let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total;
};

