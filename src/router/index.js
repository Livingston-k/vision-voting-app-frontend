import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import routes from './routes'
import store from '@/state/store'

Vue.use(VueRouter)
Vue.use(VueMeta, {
    keyName: 'page',
})
const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})
router.beforeEach((routeTo, routeFrom, next) => {
    const publicPages = ['/login', '/register', '/forgot-password', '/update_password'];
    const authpage = !publicPages.includes(routeTo.path);
    const loggeduser = localStorage.getItem('token');
    if (authpage && !loggeduser) {
        return next('/login');
    }
    if (store.getters['auth/Type'] && routeTo.path == '/home') {
    return next('/');
  }
    if (!store.getters['auth/Type'] && routeTo.path == '/') {
    return next('/home');
  }
    next();

})

router.beforeResolve(async(routeTo, routeFrom, next) => {

    try {
        // For each matched route...
        for (const route of routeTo.matched) {
            await new Promise((resolve, reject) => {
                // If a `beforeResolve` hook is defined, call it with
                // the same arguments as the `beforeEnter` hook.
                if (route.meta && route.meta.beforeResolve) {
                    route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
                        // If the user chose to redirect...
                        if (args.length) {
                            // If redirecting to the same route we're coming from...
                            // Complete the redirect.
                            next(...args)
                            reject(new Error('Redirected'))
                        } else {
                            resolve()
                        }
                    })
                } else {
                    // Otherwise, continue resolving the route.
                    resolve()
                }
            })
        }
        // If a `beforeResolve` hook chose to redirect, just return.
    } catch (error) {
        return
    }

    // If we reach this point, continue resolving the route.
    next()
})

export default router