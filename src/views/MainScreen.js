import React, { useState, useEffect, useContext } from 'react';
import { Layout, Modal, List, Typography, Spin } from 'antd';
import { StoreContext } from '../store';
import UserItem from '../components/UserItem/UserItem';
import TodosTable from '../components/TodosTable/TodosTable';
import UserList from '../components/UserList/UserList';
import './MainScreen.css';

const { Header, Content } = Layout;

export default function MainScreen() {
  const { state, actions } = useContext(StoreContext);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [selectedUserTodos, setSelectedUserTodos] = useState(null);

  useEffect(() => {
    actions.getUsersRequest();
  }, []);

  useEffect(() => {
    if (state.todos.payload) {
      setSelectedUserTodos(state.todoList);
    }
  }, [state.todos.payload]);

  function onSelectUser(index) {
    setSelectedUserIndex(index);

    actions.getTodosRequest({ userId: state.userList[index].id });
  }

  return (
    <Layout className="layout">
      <Header>
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
            loading={state.todos.fetching}
            onClick={item => console.log(item)}
          />
        </Content>
      </Layout>
      {/* <Footer>Footer</Footer> */}
      <Modal
        centered
        visible={!Array.isArray(selectedUserTodos)}
        footer={null}
        closable={false}
        maskStyle={{ backgroundColor: 'rgba(0,0,0, 0.8)' }}
      >
        <Typography.Title>Select User</Typography.Title>
        <div className="userListContainer">
          <UserList
            dataSource={state.userList}
            getUsers={state.users}
            getUsersRequest={() => actions.getUsersRequest()}
            renderItem={(item, index) => (
              <UserItem
                onClick={() => onSelectUser(index)}
                item={item}
                loading={selectedUserIndex === index && state.todos.fetching}
              />
            )}
          />
        </div>
      </Modal>
    </Layout>
  );
}
