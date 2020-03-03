import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography } from 'antd';
import UserList from '../UserList/UserList';
import UserItem from '../UserItem/UserItem';
import { DEFAULT_REDUCERS } from '../../data/const';

const UserListModal = props => {
  const {
    user,
    dataSource,
    getUsers,
    getTodos,
    getUsersRequest,
    selectedUserIndex,
    onSelectUser,
  } = props;

  return (
    <Modal
      centered
      visible={!user}
      footer={null}
      closable={false}
      maskStyle={{ backgroundColor: 'rgba(0,0,0, 0.8)' }}
    >
      <Typography.Title>Select User</Typography.Title>
      <div className="userListContainer">
        <UserList
          dataSource={dataSource}
          getUsers={getUsers}
          getTodos={getTodos}
          getUsersRequest={() => getUsersRequest()}
          renderItem={(item, index) => (
            <UserItem
              onClick={() => onSelectUser(index)}
              item={item}
              loading={selectedUserIndex === index && getTodos.fetching}
            />
          )}
        />
      </div>
    </Modal>
  );
};

UserListModal.propTypes = {
  user: PropTypes.object,
  dataSource: PropTypes.array,
  getUsers: PropTypes.object,
  getTodos: PropTypes.object,
  getUsersRequest: PropTypes.func,
  selectedUserIndex: PropTypes.number,
  onSelectUser: PropTypes.func,
};

UserListModal.defaultProps = {
  user: null,
  dataSource: [],
  getUsers: DEFAULT_REDUCERS,
  getTodos: DEFAULT_REDUCERS,
  getUsersRequest: () => {},
  selectedUserIndex: null,
  onSelectUser: () => {},
};

export default UserListModal;
