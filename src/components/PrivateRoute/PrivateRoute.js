/* eslint-disable no-unused-vars */
// Created by thanhpd 2/18/2019
// @flow

import React from 'react';
import { Route } from 'react-router-dom';
import { useUserInfo } from 'hooks/user';

import Page403 from 'components/Page403';
import cookieHelper from 'helpers/cookies';
import { browserHistory } from 'helpers';
import { localStorageConstants } from 'constant';

type PropsT = {
  location: Object,
  component: any,
};

export default (props: PropsT) => {
  const { currentUser, currentPermissions } = useUserInfo();
  const hasSession = !!cookieHelper.getByName(
    localStorageConstants.ACCESS_TOKEN,
  );
  const { component: Component, ...rest } = props;
  // if (!hasSession) {
  //   browserHistory.push('/dang-nhap');
  //   return false;
  // }
  // if (!currentUser) {
  //   return false;
  // }
  // if (currentPermissions && currentPermissions.length === 0) {
  //   return <Page403 />;
  // }

  return (
    <Route
      {...rest}
      render={routeProps => (
        <Component {...routeProps} activeUser={currentUser} />
      )}
    />
  );
};
