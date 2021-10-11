const numberButtons = document.querySelectorAll('.btn-num');
const operateButtons = document.querySelectorAll('.btn-op');
const topScreen = document.querySelector('#top-text');
const bottomScreen = document.querySelector('#bottom-text');

let currentValue = 0;
let oldValue = 0; 


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function enterValue(e) {

    if (bottomScreen.textContent.length === 16) {
        return;
    }

    oldValue = currentValue;
    currentValue = Number(e.target.textContent);
    if (oldValue === 0) {
        bottomScreen.textContent = currentValue;
    } else {
        bottomScreen.textContent += e.target.textContent;
    }

}

function callOperation(e) {
    
}

numberButtons.forEach(button => {
    button.addEventListener('click', enterValue);
});

operateButtons.forEach(button => {
    button.addEventListener('click',callOperation);
});

