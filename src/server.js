const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to phone number generator api' });
});

app.use('/api/v1', routes);

const port = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(port, (error) => {
    if (!error) {
      console.log(`Listening on port ${port}`);
    }
  });
}
