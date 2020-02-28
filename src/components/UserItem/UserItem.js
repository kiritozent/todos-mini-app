import React from 'react';
import { List, Typography } from 'antd';
import PropTypes from 'prop-types';

const UserItem = props => {
  const { item, onClick } = props;
  return (
    <List.Item onClick={onClick} style={styles.listItem}>
      <Typography.Text>{item.name}</Typography.Text>
    </List.Item>
  );
};

UserItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserItem;

const styles = {
  listItem: {
    cursor: 'pointer',
  },
};
