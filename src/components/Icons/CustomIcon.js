// @flow
import React, { memo } from 'react';

const styles = {
  small: {
    fontSize: '20px',
  },
  medium: {
    fontSize: '24px',
  },
  large: {
    fontSize: '32px',
  },
};

const generalType = {
  edit: {
    className: 'fa fa-pencil-square-o',
    style: {
      color: '#08A5F9',
    },
  },
  delete: {
    className: 'fa fa-window-close-o',
    style: {
      color: '#EC4E4E',
    },
  },
};

type PropTypes = {
  size?: string,
  type?: string,
};

const CustomIcon = (props: PropTypes) => {
  const { size, type, ...rest } = props;
  const style = { ...generalType[type].style, ...styles[size] };
  return (
    <span {...rest} style={{ cursor: 'pointer' }}>
      <i {...generalType[type]} style={style || null} />
    </span>
  );
};

CustomIcon.defaultProps = {
  size: 'medium',
  type: 'edit',
};

export default memo(CustomIcon);
