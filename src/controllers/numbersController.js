const { generateNumbers, MAX_COUNT } = require('../lib');

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
}
module.exports = NumbersController;
