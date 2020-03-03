import React, { useState, useEffect } from 'react';
import { List, Typography, Avatar } from 'antd';
import PropTypes from 'prop-types';
import './UserItem.css';
import randDarkColor from '../../helper/randDarkColor';
import Spinner from '../Spinner/Spinner';

function UserItem(props) {
  const { item, onClick, loading, avatarColor } = props;

  return (
    <List.Item className="UserItemContainer" onClick={onClick}>
      <div className="UserItem">
        <Avatar size="large" style={{ backgroundColor: avatarColor }}>
          <Typography.Text className="UserAvatarText">
            {item && item.name && item.name[0].toUpperCase()}
          </Typography.Text>
        </Avatar>
        <div className="UserItemBody">
          <Typography.Text className="UserNameText">
            {item && item.name}
          </Typography.Text>
          <Typography.Text>{item && item.email}</Typography.Text>
        </div>
      </div>
      {loading && <Spinner size="medium" />}
    </List.Item>
  );
}

UserItem.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  avatarColor: PropTypes.string,
};

UserItem.defaultProps = {
  item: null,
  onClick: () => {},
  loading: false,
  avatarColor: '#808080',
};

export default UserItem;
