const fs = require('fs');
const { MAX_COUNT } = require('./constants');

const writeToFile = (numbers) => {
  const filePath = process.env.NODE_ENV === 'test' ? 'testDatabase.txt' : 'database.txt';
  fs.appendFile(filePath, numbers, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
};
const generateNumbers = async (count) => {
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

module.exports = { generateNumbers, writeToFile, MAX_COUNT };
