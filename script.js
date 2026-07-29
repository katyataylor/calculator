let firstNum = "";
let secondNum = "";
let operand = "";
let isPowerOn = false; // calculator starts turned OFF
let isCalculated = false; // tracks if an answer has been calculated 

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

    // 1.handle numbers & decimals
    if (!isNaN(buttonText) || buttonText === '.') {

       // clear screen if a new number is pressed right after hitting equals
      if (isCalculated && operand === "") {
        firstNum = "";
        isCalculated = false;
      }

      // builds first number while no operator is selected
      if (operand === "") {
        if (buttonText === '.' && firstNum.includes('.')) return; // prevents multiple decimals in number
        firstNum += buttonText;
        calcScreen.innerText = firstNum;
      } else {
        secondNum += buttonText;
        // OVERWRITE the screen with the complete mathematical string
        calcScreen.innerText = `${firstNum}${operand}${secondNum}`;
      }
    } 
    
    // 2. handle operators
    else if (['+', '-', '*', '/', '^', '√', '!', '%'].includes(buttonText)) {
        isCalculated = false;

        // percentage instant calculation
        if (buttonText === '%') {
            if (secondNum !== "") {
                secondNum = (Number(secondNum) / 100).toString();
            } else if (firstNum !== "") {
                firstNum = (Number(firstNum) / 100).toString();
            }
            calcScreen.innerText = `${firstNum}${operand}${secondNum}`;
            return; 
        }

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
            isCalculated = true;
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
      isCalculated = true;
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
    let answer;

    switch (operand) {
        case "+": answer = a + b; break;
        case "-": answer = a - b; break;
        case "*": answer = a * b; break;
        case "/": answer = b === 0 ? "Error" : a / b; break;// Avoid division by zero
        case "^": answer = Math.pow(a, b); break;
        case "√": answer = Math.sqrt(a); break;
        case "!": answer = factorial(a); break;
        case "%": answer = percentage(a); break;
        default: answer = a;
    }

    // rounding logic
    if (typeof answer === 'number') {
      return Number(answer.toFixed(4));
    }

    return answer;
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

function percentage(a) {
    let total = (a / 100);
    return total;
}
