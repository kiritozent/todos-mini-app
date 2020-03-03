import React, { useState, useEffect, useContext } from 'react';
import { Layout, Modal, Typography, Input } from 'antd';
import { useMediaQuery } from 'react-responsive';
import {
  SearchOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
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

  function onChangeUser() {
    localStorage.clear('user');
    setFilteredTodos([]);
    setSelectedUser(null);
  }

  return (
    <Layout className="layout">
      <Header className="headerContainer">
        <div className="content flexRow">
          {!isMobile && (
            <Typography.Text className="headerLeft">
              {`Todos Mini App ${
                selectedUser ? ` | ${selectedUser.name}` : ''
              }`}
            </Typography.Text>
          )}
          <div
            style={{
              right: !isMobile && 16,
            }}
            className="headerRight"
          >
            <Input
              value={searchText}
              placeholder="Search Todos..."
              onChange={e => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
              disabled={state.getTodos.fetching}
            />
            <UserOutlined
              className="userIcon"
              style={{
                marginLeft: 16,
                marginRight: !isMobile && 16,
              }}
              onClick={onChangeUser}
            />
          </div>
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
            getTodos={state.getTodos}
            getUsersRequest={() => actions.getUsersRequest()}
            renderItem={(item, index) => (
              <UserItem onClick={() => onSelectUser(index)} item={item} />
            )}
          />
        </div>
      </Modal>
    </Layout>
  );
}
