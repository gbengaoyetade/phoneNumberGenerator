const fs = require('fs');
const {
  generateNumbers,
  compareNumbers,
  MAX_COUNT,
  FILE_PATH,
} = require('../lib');

class NumbersController {
  static async generateNumbers(req, res) {
    const { count } = req.body;
    const numbersLength = count < MAX_COUNT ? count : MAX_COUNT;
    const numbers = await generateNumbers(numbersLength);
    res.send({
      message: `${numbersLength} ${
        numbersLength > 1 ? 'numbers' : 'number'
      } generated`,
      numbers,
    });
  }

  static async getNumbers(req, res) {
    const { statsOnly } = req.query;
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
      if (err) {
        res
          .status(500)
          .send({ error: 'There was an error reading database file' });
      } else {
        const numbersArray = data.split(',').sort(compareNumbers);
        let length;
        // This conditional was added for when the file is empty
        if (numbersArray[0] === '') {
          length = 0;
        } else {
          length = numbersArray.length; // eslint-disable-line
        }
        const responseObject = {
          length,
          max: numbersArray[length - 1] || '',
          min: numbersArray[0],
          numbers: numbersArray,
        };
        if (statsOnly) {
          delete responseObject.numbers;
        }
        res.send(responseObject);
      }
    });
  }
}
module.exports = NumbersController;
