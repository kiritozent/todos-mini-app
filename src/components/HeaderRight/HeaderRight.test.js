import React from 'react';
import { shallow } from 'enzyme';
import HeaderRight from './HeaderRight';

describe('HeaderRight', () => {
  it('render without crashing passed', () => {
    const testCase = shallow(<HeaderRight />);
    expect(testCase).toMatchSnapshot();
  });
});
