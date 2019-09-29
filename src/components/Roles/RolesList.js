/* eslint-disable no-unused-vars */
// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import humps from 'humps';

import { modalHelper } from 'helpers';
import { CustomIcon } from 'components/Icons';

export default (props: {
  filters: Object,
  roles: { total: number, currentShops: Array<Object> },
  onFiltersChange: (data: Object) => void,
}) => {
  const { t } = useTranslation();
  const {
    filters,
    roles: { total, currentShops },
    onFiltersChange,
  } = props;

  const handleTableChange = (pagination, filter, sorter) => {
    const { current, pageSize } = pagination;
    const newFilters = {
      ...filters,
      pageSize,
      page: filters.pageSize === pageSize ? current : 1,
    };
    if (_.isEmpty(sorter)) {
      onFiltersChange({ ...newFilters, orderBy: undefined });
      return;
    }
    const sorterParam = `${
      sorter.order === 'descend' ? '-' : ''
    }${humps.decamelize(sorter.field)}`;
    onFiltersChange({ ...newFilters, orderBy: sorterParam });
  };

  const handleChangeStatus = async (id: number, newStatus: boolean) => {
    modalHelper.confirm({
      title: t('Confirm'),
      content: <div>{t('DoYouWantToChangeStatus')}</div>,
      onOk: async () => {},
    });
  };

  const handleDelete = async (id: number) => {
    modalHelper.confirm({
      title: t('Confirm'),
      content: <div>{t('DoYouWantToDelete')}</div>,
      onOk: async () => {},
    });
  };

  const columns = [
    {
      title: t('RoleName'),
      dataIndex: 'name',
      sorter: true,
      key: 'name',
      render: (name, record) => <Link to="/them-quyen">{name}</Link>,
    },
    {
      title: t('RoleDescription'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      render: (text, record) => {
        const { id } = record;
        return (
          <>
            <Link to="/them-quyen">
              <CustomIcon className="mx-1" type="edit" />
            </Link>
            <CustomIcon
              onClick={() => handleDelete(id)}
              className="mx-1"
              type="delete"
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        bordered
        dataSource={currentShops}
        onChange={handleTableChange}
        scroll={{ x: 1000 }}
        pagination={{
          showTotal: (totalProducts, range) =>
            `${t('From')} ${range[0]} - ${range[1]} ${t(
              'in',
            )} ${totalProducts} ${t('roles')}`,
          total,
          current: filters.page,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: filters.pageSize,
          pageSizeOptions: ['10', '15', '20', '50', '100'],
        }}
      />
    </>
  );
};
