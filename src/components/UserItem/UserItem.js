import React, { useState } from 'react';
import { List, Typography, Avatar } from 'antd';
import PropTypes from 'prop-types';
import './UserItem.css';
import randDarkColor from '../../helper/randDarkColor';
import Spinner from '../Spinner/Spinner';

function UserItem(props) {
  const [avatarColor] = useState(randDarkColor());
  const { item, onClick, loading } = props;

  return (
    <List.Item className="UserItemContainer" onClick={onClick}>
      <div className="UserItem">
        <Avatar size="large" style={{ backgroundColor: avatarColor }}>
          <Typography.Text className="UserAvatarText">
            {item.name[0].toUpperCase()}
          </Typography.Text>
        </Avatar>
        <div className="UserItemBody">
          <Typography.Text className="UserNameText">
            {item.name}
          </Typography.Text>
          <Typography.Text>{item.email}</Typography.Text>
        </div>
      </div>
      {loading && <Spinner size="medium" />}
    </List.Item>
  );
}

UserItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserItem;
