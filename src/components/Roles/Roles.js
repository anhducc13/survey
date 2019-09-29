// @flow
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';

import { stringHelper } from 'helpers';
import { useForm } from 'hooks/form';
import RolesFilter from './RolesFilter';
import RolesList from './RolesList';

const { trimString } = stringHelper;

export default () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
  });
  const [roles, setRoles] = useState({
    total: 0,
    currentShops: [],
  });

  const fetchRoles = async filterData => {
    // eslint-disable-next-line no-unused-vars
    const newFilters = {
      ...filterData,
      name: trimString(filterData.name),
    };
    const data = { totalItems: 0, results: [] };
    setRoles({
      total: data.totalItems,
      currentShops: data.results,
    });
  };

  const formQueryRole = useForm({
    onSubmit: formData => {
      const newFiltersData = { ...formData, ...filters };
      fetchRoles(newFiltersData);
    },
  });

  useEffect(() => {
    fetchRoles(filters);
  }, []);

  return (
    <Card
      title={<h3>{t('RoleList')}</h3>}
      headStyle={{
        backgroundColor: '#E6F7FF',
      }}
    >
      <RolesFilter form={formQueryRole} />
      <RolesList
        filters={filters}
        roles={roles}
        onFiltersChange={data => {
          const newFilters = {
            ...filters,
            ...formQueryRole.getFormData(),
            ...data,
          };
          setFilters(newFilters);
          fetchRoles(newFilters);
        }}
      />
    </Card>
  );
};
