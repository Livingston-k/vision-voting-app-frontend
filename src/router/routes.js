import store from '@/state/store'

export default [
  {
    path: '/',
    name: 'default',
    meta: {
      authRequired: true,
    },
    component: () => import('./views/vote/vote-positions.vue'),
  },
    {
    path: '/home',
    name: 'HomeDefault',
    meta: {
      authRequired: true,
    },
    component: () => import('./views/home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/account/login'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./views/account/register'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    component: () => import('./views/account/forgot-password'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
          store.dispatch('auth/logOut')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.push('/login')
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { name: 'default' } : { ...routeFrom })
      },
    },
  },
  {
    path: '/404',
    name: '404',
    component: require('./views/utility/404').default,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: { authRequired: true },
    component: () => import('./views/categories/view-categories.vue')
  },
  {
    path: '/candidates',
    name: 'Candidates',
    meta: { authRequired: true },
    component: () => import('./views/candidates/view-candidates.vue')
  },
  {
    path: '/pages/maintenance',
    name: 'Maintenance',
    meta: { authRequired: true },
    component: () => import('./views/utility/maintenance')
  },
  {
    path: '/pages/coming-soon',
    name: 'coming-soon',
    meta: { authRequired: true },
    component: () => import('./views/utility/coming-soon')
  },
  {
    path: '/pages/timeline',
    name: 'Timeline',
    meta: { authRequired: true },
    component: () => import('./views/utility/timeline')
  },
  {
    path: '/pages/404',
    name: 'Error-404',
    meta: { authRequired: true },
    component: () => import('./views/utility/404')
  },
 


]
