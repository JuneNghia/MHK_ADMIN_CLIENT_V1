import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import GuestGuard from './components/Auth/GuestGuard';
import AuthGuard from './components/Auth/AuthGuard';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    guard: GuestGuard,
    path: '/auth/signin',
    component: lazy(() => import('./views/auth/signin/SignIn'))
  },
  {
    exact: true, 
    path: '/404',
    component: lazy(() => import('./views/errors/NotFound404'))
  },
  {
    exact: true,
    path: '/maintenance/coming-soon',
    component: lazy(() => import('./views/maintenance/ComingSoon'))
  },
  {
    exact: true,
    path: '/maintenance/error',
    component: lazy(() => import('./views/errors/Error'))
  },
  {
    exact: true,
    path: '/maintenance/offline-ui',
    component: lazy(() => import('./views/maintenance/OfflineUI'))
  },
  {
    exact: true,
    path: '/auth/signup',
    component: lazy(() => import('./views/auth/signup/SignUp'))
  },

  {
    exact: true,
    path: '/auth/signin',
    component: lazy(() => import('./views/auth/signin/SignIn'))
  },

  {
    exact: true,
    path: '/auth/reset-password',
    component: lazy(() => import('./views/auth/reset-password/ResetPassword'))
  },
  {
    exact: true,
    path: '/auth/change-password',
    component: lazy(() => import('./views/auth/ChangePassword'))
  },
  {
    path: '*',
    layout: AdminLayout,
    guard: AuthGuard,
    routes: [
      {
        exact: true,
        path: '/app/dashboard/default',
        component: lazy(() => import('./views/dashboard/DashDefault'))
      },
      {
        exact: true,
        path: '/app/dashboard/crm',
        component: lazy(() => import('./views/dashboard/DashCrm'))
      },
      {
        exact: true,
        path: '/app/sell-management/orders/create',
        component: lazy(() => import('./views/sell-management/orders-M/Create'))
      },
      {
        exact: true,
        path: '/app/sell-management/customers',
        component: lazy(() => import('./views/sell-management/customers-M'))
      },
      {
        exact: true,
        path: '/app/sell-management/customers/create',
        component: lazy(() => import('./views/sell-management/customers-M/Create'))
      },
      {
        exact: true,
        path: '/app/sell-management/customers/:id',
        component: lazy(() => import('./views/sell-management/customers-M/Detail'))
      },
      {
        exact: true,
        path: '/app/sell-management/customers/:id/edit',
        component: lazy(() => import('./views/sell-management/customers-M/Edit'))
      },
      {
        exact: true,
        path: '/app/sell-management/orders',
        component: lazy(() => import('./views/sell-management/orders-M'))
      },
      {
        exact: true,
        path: '/app/sell-management/products',
        component: lazy(() => import('./views/sell-management/products-M/products'))
      },
      {
        exact: true,
        path: '/app/sell-management/products/create',
        component: lazy(() => import('./views/sell-management/products-M/products/Create/index'))
      },
      {
        exact: true,
        path: '/app/sell-management/products/:id',
        component: lazy(() => import('./views/sell-management/products-M/products/Detail'))
      },

      //Configurations
      {
        exact: true,
        path: '/app/configurations',
        component: lazy(() => import('./views/configurations'))
      },
      {
        exact: true,
        path: '/users/user-profile',
        component: lazy(() => import('./views/configurations/users/UserProfile'))
      },
      {
        exact: true,
        path: '/users/user-cards',
        component: lazy(() => import('./views/configurations/users/UserCard'))
      },
      {
        exact: true,
        path: '/app/configurations/users',
        component: lazy(() => import('./views/configurations/users'))
      },
      {
        exact: true,
        path: '/app/configurations/users/create',
        component: lazy(() => import('./views/configurations/users/Create'))
      },
      {
        exact: true,
        path: '/app/configurations/users/:id',
        component: lazy(() => import('./views/configurations/users/Detail'))
      },
      //Branch
      {
        exact: true,
        path: '/app/configurations/branches',
        component: lazy(() => import('./views/configurations/agencyBranch-M'))
      },

      //APP
      {
        exact: true,
        path: '/app/application',
        component: lazy(() => import('./views/applications'))
      },
      {
        exact: true,
        path: '/app/application/gallery',
        component: lazy(() => import('./views/applications/gallery/MasonryGallery'))
      },
      {
        exact: true,
        path: '/app/application/to-do',
        component: lazy(() => import('./views/applications/to-do/ToDo'))
      },
      {
        exact: true,
        path: '/app/application/message',
        component: lazy(() => import('./views/applications/message'))
      },
      {
        exact: true,
        path: '/app/application/task',
        component: lazy(() => import('./views/applications/task/TaskList'))
      },
      {
        exact: true,
        path: '*',
        component: () => <Redirect to={BASE_URL}/>
      }, 
    ]
  }
];

export default routes;
