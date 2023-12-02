const fs = require('node:fs');

const file = fs.readFileSync('./index.txt', 'utf-8');

const linesArr = file.split('\n');

const stringsAndNumbers = {
  nine: "9",
  eight: "8",
  seven: "7",
  six: "6",
  five: "5",
  four: "4",
  three: "3",
  two: "2",
  one: "1",
};

function filterByNumber(item) {
  const numbers = []

  item.split('').forEach(char => /[0-9]/.test(char) && numbers.push(char))

  return numbers;
}

function filterByNumberAndString(item) {
  const numbers = [];

  const keys = Object.keys(stringsAndNumbers);

  let currentWord = "";

  for (let i = 0; i < item.length; i++) {
    currentWord += item[i]
    for (let j = 0; j < keys.length; j++) {
      keys.forEach((key) => {
        const regex = new RegExp(key, "g");

        currentWord = currentWord.replace(regex, stringsAndNumbers[key]);
      });
    }
  }

  currentWord.split('').forEach(char => /[0-9]/.test(char) && numbers.push(char))

  return numbers;
}

function getNumbersArray(filterStringFunc) {
  return linesArr.map(item => {
    const numbers = filterStringFunc(item);

    if (numbers.length > 1) {
      return numbers[0] + numbers[numbers.length - 1];
    }

    return numbers[0] + numbers[0];
  });
}

// Part 1

function calculateSumBasic() {
  let numbersSum = 0;

  getNumbersArray(filterByNumber).forEach(item => {
    if (typeof item === "string") {
      numbersSum += parseInt(item);
    }
  });

  return numbersSum;
}

console.log('Part 1 - answer:', calculateSumBasic());

// Part 2

function calculateSumAdvanced() {
  let numbersSum = 0;

  getNumbersArray(filterByNumberAndString).forEach(item => {
    if (typeof item === "string") {
      numbersSum += parseInt(item);
    }
  });

  return numbersSum;
}

console.log('Part 2 - answer:', calculateSumAdvanced());
