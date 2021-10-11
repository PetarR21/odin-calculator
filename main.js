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
            return divide(a, b);
    }
}

function enterValue(e) {

    if (bottomScreen.textContent.length === 16 && overwrite === false) {
        return;
    }

    let value = e.target.textContent;

    if (overwrite === true) {
        bottomScreen.textContent = value;
        overwrite = false;
    } else {
        bottomScreen.textContent += value;
    }

}


/*!!!!!!!*/
function callOperation(e) {

    overwrite = true;

    if (operation.length != 0 && operand2.length === 0) {
        let result = operate(operation,Number(operand1),Number(bottomScreen.textContent));
        console.log(operand1);
        console.log(operation)
        console.log(result);
        topScreen.textContent = result + " " + operation;
        bottomScreen.textContent = result;
    } else {
        operand1 = bottomScreen.textContent;
        operation = e.target.textContent;
        topScreen.textContent = bottomScreen.textContent + " " + operation;
    }
}

function clear(e) {
    overwrite = true;
    bottomScreen.textContent = '0';
    topScreen.textContent = '';
}

function deleteValue() {
    if (bottomScreen.textContent.length > 0) {
        bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
    }
}

function evaluateExpression() {
    operand2 = bottomScreen.textContent;

    if (operand1.length != 0 && operand2.length != 0 && operation.length != 0) {
        topScreen.textContent += (" " + operand2);
        bottomScreen.textContent = operate(operation, Number(operand1), Number(operand2));
        operand2 = "";
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
})

topDisplay.addEventListener('overflow', () => {
    console.log("overflow");
}, false);

bottomDisplay.addEventListener('overflow', () => {
    console.log("overflow");
}, false);


