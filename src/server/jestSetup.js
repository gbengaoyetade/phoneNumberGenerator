const supertest = require('supertest');
const app = require('./server');

global.request = supertest(app);
