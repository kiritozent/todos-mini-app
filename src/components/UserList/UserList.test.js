import React from 'react';
import { shallow } from 'enzyme';
import UserList from './UserList';

describe('UserList', () => {
  it('render without crashing passed', () => {
    const testCase = shallow(<UserList />);
    expect(testCase).toMatchSnapshot();
  });
});
