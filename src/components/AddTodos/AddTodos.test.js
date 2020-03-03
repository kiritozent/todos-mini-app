import React from 'react';
import { shallow } from 'enzyme';
import AddTodos from './AddTodos';

describe('AddTodos', () => {
  it('render without crashing passed', () => {
    const testCase = shallow(<AddTodos />);
    expect(testCase).toMatchSnapshot();
  });
});
