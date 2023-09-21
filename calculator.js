// Variables to store calculator state
let firstNumber = '';
let operator = '';
let secondNumber = '';
let currentInput = "0";
let isResultDisplayed = false;


const screen = document.querySelector('.screen');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const pointBtn = document.getElementById('pointBtn');
const equalsBtn = document.getElementById('equalsBtn');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');

function updateDisplay() {
    screen.textContent = currentInput;
}


function clearCalculator() {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    currentInput = '0';
    isResultDisplayed = false;
    updateDisplay();
}


function deleteLastCharacter() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}


function handleDigitClick(digit) {
    if (currentInput === '0' || isResultDisplayed) {
        currentInput = digit;
        isResultDisplayed = false;
    } else {
        currentInput += digit;
    }
    updateDisplay();
}


function handleOperatorClick(op) {
    if (firstNumber === '') {
        firstNumber = currentInput;
        operator = op;
        currentInput = '';
    } else if (operator && currentInput !== '') {
        secondNumber = currentInput;
        firstNumber = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
        operator = op;
        currentInput = '';
    } else {
        operator = op;
    }
    updateDisplay();
}

function handleDecimalClick() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}


function handleEqualsClick() {
    if (operator && currentInput !== '') {
        secondNumber = currentInput;
        currentInput = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
        operator = '';
        isResultDisplayed = true;
    }
    updateDisplay();
}


function operate(op, a, b) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '÷':
            if (b === 0) {
                clearCalculator();
                return 'Error';
            }
            return a / b;
        default:
            return b;
    }
}


clearBtn.addEventListener('click', clearCalculator);
deleteBtn.addEventListener('click', deleteLastCharacter);
pointBtn.addEventListener('click', handleDecimalClick);
equalsBtn.addEventListener('click', handleEqualsClick);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleDigitClick(button.textContent);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleOperatorClick(button.textContent);
    });
});

// Initialize the display
updateDisplay();
