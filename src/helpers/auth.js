// @flow

type PermissionType = {
  role: string,
  func: string,
};

type PermissionItemT = {
  permissions: [PermissionType],
  relative: ?boolean,
};

const permission = (role: ?string, func: ?string) => {
  return [role, func].filter(x => !!x).join(':');
};

const checkPermission = (permissions: [string], func: string) => {
  return !!(permissions && permissions.find(p => func.includes(p)));
};

const filterHasPermissions = (
  items: [PermissionItemT],
  currentPermissions: [string],
) =>
  items.filter(item => {
    const { permissions } = item;
    if (!permissions) {
      return true;
    }
    const intersection = permissions.find(func => {
      return checkPermission(currentPermissions, func);
    });
    return !!intersection;
  });

export default {
  filterHasPermissions,
  checkPermission,
  permission,
};
