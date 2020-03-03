import React from 'react';
import { shallow } from 'enzyme';
import TodosItem from './TodosItem';

describe('TodosItem', () => {
  it('render without crashing passed', () => {
    const testCase = shallow(<TodosItem />);
    expect(testCase).toMatchSnapshot();
  });
});
