import React, { useState, useEffect, useContext } from 'react';
import { Layout, Modal, Typography, Input } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { SearchOutlined } from '@ant-design/icons';
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
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchText, setSearchText] = useState('');

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    actions.getUsersRequest();
    if (selectedUser) {
      actions.getTodosRequest({ userId: selectedUser.id });
    }
  }, []);

  useEffect(() => {
    if (state.getTodos.payload) {
      setSelectedUser(JSON.parse(localStorage.getItem('user')));
      setFilteredTodos(state.todoList);
    }
  }, [state.getTodos.payload]);

  useEffect(() => {
    onFilteredTodos();
  }, [searchText]);

  function onSelectUser(index) {
    setSelectedUserIndex(index);

    actions.getTodosRequest({ userId: state.userList[index].id });
  }

  function onFilteredTodos() {
    const temp = state.todoList.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    );

    setFilteredTodos(temp);
  }

  return (
    <Layout className="layout">
      <Header
        className="headerContainer"
        style={{
          padding: 0,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <div className="content flexRow">
          {!isMobile && (
            <Typography.Text className="appNameText" style={{ flex: 2 }}>
              Hello, {selectedUser.name}
            </Typography.Text>
          )}
          <Input
            value={searchText}
            placeholder="Search Todos..."
            onChange={e => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ flex: 1, right: !isMobile && 16 }}
            allowClear
            disabled={state.getTodos.fetching}
          />
        </div>
      </Header>
      <Layout className="layoutContent">
        <Content className="content">
          <TodosTable
            dataSource={filteredTodos}
            loading={state.getTodos.fetching}
          />
        </Content>
      </Layout>
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
