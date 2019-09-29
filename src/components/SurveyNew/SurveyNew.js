/* eslint-disable no-console */
// @flow
import React, { useEffect } from 'react';
import { Card, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { CancelButton } from 'components/Buttons';
import { useSurvey } from 'hooks/survey';

export default () => {
  const { t } = useTranslation();
  const nameSurvey = 'survey-ductt';
  const { surveyCreator, initSurvey } = useSurvey({
    name: nameSurvey,
    onSaveSurvey: data => {
      const { title } = JSON.parse(data);
      console.log(title);
      console.log(data);
    },
  });

  const titleCard = (
    <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h5>{t('AddNewSurvey')}</h5>
      <CancelButton />
    </Col>
  );

  useEffect(() => {
    initSurvey();
  }, [surveyCreator]);

  return (
    <Card
      title={titleCard}
      headStyle={{
        backgroundColor: '#E6F7FF',
        boxShadow: '0px 0px 5px -1px rgba(0,0,0,0.3)',
      }}
    >
      <div id={nameSurvey} />
    </Card>
  );
};
