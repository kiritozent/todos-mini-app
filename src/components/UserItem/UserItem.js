import React from 'react';
import { List, Typography, Menu, Spin } from 'antd';
import PropTypes from 'prop-types';
import './UserItem.css';

function UserItem(props) {
  const { item, onClick, loading } = props;
  return (
    <List.Item className="UserItem" onClick={onClick}>
      <Typography.Text className="NameText">{item.name}</Typography.Text>
      {loading && <Spin size="small" />}
    </List.Item>
  );
}

UserItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserItem;
