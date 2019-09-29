// @flow
import React from 'react';
import { Modal, Icon } from 'antd';
import i18n from 'i18n';

type ConfirmConfigT = {
  content: string | React$Element<any>,
  onOk?: void | (() => void | Promise<any>),
  onCancel?: void | (() => void | Promise<any>),
  title?: string | React$Element<any>,
  okText?: string | React$Element<any>,
  cancelText?: string | React$Element<any>,
  iconColor?: string,
  iconType?: string,
};

const defaultConfirmConfig = {
  title: i18n.t('Warning'),
  iconColor: 'orange',
  iconType: 'question-circle',
};

const confirm = (config: ConfirmConfigT) => {
  const {
    onOk,
    onCancel,
    content,
    title = defaultConfirmConfig.title,
    iconColor = defaultConfirmConfig.iconColor,
    iconType = defaultConfirmConfig.iconType,
    ...rest
  } = config;

  return Modal.confirm({
    title,
    onOk,
    onCancel,
    content: <div className="d-flex flex-grown-1 m-0 p-0">{content}</div>,
    centered: true,
    icon: (
      <Icon type={iconType} style={{ color: iconColor, fontSize: '32px' }} />
    ),
    ...rest,
  });
};

// info
type InfoConfigT = {
  content: string | React$Element<any>,
  onOk?: void | (() => void | Promise<any>),
  title?: string | React$Element<any>,
  okText?: string | React$Element<any>,
  iconColor?: string,
  iconType?: string,
};

const defaultInfoConfig = {
  iconType: 'info-circle',
  iconColor: 'primary',
};

const info = (config: InfoConfigT) => {
  const {
    onOk,
    content,
    okText,
    title,
    iconType = defaultInfoConfig.iconType,
    iconColor = defaultInfoConfig.iconColor,
    ...rest
  } = config;

  return Modal.info({
    title,
    okText,
    content,
    centered: true,
    icon: (
      <Icon type={iconType} style={{ color: iconColor, fontSize: '32px' }} />
    ),
    ...rest,
  });
};

const defaultWarningConfig = {
  iconType: 'info-circle',
  iconColor: 'warning',
};

const warning = (config: InfoConfigT) => {
  const {
    onOk,
    content,
    okText,
    title,
    iconType = defaultWarningConfig.iconType,
    iconColor = defaultWarningConfig.iconColor,
    ...rest
  } = config;

  return Modal.warning({
    title,
    okText,
    content,
    centered: true,
    icon: (
      <Icon type={iconType} style={{ color: iconColor, fontSize: '32px' }} />
    ),
    ...rest,
  });
};

export default {
  confirm,
  info,
  warning,
};
