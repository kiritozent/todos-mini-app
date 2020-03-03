import React from 'react';
import { shallow } from 'enzyme';
import HeaderLeft from './HeaderLeft';

describe('HeaderLeft', () => {
  it('render without crashing passed', () => {
    const testCase = shallow(<HeaderLeft />);
    expect(testCase).toMatchSnapshot();
  });
});
