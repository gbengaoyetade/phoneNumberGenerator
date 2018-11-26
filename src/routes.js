const router = require('express').Router();
const { NumbersController } = require('./controllers');
const { validateGenerateNumbers } = require('./middleware');

router.get('/numbers', NumbersController.getNumbers);
router.post(
  '/numbers/generate',
  validateGenerateNumbers,
  NumbersController.generateNumbers,
);

module.exports = router;
