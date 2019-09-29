// Created by thanhpd on 3/1/2019
// @flow
import React from 'react';
import DefaultLayout from 'components/DefaultLayout/DefaultLayout';
import i18n from 'i18n';

const Dashboard = React.lazy(() => import('components/Dashboard/Dashboard'));
const NoteList = React.lazy(() =>
  import('components/NoteListContainer/NoteListContainer'),
);
const RoleNew = React.lazy(() => import('components/RoleNew'));
const Roles = React.lazy(() => import('components/Roles'));
const SurveyNew = React.lazy(() => import('components/SurveyNew'));

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: DefaultLayout,
  },
  {
    path: '/dashboard',
    exact: true,
    name: i18n.t('Home'),
    component: Dashboard,
  },
  {
    path: '/notes',
    exact: true,
    name: i18n.t('Note'),
    component: NoteList,
  },
  {
    path: '/danh-sach-quyen',
    exact: true,
    name: i18n.t('Roles'),
    component: Roles,
  },
  {
    path: '/them-quyen',
    exact: true,
    name: i18n.t('RoleNew'),
    component: RoleNew,
  },
  {
    path: '/them-khao-sat',
    exact: true,
    name: i18n.t('SurveyNew'),
    component: SurveyNew,
  },
];

export default routes;
