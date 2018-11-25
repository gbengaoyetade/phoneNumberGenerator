const { generateNumbers, MAX_COUNT } = require('../lib');

class NumbersController {
  static async generateNumbers(req, res) {
    const { count } = req.body;
    if (!count) {
      res.status(400).send({ error: 'count field is required' });
    } else if (!Number.isInteger(Number(count))) {
      res.status(400).send({ error: 'Expects an integer value for count' });
    } else {
      const numbersLength = count < MAX_COUNT ? count : MAX_COUNT;
      const numbers = await generateNumbers(numbersLength);
      res.send({
        message: `${numbersLength} ${
          numbersLength > 1 ? 'numbers' : 'number'
        } generated`,
        numbers,
      });
    }
  }
}
module.exports = NumbersController;
