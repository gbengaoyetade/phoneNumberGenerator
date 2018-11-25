const validateGenerateNumbers = (req, res, next) => {
  const { count } = req.body;
  if (!count) {
    res.status(400).send({ error: 'count field is required' });
  } else if (!Number.isInteger(Number(count))) {
    res.status(400).send({ error: 'Expects an integer value for count' });
  } else {
    next();
  }
};

module.exports = { validateGenerateNumbers };
