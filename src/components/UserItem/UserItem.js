import React, { useState } from 'react';
import { List, Typography, Spin, Avatar } from 'antd';
import PropTypes from 'prop-types';
import './UserItem.css';
import randDarkColor from '../../helper/randDarkColor';

function UserItem(props) {
  const [avatarColor, setAvatarColor] = useState(randDarkColor());
  const { item, onClick, loading } = props;

  return (
    <List.Item className="UserItem" onClick={onClick}>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar size="large" style={{ backgroundColor: avatarColor }}>
          <Typography.Text className="UserAvatarText">
            {item.name[0].toUpperCase()}
          </Typography.Text>
        </Avatar>
        <div
          style={{ flexDirection: 'column', display: 'flex', marginLeft: 16 }}
        >
          <Typography.Text className="UserNameText">
            {item.name}
          </Typography.Text>
          <Typography.Text>{item.email}</Typography.Text>
        </div>
      </div>
      {loading && <Spin size="small" />}
    </List.Item>
  );
}

UserItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserItem;
