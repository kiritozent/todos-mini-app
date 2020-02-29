import React from 'react';
import PropTypes from 'prop-types';
import { List, ConfigProvider, Button } from 'antd';

const UserList = props => {
  const { dataSource, renderItem, getUsers, getUsersRequest } = props;

  function renderErrorEmpty() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button
          type="primary"
          onClick={getUsersRequest}
          loading={getUsersRequest.fetching}
        >
          Retry
        </Button>
        <p>Data Not Found</p>
      </div>
    );
  }

  return (
    <ConfigProvider renderEmpty={getUsers.error && renderErrorEmpty}>
      <List
        dataSource={dataSource}
        loading={getUsers.fetching}
        renderItem={renderItem}
      />
    </ConfigProvider>
  );
};

UserList.propTypes = {
  dataSource: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  getUsers: PropTypes.object.isRequired,
  getUsersRequest: PropTypes.func.isRequired,
};

export default UserList;