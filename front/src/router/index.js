// import { AppVue } from '../views/public/index';
import { LayoutVue, FilmsVue, SignupVue, HomeView } from '../views/public/index';
import { LoginVue } from '../views/auth/index';
import { AdminDashboard, UploadPhotos } from '../views/admin';

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
    },
    {
        path: '/admin',
        name: 'admin',
        children : [
            { path: 'add-photos', name: 'add-photos', component: UploadPhotos },
            { path: 'dashboard', name: 'dashboard', component: AdminDashboard },

        ]
    },


];

const router = new createRouter({
    history : createWebHistory(),
    routes,
});



export default router;
