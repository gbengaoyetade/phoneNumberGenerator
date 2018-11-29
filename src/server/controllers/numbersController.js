const fs = require('fs');
const {
  generateNumbers,
  formatGetNumbersResponse,
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
    const readStream = fs.createReadStream(FILE_PATH);
    let phoneNumbers = '';
    readStream.on('error', () => {
      res
        .status(500)
        .send({ error: 'There was an error reading database file' });
    });
    readStream
      .on('data', (chunk) => {
        phoneNumbers += chunk;
      })
      .on('end', () => {
        // remove trailing comma in the string so split does not
        // return an empty value when called
        const modifiedNumbers = phoneNumbers.slice(0, -1);
        const numbersArray = modifiedNumbers.split(',').sort();
        const responseObject = formatGetNumbersResponse(
          numbersArray,
          statsOnly,
        );
        res.send(responseObject);
      });
  }
}
module.exports = NumbersController;
