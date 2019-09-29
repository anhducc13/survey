// @flow
import React from 'react';
import { Button, Icon, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { browserHistory } from 'helpers';

const CancelButton = (props: any) => {
  const { t } = useTranslation();
  return (
    <Button
      type="danger"
      {...props}
      onClick={() => browserHistory.goBack()}
    >
      <Row className="d-flex align-items-center">
        <Icon className="mr-2" type="close" />
        {t('Cancel')}
      </Row>
    </Button>
  );
};

export default CancelButton;
