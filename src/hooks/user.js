// Created by thanhpd on 6/11/2019
// @flow
import { useGlobal } from 'reactn/index';
import { authHelper } from 'helpers';
import { authConstants } from 'constant';
import { useEffect } from 'react';

export const useAuthorizationNavigation = defaultValue => {
  const [currentPermissions] = useGlobal(authConstants.KEY_CURRENT_PERMISSIONS);
  const { items } = defaultValue;
  let filteredItems = authHelper.filterHasPermissions(
    items,
    currentPermissions,
  );
  filteredItems = filteredItems.map(item => {
    const { children } = item;
    if (children) {
      return {
        ...item,
        children: authHelper.filterHasPermissions(children, currentPermissions),
      };
    }
    return item;
  });

  const filteredNavigation = { items: filteredItems };
  return {
    filteredNavigation,
  };
};

export const useAuthorizationRoute = defaultValue => {
  const [currentPermissions] = useGlobal(authConstants.KEY_CURRENT_PERMISSIONS);
  const filteredRoutes = authHelper.filterHasPermissions(
    defaultValue,
    currentPermissions,
  );
  return {
    filteredRoutes,
  };
};

const getPermissionFromUser = currentUser =>
  currentUser && currentUser.roles ? currentUser.roles.permissions : [];

export const useUserInfo = () => {
  const [currentUser, setCurrentUser] = useGlobal(
    authConstants.KEY_CURRENT_USER,
  );
  const [currentPermissions, setCurrentPermissions] = useGlobal(
    authConstants.KEY_CURRENT_PERMISSIONS,
  );

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setCurrentUser(userData);
      setCurrentPermissions(getPermissionFromUser(userData));
    }
  }, []);

  return {
    currentUser,
    setCurrentUser,
    currentPermissions,
    setCurrentPermissions,
  };
};
