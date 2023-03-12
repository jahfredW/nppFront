// import { AppVue } from '../views/public/index';
import { LayoutVue, FilmsVue, SignupVue, HomeView, DownloadVue, DownloadBlob } from '../views/public/index';
import { LoginVue } from '../views/auth/index';
import { AdminDashboard, UploadPictures } from '../views/admin';

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
            { path: '/download', name: 'download', component: DownloadVue },
            { path: '/downloadBlob', name: 'downloadBlob', component: DownloadBlob },
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
            { path: 'uploadPictures', name: 'upload-pictures', component: UploadPictures },
            { path: 'dashboard', name: 'dashboard', component: AdminDashboard },

        ]
    },


];

const router = new createRouter({
    history : createWebHistory(),
    routes,
});


router.beforeEach( (to, from, next) => {
    console.log(to.matched[0].name)
    next();
  })


export default router;
