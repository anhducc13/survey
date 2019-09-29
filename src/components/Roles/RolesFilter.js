// @flow
import React from 'react';
import { Row, Col, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { browserHistory } from 'helpers';
import { Field, useField } from 'hooks/form';
import { SearchButton, CreateButton } from 'components/Buttons';

const { Item } = Form;

export default (props: { form: Object }) => {
  const { t } = useTranslation();
  const { form } = props;

  const searchField = useField(
    'q',
    form,
    {
      defaultValue: '',
    },
    {
      itemProps: {
        style: { margin: '2px 2px 2px 0' },
      },
      inputProps: {
        placeholder: t('EnterSearchKey'),
      },
    },
  );

  return (
    <Row>
      <Col md={{ span: 12 }}>
        <Row gutter={6}>
          <Form className="marketeye-form" onSubmit={form.onSubmit}>
            <Col md={{ span: 10 }}>
              <Field {...searchField} />
            </Col>
            <Col md={{ span: 6 }}>
              <Item style={{ margin: 2 }}>
                <SearchButton id="search-btn" htmlType="submit" />
              </Item>
            </Col>
          </Form>
        </Row>
      </Col>
      <Col
        md={{ span: 12 }}
        className="my-1 d-flex d-md-block justify-content-end"
      >
        <CreateButton
          className="float-md-right ml-1"
          onClick={() => browserHistory.push('/them-quyen')}
        />
      </Col>
    </Row>
  );
};
