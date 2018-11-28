import React from 'react';
import { shallow } from 'enzyme';
import * as axios from 'axios';
import App from '../App';

jest.mock('axios');
axios.get.mockImplementation(() => Promise.resolve({ data: {} }));
describe('App', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
