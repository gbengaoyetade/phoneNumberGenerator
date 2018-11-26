const fs = require('fs');
const { MAX_COUNT } = require('./constants');

const FILE_PATH =  process.env.NODE_ENV === 'test' ? 'testDatabase.txt' : 'database.txt'; // eslint-disable-line
const writeToFile = (numbers) => {
  fs.appendFile(FILE_PATH, numbers, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
};

const generateNumbers = (count) => {
  let itr = 0;
  const numbers = [];
  while (itr < count) {
    const number = Math.floor(Math.random() * 9000000000000) + itr * 10;
    const tenDigits = number.toString().slice(0, 9);
    numbers.push(`0${tenDigits}`);
    itr += 1;
  }
  writeToFile(numbers);
  return numbers;
};

const compareNumbers = (firstNumber, secondNumber) => {
  const compare = Number(firstNumber) - Number(secondNumber);
  return compare;
};

module.exports = {
  generateNumbers,
  writeToFile,
  compareNumbers,
  FILE_PATH,
  MAX_COUNT,
};
