import Vue from 'vue';
import Router from 'vue-router';
//import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
     mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     name: 'Login',
        //     component: Login
        // },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/enterprise',
            name: 'enterprise',
            // lazy-loaded
            component: () => import('./views/BoardEnterprise.vue')
        },
        {
            path: '/lance',
            name: 'lance',
            // lazy-loaded
            component: () => import('./views/BoardLance.vue')
        },
        {
            path: '/RegistrationSuccess',
            name: 'RegistrationSuccess',
            // lazy-loaded
            component: () => import('./views/RegistrationSuccess.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/RegistrationSuccess'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});