// @flow
import React from 'react';
import { Button, Icon, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const SaveButton = (props: any) => {
  const { t } = useTranslation();
  return (
    <Button type="primary" {...props} htmlType='submit'>
      <Row className="d-flex align-items-center">
        <Icon className="mr-2" type="save" />
        {t('Save')}
      </Row>
    </Button>
  );
};

export default SaveButton;
