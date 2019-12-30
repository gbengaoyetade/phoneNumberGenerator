import { Selector } from 'testcafe';

global.fixture('Phone number generator').page('http://localhost:3000');

test('Number Input', async (t) => {
  const totalNumber = Number(Selector('.max').innerText);
  const inputNumber = '1';
  const input = Selector('.input');
  await t
    .typeText(input, inputNumber)
    .click('.btn')
    .expect(Number(Selector('.max').innerText))
    .eql(totalNumber + Number(inputNumber));
});
