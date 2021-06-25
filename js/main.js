function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}



const button = document.querySelector(".dark-button");
let lightModeOn = true;
const toggleTheme = function () {
  const elements = document.querySelectorAll(
    "body"
  );
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.classList.toggle("dark-mode");

  }
  if (lightModeOn) {
    lightModeOn = false;
  } else {
    lightModeOn = true;
  }

};


button ? button.addEventListener("click", toggleTheme) : null;

const checkTheme = function () {


  const date = new Date();
  console.log(date);
  if (date.getSeconds() > 7 && date.getSeconds() < 17) {
    if (lightModeOn === false) {
      console.log("hallo")
      toggleTheme();
    }

  } else {
    console.log("todarkmode")

    if (lightModeOn === true) {
      console.log("halo1")
      toggleTheme();
    }


  }


}


setInterval(function () {
  console.log("elke seconde uitgevoerd!");

}, 1000);

setInterval(checkTheme, 1000);





/*****  rekenmachine *****/
const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)
  if (operator === 'add') return firstNum + secondNum
  if (operator === 'subtract') return firstNum - secondNum
  if (operator === 'multiply') return firstNum * secondNum
  if (operator === 'divide') return firstNum / secondNum
}

const getKeyType = key => {
  const { action } = key.dataset
  if (!action) return 'number'
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) return 'operator'
  // For everything else, return the action
  return action
}

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent
  const keyType = getKeyType(key)
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = state

  if (keyType === 'number') {
    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
      ? keyContent
      : displayedNum + keyContent
  }

  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.'
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
    return displayedNum
  }

  if (keyType === 'operator') {
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum
  }

  if (keyType === 'clear') return 0

  if (keyType === 'calculate') {
    return firstValue
      ? previousKeyType === 'calculate'
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum
  }
}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
  const keyType = getKeyType(key)
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = calculator.dataset

  calculator.dataset.previousKeyType = keyType

  if (keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action
    calculator.dataset.firstValue = firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculatedValue
      : displayedNum
  }

  if (keyType === 'calculate') {
    calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
      ? modValue
      : displayedNum
  }

  if (keyType === 'clear' && key.textContent === 'AC') {
    calculator.dataset.firstValue = ''
    calculator.dataset.modValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.previousKeyType = ''
  }
}

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key)
  Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

  if (keyType === 'operator') key.classList.add('is-depressed')
  if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
  if (keyType !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
  }
}

const calculator = document.querySelector('.calculator')
if (calculator) {
  const display = calculator.querySelector('.calculator__display')
  const keys = calculator.querySelector('.calculator__keys')

  keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return;
    const key = e.target;
    const displayedNum = display.textContent;
    const resultString = createResultString(key, displayedNum, calculator.dataset);

    display.textContent = resultString;
    updateCalculatorState(key, calculator, resultString, displayedNum);
    updateVisualState(key, calculator);
  })
}

let draggingElement = null;
let draggingParent = null;
let targetElement = null;

window.startDragging = (event) => {
  draggingElement = event.target;
  draggingParent = event.target.parentElement;
  draggingElement.setAttribute('id', 'dragging');
}

window.stopDragging = (event) => {
  draggingElement = null;
  draggingParent = null;
}

window.onDrop = (event) => {
  const target = event.target.textContent;
  const current = draggingElement.textContent;

  draggingElement.textContent = target;
  event.target.textContent = current;
}

window.onDragOver = (event) => {
  event.preventDefault();
}




/*****  rekengame *****/
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let inputField = document.getElementById("in");
let form = document.querySelector("form");
let p = document.getElementById("p");
let q = document.getElementById("q");
let op = document.getElementById("op");
let response = document.getElementById("response"); 
let results = document.getElementById("results");
let category = document.getElementById("category");


let max = 20;
let num1;
let num2;
let answer;

let startTime;
let endTime;

let count; 
let times = [];


inputField.className = "hide";
stopButton.className = "hide";


startButton.onclick = function() {
    
    count = 0;
    times = [];
    results.innerHTML = ""; 
    category.innerHTML = ""; 
    refreshNums();
    inputField.className = ""; 
    stopButton.className = ""; 
    startButton.className = "hide"; 
    inputField.focus();
};

form.onsubmit = function(e) {
    
    e.preventDefault();
    getAnswer();
};

stopButton.onclick = function() {
    let resultString;
    let categoryString;
    if (times.length > 0) {
       
        let total = 0;
        for (let i = 0; i < times.length; i++) {
            total += times[i];
        }
        let mean = (total / times.length) / 1000;
        resultString = "gemiddelde tijd: " + mean.toPrecision(4) + " sec";
        categoryString = getCategory(mean);
    } else {
        resultString = "nog geen antwoord ingevuld ! druk start om te beginnen en vul een antwoord in het witte balkje";
        categoryString = "";
    }

    inputField.className = "hide"; 
    stopButton.className = "hide"; 
    startButton.className = ""; 

   
    p.innerHTML = "";
    q.innerHTML = "";
    op.innerHTML = "";
    response.innerHTML = ""; 
    results.innerHTML = resultString;
    category.innerHTML = categoryString;
};


let refreshNums = function() {
   
    num1 = Math.floor((Math.random() * max) + 1);
    num2 = Math.floor((Math.random() * max) + 1);
   p.innerHTML = num1;
    op.innerHTML = "+";
    q.innerHTML = num2;
  startTime = new Date();
};


let getAnswer = function() {
    let correct = num1 + num2;
   
    answer = parseInt(inputField.value);

    if (answer === correct) {
       
        endTime = new Date();
        times[count++] = endTime.getTime() - startTime.getTime();
        
        response.innerHTML = "";
        refreshNums();
    } else {
        response.innerHTML = "probeer opnieuw";
    }
    
    inputField.value = "";
};

let getCategory = function(mean) {
    let c;
    if (mean < 2) {
        c = "goed gedaan!";
    } else if (mean < 4) {
        c = "ga zo door!";
    } else if (mean < 7) {
        c = "top!";
    } else if (mean < 10) {
        c = "super!";
    } else {
        c = "super gedaan!";
    }
    return c;
};
