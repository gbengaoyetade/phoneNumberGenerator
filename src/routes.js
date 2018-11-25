const router = require('express').Router();
const { NumbersController } = require('./controllers');

router.get('/numbers', () => {});
router.post('/numbers/generate', NumbersController.generateNumbers);

module.exports = router;
