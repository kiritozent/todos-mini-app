import React, { useState, useEffect, useContext } from 'react';
import { Layout, Modal, List, Typography, Spin } from 'antd';
import { StoreContext } from '../store';
import UserItem from '../components/UserItem/UserItem';

const { Header, Content, Footer } = Layout;

export default function MainScreen() {
  const { state, actions } = useContext(StoreContext);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    actions.getUsersRequest();
  }, []);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>Header</Header>
      <Layout>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
      <Modal
        centered
        visible={typeof selectedUser !== 'number'}
        footer={null}
        closable={false}
      >
        <Typography.Title>Select User</Typography.Title>
        <div style={{ overflow: 'scroll', maxHeight: 368 }}>
          <List
            dataSource={state.userList}
            loading={state.users.fetching}
            renderItem={item => (
              <UserItem onClick={() => setSelectedUser(item.id)} item={item} />
            )}
          />
        </div>
      </Modal>
    </Layout>
  );
}
