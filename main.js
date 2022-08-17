const currentNumber = document.querySelector('.current-number p');
const previousNumber = document.querySelector('.previous-number p');
const mathSign = document.querySelector('.math-sign p');
const numbersButtons = document.querySelectorAll('.number');
const operatorsButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const calculatorHistory = document.querySelector('.history');
const historyBtn = document.querySelector('.history-btn');
let result = '';


function displayNumbers () {
    if(this.textContent === '.' && currentNumber.innerHTML.includes('.')) return;
    if(this.textContent === '.' && currentNumber.innerHTML === '') return currentNumber.innerHTML = '0.'

    currentNumber.innerHTML += this.textContent;
}

function clearScreen(){
    result = '';
    currentNumber.innerHTML = '';
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';
}

function operate () {
    if(currentNumber.innerHTML === '' && this.textContent ==='-'){
        currentNumber.innerHTML = '-';
        return;
    }
    

     else if (currentNumber.innerHTML === '') {
        return;
     }

     if(mathSign.innerHTML !== '') {
         showResult();
     }
     previousNumber.innerHTML = currentNumber.innerHTML;
     mathSign.innerHTML = this.textContent;
     currentNumber.innerHTML ='';
}

function showResult () {
    if (previousNumber.innerHTML !== '' &&
        mathSign.innerHTML !== '' &&
        currentNumber.innerHTML === ''){
            currentNumber.innerHTML = previousNumber.textContent;
            previousNumber.innerHTML = '';
            mathSign.innerHTML = '';
        }
            
    if(previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return;

    let a = Number(currentNumber.innerHTML);
    let b = Number(previousNumber.innerHTML);
    let operator = mathSign.innerHTML;


    switch(operator) {
        case '+':
        result = a + b;
        break;
        case '-':
        result = b - a;
        break;
        case '*':
        result = a * b;
        break;
        case ':':
        result = b / a;
        break;
        case 'x2':
        result = b ** a;
        break;
    }

    addToHistory();
    historyBtn.classList.add('active');
    currentNumber.innerHTML = result;
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';

}

function addToHistory () {
    const newHistoryItem = document.createElement('li');
    newHistoryItem.innerHTML = `${previousNumber.innerHTML} ${mathSign.innerHTML} ${currentNumber.innerHTML} = ${result}`
    newHistoryItem.classList.add('history-item');
    calculatorHistory.appendChild(newHistoryItem);
}

function clearHistory () {
    calculatorHistory.textContent = '';
    if(calculatorHistory.textContent === '') {
        historyBtn.classList.remove('active');
    }
}


numbersButtons.forEach((button) => {
    button.addEventListener('click', displayNumbers);
});

clearButton.addEventListener('click', clearScreen);
operatorsButtons.forEach((button) => button.addEventListener('click', operate));
equalsButton.addEventListener('click', showResult);
historyBtn.addEventListener('click', clearHistory);