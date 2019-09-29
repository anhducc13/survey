// @flow
import axios from 'axios/index';
import cookieHelper from 'helpers/cookies';
import { localStorageConstants } from 'constant';
import { requestHelper } from 'helpers';

export const BASE_API_URL: string = 'http://localhost:5000/api';

axios.interceptors.response.use(
  response => response,
  error => {
    requestHelper.handleRequestError(error);
    return Promise.reject(error);
  },
);

const getAuthorization = () =>
  `Bearer ${cookieHelper.getByName(localStorageConstants.ACCESS_TOKEN)}`;

const authClient = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    Authorization: getAuthorization(),
  },
});

authClient.interceptors.response.use(
  response => response,
  error => {
    requestHelper.handleRequestError(error);
    return Promise.reject(error);
  },
);

export default {
  authClient,
};
