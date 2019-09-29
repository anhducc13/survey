// @flow
import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const CreateButton = (props: any) => {
  const { t } = useTranslation();
  return (
    <Button type="success" {...props}>
      <i className="fa fa-plus mr-2" />
      {t('Create')}
    </Button>
  );
};

export default CreateButton;
