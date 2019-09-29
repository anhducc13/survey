// Created by thanhpd on 5/18/2019
// @flow
import { regions } from 'localization';
import { languageConstants, localStorageConstants } from 'constant';


const getCurrentLanguage = () => {
  let language =
    localStorage.getItem(localStorageConstants.KEY_LANGUAGE) ||
    languageConstants.VIETNAM;

  // check if language in localstorage exist in project or not
  if (!regions[language]) language = languageConstants.VIETNAM;

  return language;
};

const changeLanguage = newLanguage => {
  localStorage.setItem(localStorageConstants.KEY_LANGUAGE, newLanguage);
  window.location.reload();
};

export default {
  getCurrentLanguage,
  changeLanguage,
};
