const fs = require('fs');
const { FILE_PATH } = require('../lib');

describe('NumbersController', () => {
  describe('generate numbers', () => {
    it('should send error message when count field is not supplied', (done) => {
      request.post('/api/v1/numbers/generate').end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('count field is required');
        done();
      });
    });
    it('should send error when count is not an integer', (done) => {
      request
        .post('/api/v1/numbers/generate')
        .send({ count: 'yes' })
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error).toBe('Expects an integer value for count');
          done();
        });
    });

    it('should return number equal to count when count is less than MAX_COUNT', (done) => {
      request
        .post('/api/v1/numbers/generate')
        .send({ count: '1000' })
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe('1000 numbers generated');
          expect(res.body.numbers.length).toBe(1000);
          done();
        });
    });
  });

  describe('Get numbers', () => {
    it('should return numbers and statistics', (done) => {
      request.get('/api/v1/numbers').end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1000);
        expect(res.body.max).toBeTruthy();
        expect(res.body.min).toBeTruthy();
        expect(res.body).toHaveProperty('numbers');
        done();
      });
    });

    it('should return stats only when statsOnly is set in query', (done) => {
      request.get('/api/v1/numbers?statsOnly=yes').end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1000);
        expect(res.body.max).toBeTruthy();
        expect(res.body.min).toBeTruthy();
        expect(res.body.numbers).toBeFalsy();
        done();
      });
    });

    it('should return length of 0 when file is empty', (done) => {
      fs.writeFile(FILE_PATH, '', (error) => {
        if (!error) {
          request.get('/api/v1/numbers?').end((err, res) => {
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(0);
            done();
          });
        } else {
          throw new Error(error);
        }
      });
    });
    it('should send error message when database file does not exist', (done) => {
      fs.unlinkSync(FILE_PATH);
      request.get('/api/v1/numbers?statsOnly=yes').end((err, res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body.error).toBe('There was an error reading database file');
        done();
      });
    });
  });
});
