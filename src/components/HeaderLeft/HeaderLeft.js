import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const HeaderLeft = props => {
  const { user } = props;
  return (
    <Typography.Text className="headerLeft">
      {`Todos Mini App ${user ? ` | ${user.name}` : ''}`}
    </Typography.Text>
  );
};

HeaderLeft.propTypes = {
  user: PropTypes.object,
};

HeaderLeft.defaultProps = {
  user: null,
};

export default HeaderLeft;
