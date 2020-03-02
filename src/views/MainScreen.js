import React, { useState, useEffect, useContext } from 'react';
import { Layout, Modal, Typography } from 'antd';
import { StoreContext } from '../store';
import UserItem from '../components/UserItem/UserItem';
import TodosTable from '../components/TodosTable/TodosTable';
import UserList from '../components/UserList/UserList';
import './MainScreen.css';

const { Header, Content } = Layout;

export default function MainScreen() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { state, actions } = useContext(StoreContext);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(user);

  useEffect(() => {
    actions.getUsersRequest();
    if (selectedUser) {
      actions.getTodosRequest({ userId: selectedUser.id });
    }
  }, []);

  useEffect(() => {
    if (state.getTodos.payload) {
      setSelectedUser(localStorage.getItem('user'));
    }
  }, [state.getTodos.payload]);

  function onSelectUser(index) {
    setSelectedUserIndex(index);

    actions.getTodosRequest({ userId: state.userList[index].id });
  }

  return (
    <Layout className="layout">
      <Header
        className="headerContainer"
        style={{ padding: 0, paddingLeft: 20, paddingRight: 20 }}
      >
        <div className="content">
          <Typography.Text className="appNameText">
            Todos Mini App
          </Typography.Text>
        </div>
      </Header>
      <Layout className="layoutContent">
        <Content className="content">
          <TodosTable
            dataSource={state.todoList}
            loading={state.getTodos.fetching}
          />
        </Content>
      </Layout>
      {/* <Footer>Footer</Footer> */}
      <Modal
        centered
        visible={!selectedUser}
        footer={null}
        closable={false}
        maskStyle={{ backgroundColor: 'rgba(0,0,0, 0.8)' }}
      >
        <Typography.Title>Select User</Typography.Title>
        <div className="userListContainer">
          <UserList
            dataSource={state.userList}
            getUsers={state.getUsers}
            getUsersRequest={() => actions.getUsersRequest()}
            renderItem={(item, index) => (
              <UserItem
                onClick={() => onSelectUser(index)}
                item={item}
                loading={selectedUserIndex === index && state.getTodos.fetching}
              />
            )}
          />
        </div>
      </Modal>
    </Layout>
  );
}
