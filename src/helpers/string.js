// @flow
const trimString = (str: string) =>
  str ? str.replace(/^\s+|\s+$|\s+(?=\s)/g, '') : str;

const removeSpaces = (str: string) => str.replace(/\s+/g, '');

export default {
  trimString,
  removeSpaces,
};
