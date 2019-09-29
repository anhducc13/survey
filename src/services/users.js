// @flow
import { browserHistory } from 'helpers';
import cookieHelper from 'helpers/cookies';
import { localStorageConstants } from 'constant';
import { requestServices } from 'services/index';

const logout = () => {
  localStorage.removeItem('user');
  cookieHelper.deleteByName(localStorageConstants.ACCESS_TOKEN);
  browserHistory.push('/dang-nhap');
};

const denyAccess = () => {
  browserHistory.push('/403');
};

const getAccessToken = () =>
  cookieHelper.getByName(localStorageConstants.ACCESS_TOKEN);

const getCurrentUserInfo = () =>
  requestServices.authClient.get('/auth/me').then(response => response.data);

const getCurrentUserId = () =>
  localStorage.getItem(localStorageConstants.KEY_CURRENT_USER_ID);

const login = params => {
  return requestServices.authClient.post('/auth/signIn', params).then(res => {
    // eslint-disable-next-line camelcase
    const { user } = res.data.data;
    localStorage.setItem('user', JSON.stringify(user));
  });
};

export default {
  login,
  logout,
  denyAccess,
  getCurrentUserInfo,
  getCurrentUserId,
  getAccessToken,
};
