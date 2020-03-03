import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('render without crashing passed', () => {
    const testCase = shallow(<Spinner />);
    expect(testCase).toMatchSnapshot();
  });
});
