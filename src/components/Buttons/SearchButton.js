// @flow
import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const SearchButton = (props: any) => {
  const { t } = useTranslation();
  return (
    <Button type="primary" {...props}>
      <div className="d-flex align-items-center">
        <i className="fa fa-search mr-2" />
        {t('Search')}
      </div>
    </Button>
  );
};

export default SearchButton;
