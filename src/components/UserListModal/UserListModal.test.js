import React from 'react';
import { shallow } from 'enzyme';
import UserListModal from './UserListModal';

describe('UserListModal', () => {
  it('render without crashing passed', () => {
    const testCase = shallow(<UserListModal />);
    expect(testCase).toMatchSnapshot();
  });
});
