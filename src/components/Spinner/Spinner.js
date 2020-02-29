import React from 'react';
import PropTypes from 'prop-types';
import { LoadingOutline } from '@ant-design/icons';
import { Spin } from 'antd';

function Spinner(props) {
  const { size, color } = props;
  let sizeNumber;
  if (typeof size === 'number') {
    sizeNumber = size;
  } else {
    switch (size) {
      case 'small':
        sizeNumber = 16;
        break;
      case 'medium':
        sizeNumber = 24;
        break;
      case 'large':
        sizeNumber = 32;
        break;
      default:
        break;
    }
  }
  return (
    <Spin
      indicator={
        <LoadingOutline style={{ fontSize: sizeNumber, color }} spin />
      }
    />
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['small', 'medium', 'large']),
  ]),
  color: PropTypes.string,
};

Spinner.defaultProps = {
  size: 24,
  color: '#1890ff',
};

export default Spinner;
