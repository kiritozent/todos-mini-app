import React from 'react';
import { shallow } from 'enzyme';
import UserItem from './UserItem';

describe('UserItem', () => {
  it('render without crashing passed', () => {
    const testCase = shallow(<UserItem />);
    expect(testCase).toMatchSnapshot();
  });
});
