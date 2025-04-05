import {
    createRouter,
    createWebHistory,
    NavigationGuardNext,
    RouteLocationNormalized,
    RouteRecordRaw,
} from "vue-router";
import {useAuthStore} from "../stores/auth.ts";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {guestOnly: true}
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
        name: 'login',
        meta: {guestOnly: true}
    },
    {path: '/register', component: () => import('../views/Register.vue'), meta: {guestOnly: true}},
    {
        path: '/account',
        name: 'account',
        component: () => import('../views/account/Account.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/account-edit',
        name: 'account-edit',
        component: () => import('../views/account/AccountEdit.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/account/galleries',
        name: 'account-galleries',
        component: () => import('../views/account/galleries/AccountGalleries.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/account/images',
        name: 'account-images',
        component: () => import('../views/account/images/AccountImages.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/account/images/upload',
        name: 'account-images-upload',
        component: () => import('../views/account/images/AccountImagesUpload.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/account/galleries/:id',
        name: 'account-gallery-detail',
        component: () => import('../views/account/galleries/AccountGalleryDetail.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/account/galleries/:id/manage-images',
        name: 'account-gallery-manage-images',
        component: () => import('../views/account/galleries/AccountGalleriesManageImages.vue'),
        meta: { requiresAuth: true }
    },

    {
        path: '/account/galleries/create',
        name: 'account-gallery-create',
        component: () => import('../views/account/galleries/AccountGalleryCreate.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/u/:id',
        name: 'UserProfile',
        component: () => import('../views/users/UserProfileInfo.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/u/:id/images',
        name: 'UserProfileImages',
        component: () => import('../views/users/UserProfileImages.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/u/:id/galleries',
        name: 'UserProfileGalleries',
        component: () => import('../views/users/UserProfileGalleries.vue'),
        meta: { requiresAuth: true },
    },
    {path: '/:pathMatch(.*)*', component: () => import('../views/Page404.vue'), name: 'page404'},
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (to.name === 'page404') {
        return next();
    }

    const authStore = useAuthStore();

    if (to.meta.guestOnly && authStore.user) {
        return next({name: 'account'});
    } else if (to.meta.requiresAuth && !authStore.user) {
        return next({name: "login"});
    }

    next();
});

export default router;