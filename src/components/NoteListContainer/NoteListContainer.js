// Created by thanhpd on 6/17/2019
// @flow
import React, { useEffect, useState } from 'react';

import { Card, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { dateTimeHelper } from 'helpers';
import { noteServices } from 'services';


export default () => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t('Title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('Content'),
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: t('CreatedAt'),
      dataIndex: 'createdAt',
      render: value => dateTimeHelper.formatDateTime(value),
    },
  ];

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    noteServices.fetchNotes().then(res => {
      setNotes(res.data);
    }).finally(() => {
      setLoading(false);
    });

  }, []);
  return (
    <Card>
      <Table loading={loading} dataSource={notes} columns={columns} />
    </Card>
  );
}
