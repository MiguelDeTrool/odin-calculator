let screen = document.querySelector(".screen");
let lastButtonOp = false;
let lastNumber = "";
let lastOperator = "";
let currentNumber = "";

function backspace() {
    screen.textContent = screen.textContent.slice(0, -1);
}

function clearScreenAndMemory() {
    screen.textContent = "";
    lastNumber = "";
    lastOperator = "";
    currentNumber = "";
}

document.querySelector(".backspace").addEventListener("click", backspace);

document.querySelector(".AC").addEventListener("click", clearScreenAndMemory);

const numberButtons = document.querySelectorAll("button.number");

function handleNumber(number) {
    if (lastButtonOp === true) {
        lastNumber = screen.textContent;
        screen.textContent = "";
        lastButtonOp = false;
    }
    if (number == '.' && screen.textContent.includes(".")) {
        return;
    }
    screen.textContent += number;
    screen.textContent = screen.textContent.substring(0, 12);
}

numberButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        handleNumber(button.textContent);
    });
});

function operate(a, b, operator) { //Would rather have this in operatorDeclarations.js
    a = Number(a);
    b = Number(b);
    if (operator === '+') return sum(a, b);
    if (operator === '-') return subtract(a, b);
    if (operator === '*') return multiply(a, b);
    if (operator === '/') return divide(a, b);
}

function evaluate() {
    if (lastButtonOp == true) {
        return;
    }
    if (lastOperator == "/" && Number(screen.textContent) == 0) {
        clearScreenAndMemory();
        screen.textContent = "Can't divide by 0";
        return;
    }
    if (lastOperator != "") {
        currentNumber = Number(screen.textContent);
        let result = operate(lastNumber, currentNumber, lastOperator);
        result = roundAccurately(result, 5);
        screen.textContent = Math.min(result, 999999999999);
    }
}

const operatorButtons = document.querySelectorAll(".operator");

function handleOperator(operator) {
    evaluate();
    lastButtonOp = true;
    lastOperator = operator;
}

operatorButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
        handleOperator(e.target.textContent);
    });
});

const evaluateButton = document.querySelector(".evaluate");

evaluateButton.addEventListener("click", function () {
    evaluate();
    lastOperator = "";
});

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}