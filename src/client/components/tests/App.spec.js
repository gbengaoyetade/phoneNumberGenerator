import React from 'react';
import { mount } from 'enzyme';
import * as axios from 'axios';
import App from '../App';

jest.mock('axios');
axios.get.mockImplementation(() => Promise.resolve({ data: { numbers: ['234'] } }));
const wrapper = mount(<App />);
describe('App', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set state when handleChange is called', () => {
    const event = { target: { value: '34' }, preventDefault: jest.fn() };
    wrapper.instance().handleChange(event);
    const state = wrapper.state();
    expect(state.numberInput).toBe(event.target.value);
  });

  it('should set state when handleSubmit is called', () => {
    const event = { preventDefault: jest.fn() };
    wrapper.instance().handleSubmit(event);
    wrapper.setState({ numberInput: '90' });
    const state = wrapper.state();
    expect(state.numbersFetched).toBe(false);
  });
});
