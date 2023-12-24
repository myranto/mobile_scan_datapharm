import React from "react";

const Page = React.lazy(() => import('./pages/Page'))
const Login = React.lazy(() => import('./pages/auth/Login'))
const List = React.lazy(() => import('./pages/product/ListProduct'))
const Details = React.lazy(() => import('./pages/product/Details'))
// const MCalendar = React.lazy(() => import('./pages/calendar/MCalendar'))
// const PersonList = React.lazy(() => import('./pages/persontest/PersonList'))
const routes = [
    {path: '/folder/:name', name: 'Profile', component: Page, exact: true},
    {path: '/', name: 'Login', component: Login, exact: true},
    {path: '/product/list', name: 'Produits', component: List, exact: true},
    {path: '/product/detail/:id', name: 'Detail', component: Details, exact: true},
]
export default routes;