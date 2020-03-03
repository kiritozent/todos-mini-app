import React, { useState, useEffect, useContext } from 'react';
import { Layout, Checkbox, Table } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { StoreContext } from '../store';
import './MainScreen.css';
import HeaderLeft from '../components/HeaderLeft/HeaderLeft';
import HeaderRight from '../components/HeaderRight/HeaderRight';
import UserListModal from '../components/UserListModal/UserListModal';
import AddTodos from '../components/AddTodos/AddTodos';
import TodosItem from '../components/TodosItem/TodosItem';
import Spinner from '../components/Spinner/Spinner';

const { Header, Content } = Layout;

export default function MainScreen() {
  const user = JSON.parse(localStorage.getItem('user'));

  const { state, actions } = useContext(StoreContext);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(user);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const columns = [
    {
      key: 'todosCompleted',
      width: 38,
      align: 'center',
      filters: [
        { text: 'Completed', value: true },
        { text: 'Incompleted', value: false },
      ],
      onFilter: (value, record) => record && record.completed === value,
      render: (_, record, index) =>
        selectedTodoIndex !== index ? (
          <Checkbox
            checked={record && record.completed}
            onClick={() => onChangeCompleted(record, index)}
          />
        ) : (
          <Spinner size="small" />
        ),
    },
    {
      key: 'todosTitle',
      title: 'Todos',
      filters: [{ text: 'TodosTitle', value: 'testing' }],
      onFilter: (value, record) => record && record.title === value,
      render: (text, record, index) => (
        <TodosItem
          item={record}
          index={index}
          patchTodos={state.patchTodos}
          deleteTodos={state.deleteTodos}
          patchTodosRequest={actions.patchTodosRequest}
          deleteTodosRequest={actions.deleteTodosRequest}
        />
      ),
      filterIcon: (
        <AddTodos
          postTodos={state.postTodos}
          postTodosRequest={actions.postTodosRequest}
        />
      ),
    },
  ];

  const loading = state.getTodos.fetching;
  const otherLoading =
    state.patchTodos.fetching ||
    state.deleteTodos.fetching ||
    state.postTodos.fetching;

  useEffect(() => {
    actions.getUsersRequest();
    if (selectedUser) {
      actions.getTodosRequest({ userId: selectedUser.id });
    }
  }, []);

  useEffect(() => {
    if (state.getTodos.payload) {
      setSelectedUser(user);
      setFilteredTodos(state.todoList);
    }
  }, [state.getTodos.payload]);

  useEffect(() => {
    setFilteredTodos(state.todoList);
  }, [state.todoList]);

  useEffect(() => {
    onFilteredTodos();
  }, [searchText]);

  useEffect(() => {
    if (state.patchTodos.payload) {
      setSelectedTodoIndex(null);
    }
  }, [state.patchTodos.payload]);

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

  function onChangeCompleted(item, index) {
    const data = { ...item, completed: !item.completed };
    setSelectedTodoIndex(index);
    actions.patchTodosRequest(data);
  }

  return (
    <Layout className="layout">
      <Header className="headerContainer">
        <div className="content flexRow">
          {!isMobile && <HeaderLeft user={selectedUser} />}
          <HeaderRight
            userOnClick={onChangeUser}
            searchText={searchText}
            fetching={state.getTodos.fetching}
            setSearchText={setSearchText}
            isMobile={isMobile}
          />
        </div>
      </Header>
      <Layout className="layoutContent">
        <Content className="content">
          <Table
            dataSource={filteredTodos}
            loading={{
              indicator: !otherLoading ? <Spinner size="large" /> : <div />,
              spinning: loading || otherLoading,
            }}
            columns={columns}
            pagination={false}
            useFixedHeader
            rowKey={(record, index) => index.toString()}
            bodyStyle={{
              overflowY: 'scroll',
              backgroundColor: 'white',
              overflowX: 'hidden',
              height: 'calc(100vh - 118px)',
            }}
          />
        </Content>
      </Layout>
      <UserListModal
        user={selectedUser}
        dataSource={state.userList}
        getTodos={state.getTodos}
        getUsers={state.getUsers}
        getUsersRequest={actions.getUsersRequest}
        selectedUserIndex={selectedUserIndex}
        onSelectUser={onSelectUser}
      />
    </Layout>
  );
}
