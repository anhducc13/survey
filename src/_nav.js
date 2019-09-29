// @flow
import i18n from 'i18n';

export default {
  items: [
    {
      name: i18n.t('Home'),
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'HOME',
      },
    },
    {
      title: true,
      name: 'Quản lý người dùng',
      permissions: ['view_all_user'],
      relative: true,
    },
    {
      name: 'Danh sách người dùng',
      url: '/notes',
      icon: 'fa fa-list-ul',
      permissions: ['view_all_user'],
    },
    {
      name: 'Thêm người dùng',
      url: '/notes',
      icon: 'fa fa-plus',
      permissions: ['add_user'],
    },
    {
      title: true,
      name: 'Quản lý quyền',
      permissions: ['view_all_role'],
      relative: true,
    },
    {
      name: 'Danh sách quyền',
      url: '/notes',
      icon: 'fa fa-list-ul',
      permissions: ['view_all_role'],
    },
    {
      name: 'Thêm quyền',
      url: '/notes',
      icon: 'fa fa-plus',
      permissions: ['add_role'],
    },
    {
      title: true,
      name: 'Quản lý khảo sát',
      permissions: ['view_survey_me'],
      relative: true,
    },
    {
      name: 'Khảo sát của tôi',
      url: '/notes',
      icon: 'fa fa-list-ul',
      permissions: ['view_survey_me'],
    },
    {
      name: 'Thêm khảo sát',
      url: '/notes',
      icon: 'fa fa-plus',
      permissions: ['add_survey'],
    },
  ],
};
