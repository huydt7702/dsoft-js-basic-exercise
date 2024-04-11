const inputX = document.querySelector('.input-x');
const inputY = document.querySelector('.input-y');
const precisionInput = document.querySelector('.precision-input');
const addButton = document.querySelector('.add-button');
const subtractButton = document.querySelector('.subtract-button');
const multiplyButton = document.querySelector('.multiply-button');
const divideButton = document.querySelector('.divide-button');
const resultDiv = document.querySelector('.result');

function formatNumber(number) {
  const numberFormatOptions = {
    style: 'decimal',
  };
  return new Intl.NumberFormat('en-US', numberFormatOptions).format(number);
}

function addLargeNumbers(num1, num2) {
  let carry = 0;
  let result = '';
  let maxLength = Math.max(num1.length, num2.length);

  for (let i = 0; i < maxLength; i++) {
    const digit1 = i < num1.length ? parseInt(num1[num1.length - 1 - i]) : 0;
    const digit2 = i < num2.length ? parseInt(num2[num2.length - 1 - i]) : 0;

    const sum = digit1 + digit2 + carry;
    carry = Math.floor(sum / 10);
    result = (sum % 10) + result;
  }

  if (carry > 0) {
    result = carry + result;
  }

  return result;
}

function subtractLargeNumbers(num1, num2) {
  let borrow = 0;
  let result = '';

  // Determine which number is larger
  let isNegative = false;
  if (num1.length < num2.length || (num1.length === num2.length && num1 < num2)) {
    [num1, num2] = [num2, num1]; // Swap num1 and num2
    isNegative = true;
  }

  for (let i = 0; i < num1.length; i++) {
    const digit1 = parseInt(num1[num1.length - 1 - i]);
    const digit2 = i < num2.length ? parseInt(num2[num2.length - 1 - i]) : 0;

    let diff = digit1 - digit2 - borrow;

    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }

    result = diff + result;
  }

  // Remove leading zeros
  result = result.replace(/^0+/, '');

  // Add negative sign if needed
  if (isNegative) {
    result = '-' + result;
  }

  return result;
}

function multiplyLargeNumbers(num1, num2) {
  let result = '0';

  for (let i = num1.length - 1; i >= 0; i--) {
    let tempResult = '';
    let carry = 0;

    for (let j = num2.length - 1; j >= 0; j--) {
      const product = parseInt(num1[i]) * parseInt(num2[j]) + carry;
      carry = Math.floor(product / 10);
      tempResult = (product % 10) + tempResult;
    }

    if (carry > 0) {
      tempResult = carry + tempResult;
    }

    tempResult += '0'.repeat(num1.length - 1 - i);
    result = addLargeNumbers(result, tempResult);
  }

  // Remove leading zeros
  result = result.replace(/^0+/, '');
  return result;
}

function divideLargeNumbers(dividend, divisor) {
  if (parseInt(divisor) === 0) {
    resultDiv.innerText = 'Division by zero';
    throw new Error('Division by zero');
  }

  if (parseInt(dividend) === 0 || parseInt(dividend) < parseInt(divisor)) {
    return '0';
  }

  let quotient = '';
  let remainder = '0';

  for (let i = 0; i < dividend.length; i++) {
    remainder += dividend[i];
    let count = 0;

    while (parseInt(remainder) >= parseInt(divisor)) {
      remainder = subtractLargeNumbers(remainder, divisor);
      count++;
    }

    quotient += count;
  }

  // Remove leading zeros
  quotient = quotient.replace(/^0+/, '');
  return quotient;
}

function calculate(x, y, operation) {
  switch (operation) {
    case '+':
      return addLargeNumbers(x, y);
    case '-':
      return subtractLargeNumbers(x, y);
    case '*':
      return multiplyLargeNumbers(x, y);
    case '/':
      return divideLargeNumbers(x, y);
    default:
      resultDiv.textContent = 'Invalid operation';
      return;
  }
}

function handleCalculate(operation, e) {
  e.preventDefault();
  const inputXValue = inputX.value.trim();
  const inputYValue = inputY.value.trim();

  if (isNaN(inputXValue) || isNaN(inputYValue)) {
    resultDiv.innerText = 'Invalid calculation!!!';
    throw new Error('Invalid calculation!!!');
  }

  const result = calculate(inputXValue, inputYValue, operation);
  resultDiv.innerText = formatNumber(result);
}

addButton.addEventListener('click', (e) => handleCalculate('+', e));
subtractButton.addEventListener('click', (e) => handleCalculate('-', e));
multiplyButton.addEventListener('click', (e) => handleCalculate('*', e));
divideButton.addEventListener('click', (e) => handleCalculate('/', e));
