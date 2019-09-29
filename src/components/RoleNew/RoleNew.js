// @flow
import React from 'react';
import { Card, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { notificationHelper } from 'helpers';
import { Field, useField, useForm } from 'hooks/form';

import { CancelButton, SaveButton } from 'components/Buttons';

export default () => {
  const { t } = useTranslation();

  const form = useForm({
    onSubmit: async (formData, valid) => {
      if (valid) {
        notificationHelper.success(
          t('CreateSuccess'),
          `${t('YouJustCreatedShop')} ${formData.name}`,
        );
      }
    },
  });

  const nameField = useField('name', form, {
    defaultValue: '',
    validations: [formData => formData.name === '' && t('FieldRequiredMsg')],
  });

  const descriptionField = useField('description', form, {
    defaultValue: '',
  });

  const functionsField = useField(
    'functions',
    form,
    {
      defaultValue: [],
    },
    {
      selectProps: {
        mode: 'multiple',
      },
      options: [
        { title: 'ductt', value: 'ductt' },
        { title: 'ductt1', value: 'ductt1' },
      ],
    },
  );

  const titleCard = (
    <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h5>{t('AddNewRole')}</h5>
      <CancelButton />
    </Col>
  );

  return (
    <Card
      title={titleCard}
      headStyle={{
        backgroundColor: '#E6F7FF',
        boxShadow: '0px 0px 5px -1px rgba(0,0,0,0.3)',
      }}
    >
      <Form onSubmit={form.onSubmit}>
        <Row gutter={16}>
          <Col md={{ span: 12 }}>
            <Field
              {...nameField}
              formSubmitted={form.submitted}
              label={t('RoleName')}
              required
            />
          </Col>
          <Col md={{ span: 12 }}>
            <Field
              {...descriptionField}
              formSubmitted={form.submitted}
              label={t('RoleDescription')}
            />
          </Col>
          <Col md={{ span: 12, offset: 12 }}>
            <Field
              {...functionsField}
              formSubmitted={form.submitted}
              label={t('RoleFunctions')}
              type="select"
            />
          </Col>
        </Row>
        <>
          <SaveButton onClick={form.onSubmit} disabled={form.isSubmitting} />
        </>
      </Form>
    </Card>
  );
};
