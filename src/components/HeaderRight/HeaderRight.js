import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const HeaderRight = props => {
  const { userOnClick, searchText, fetching, setSearchText, isMobile } = props;

  return (
    <div className="headerRight">
      <Input
        value={searchText}
        placeholder="Search Todos..."
        onChange={e => setSearchText(e.target.value)}
        prefix={<SearchOutlined />}
        allowClear
        disabled={fetching}
      />
      <UserOutlined
        className="userIcon"
        style={{
          marginRight: !isMobile && 16,
        }}
        onClick={() => userOnClick()}
      />
    </div>
  );
};

HeaderRight.propTypes = {
  userOnClick: PropTypes.func,
  searchText: PropTypes.string,
  fetching: PropTypes.bool,
  setSearchText: PropTypes.func,
  isMobile: PropTypes.bool,
};

HeaderRight.defaultProps = {
  userOnClick: () => {},
  searchText: '',
  fetching: false,
  setSearchText: () => {},
  isMobile: false,
};

export default HeaderRight;
