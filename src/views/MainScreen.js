import React, { useState, useEffect, useContext } from 'react';
import { Layout, Modal, List, Typography, Spin } from 'antd';
import { StoreContext } from '../store';
import UserItem from '../components/UserItem/UserItem';
import TodosTable from '../components/TodosTable/TodosTable';

const { Header, Content, Footer } = Layout;

export default function MainScreen() {
  const { state, actions } = useContext(StoreContext);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [selectedUserTodos, setSelectedUserTodos] = useState(null);

  useEffect(() => {
    actions.getUsersRequest();
  }, []);

  useEffect(() => {
    if (state.todos.payload) {
      console.log('testing');
      setSelectedUserTodos(state.todoList);
    }
  }, [state.todos.payload]);

  function onSelectUser(index) {
    setSelectedUserIndex(index);

    actions.getTodosRequest({ userId: state.userList[index].id });
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>Header</Header>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <Content
          style={{
            maxWidth: 935,
          }}
        >
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
        <div style={{ overflow: 'scroll', maxHeight: 368 }}>
          <List
            dataSource={state.userList}
            loading={state.users.fetching}
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
