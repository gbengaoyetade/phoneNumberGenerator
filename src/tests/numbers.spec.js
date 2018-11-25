describe('NumbersController', () => {
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
