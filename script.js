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
        // full hard reset when shutting down
        firstNum = "";
        secondNum = "";
        operand = "";
        isCalculated = false;
        
        calcScreen.innerText = ""; // make screen blank
        calcScreen.classList.add('screen-off'); // for CSS styling
    } else {
        calcScreen.innerText = "0";
        calcScreen.classList.remove('screen-off');
    }

    adjustFontSize();
});

// main button container listener
btnContainer.addEventListener('click', (event) => {
  // stop immediately if calculator is off
  if (!isPowerOn) return;

  // exit if user clicked empty space between buttons
  if (event.target.tagName !== 'BUTTON') return;

  // ignore power button here so it doesnt trigger number/operator logic
  if (event.target === powerBtn) return;

  let buttonText = event.target.innerText;

  // pass text to inpur handler
  handleInput(buttonText);
});

// Shared input handler for clicks and keyboard
function handleInput(buttonText) {
  console.log(`Engine received: ${buttonText}. Current firstNum: ${firstNum}, operand: ${operand}`);

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

    adjustFontSize();
} 

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

// adjust font size to fit display for large numbers
function adjustFontSize() {
    const chars = calcScreen.innerText.length;
    
    if (chars > 16) {
        calcScreen.style.fontSize = "1.2rem"; // Tiny font for huge numbers
    } else if (chars > 10) {
        calcScreen.style.fontSize = "1.8rem"; // Medium font
    } else {
        calcScreen.style.fontSize = "2.5rem"; // Default large font (match your CSS)
    }
}

// global keyboard support
window.addEventListener('keydown', (event) => {
    // stop if the calculator is turned off
    if (!isPowerOn) return;

    let key = event.key;

    console.log("Key pressed:", key); 

    // 1. map keyboard edge-cases to match existing button strings
    if (key === 'Enter') key = '=';
    if (key === 'Backspace') key = 'Undo';
    if (key === 'Escape' || key.toLowerCase() === 'c') key = 'Clear';
    
    if (key === '/') key = '/'; // map standard keyboard forward-slash to division

    // 2. validate that the pressed key is something the calculator handles
    const validInputs = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',
        '+', '-', '*', '/', '^', '√', '!', '%', '=', 'Undo', 'Clear'
    ];

    if (validInputs.includes(key)) {
        // prevent default browser behavior (like Enter submitting a form or scrolling)
        event.preventDefault(); 
        
        // send the clean key value to the calculator logic
        handleInput(key);
    }
});
