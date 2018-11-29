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
  // Add a trailing comma so numbers don't get mumbled up when appending to file
  numbers[count - 1] = `${numbers[count - 1]},`;
  writeToFile(numbers);
  return numbers;
};

const formatGetNumbersResponse = (numbersArray, statsOnly) => {
  let { length } = numbersArray;
  // This conditional was added for when the file is empty
  if (numbersArray[0] === '') {
    length = 0;
  } else {
    length = numbersArray.length; // eslint-disable-line
  }
  const responseObject = {
    total: length,
    max: numbersArray[length - 1] || '',
    min: numbersArray[0],
    numbers: numbersArray,
  };
  if (statsOnly) {
    delete responseObject.numbers;
  }
  return responseObject;
};
module.exports = {
  generateNumbers,
  writeToFile,
  formatGetNumbersResponse,
  FILE_PATH,
  MAX_COUNT,
};
