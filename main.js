const numberButtons = document.querySelectorAll('.btn-num');
const operateButtons = document.querySelectorAll('.btn-op');
const clearButton = document.querySelector('#btn-clear');
const deleteButton = document.querySelector('#btn-delete');
const equalButton = document.querySelector('#btn-equal');
const dotButton = document.querySelector('#btn-dot');
const topScreen = document.querySelector('#top-text');
const bottomScreen = document.querySelector('#bottom-text');
const topDisplay = document.querySelector('#screen-top');
const bottomDisplay = document.querySelector('#screen-bottom');

let overwrite = true;
let operand1 = "";
let operand2 = "";
let operation = "";

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
        case "x":
            return multiply(a, b);
        case "÷":
            if (b === 0) {
                alert("Error: dividing with zero");
                clear();
                return;
            }
            return divide(a, b);
    }
}

function enterValue(e) {

    if (bottomScreen.textContent.length === 16 && overwrite === false) {
        return;
    }

    let value;
    if (typeof e.target === 'undefined') {
        value = e.textContent;
    } else {
        value = e.target.textContent;
    }


    if (bottomScreen.textContent === "0" && value === "0") {
        return;
    }

    if (overwrite === true) {
        bottomScreen.textContent = value;
        overwrite = false;
    } else {
        bottomScreen.textContent += value;
    }

}

function callOperation(e) {

    overwrite = true;

    let value;
    if (typeof e.target === 'undefined') {
        value = e.textContent;
    } else {
        value = e.target.textContent;
    }


    if (operand1.length === 0) {
        operation = value;
        operand1 = bottomScreen.textContent;
        topScreen.textContent = operand1 + " " + operation;
    } else if (operand2.length != 0) {
        operation = value;
        topScreen.textContent = bottomScreen.textContent + " " + operation;
        operand1 = bottomScreen.textContent;
        operand2 = "";
    } else {
        let result = operate(operation, Number(operand1), Number(bottomScreen.textContent));
        if (result % 1 != 0) {
            result = result.toFixed(4);
        }
        operand1 = result;
        operation = value;
        topScreen.textContent = operand1 + " " + operation;
        bottomScreen.textContent = operand1;

    }
}

function clear(e) {
    overwrite = true;
    bottomScreen.textContent = '0';
    topScreen.textContent = '';
    operand1 = "";
    operand2 = "";
    operation = "";
}

function deleteValue() {
    if (bottomScreen.textContent.length > 0) {
        bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
    }
}

function evaluateExpression() {
    if(topScreen.textContent.indexOf('=') != -1){
        return;
    }

    operand2 = bottomScreen.textContent;

    if (operand1.length != 0 && operand2.length != 0 && operation.length != 0) {
        let result = operate(operation, Number(operand1), Number(operand2));
        if (result % 1 != 0) {
            result = result.toFixed(4);
        }
        topScreen.textContent += (" " + operand2 + " =");
        bottomScreen.textContent = result;
    }

}

/* Event listeners */
numberButtons.forEach(button => {
    button.addEventListener('click', enterValue);
});

operateButtons.forEach(button => {
    button.addEventListener('click', callOperation);
});

clearButton.addEventListener('click', clear);

deleteButton.addEventListener('click', deleteValue);

equalButton.addEventListener('click', evaluateExpression);

dotButton.addEventListener('click', () => {
    if (bottomScreen.textContent.indexOf('.') === -1) {
        bottomScreen.textContent += '.';
    }
});

function addDot() {
    if (bottomScreen.textContent.indexOf('.') === -1) {
        bottomScreen.textContent += '.';
    }
}

document.addEventListener('keydown', (e) => {
    let code = ".k" + e.keyCode;
    let key = document.querySelector(code);
    let keyClassList = Array.from(key.classList);

    if (keyClassList.includes('btn-num')) {
        enterValue(key);
    } else if (keyClassList.includes('btn-op')) {
        callOperation(key);
    } else if (key.id === 'btn-dot') {
        addDot();
    }  else if(key.id === 'btn-equal'){
        evaluateExpression();
    } else if(key.id === 'btn-clear'){
        clear();
    } else if(key.id === 'btn-delete'){
        deleteValue();
    }
});
