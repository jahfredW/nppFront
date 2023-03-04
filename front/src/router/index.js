// import { AppVue } from '../views/public/index';
import { LayoutVue, FilmsVue, SignupVue, HomeView } from '../views/public/index';
import { LoginVue } from '../views/auth/index';

// import AboutVue from '../components/About.Vue';

import { createWebHistory, createRouter } from 'vue-router';


const routes = [
    // routes publiques 
    {
        path: '/',
        name: 'public',
        component: LayoutVue,
        children: [ 
            { path: '/', name: 'homeView', component: HomeView },
            { path: '/films', name: 'filmsView', component: FilmsVue },
            { path: '/signup', name: 'signup', component: SignupVue },
            ]
    },
    {
        path: '/auth',
        name: 'authentification',
        children : [
            { path: 'login', name: 'login', component: LoginVue },
        ]

    }


];

const router = new createRouter({
    history : createWebHistory(),
    routes,
});



export default router;
