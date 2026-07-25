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