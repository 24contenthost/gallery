import {
    createRouter,
    createWebHistory,
    NavigationGuardNext,
    RouteLocationNormalized,
    RouteRecordRaw,
} from "vue-router";
import {useAuthStore} from "@/stores/auth.ts";

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'home', component: () => import('@/views/Explore.vue') },
    { path: '/about', name: 'about', component: () => import('@/views/About.vue') },

    // Auth
    { path: '/auth/login', name: 'login', component: () => import('@/views/auth/Login.vue'), meta: { guestOnly: true } },
    { path: '/auth/register', name: 'register', component: () => import('@/views/auth/Register.vue'), meta: { guestOnly: true } },

    // Account
    { path: '/account', name: 'account', component: () => import('@/views/account/info/Index.vue'), meta: { requiresAuth: true } },
    { path: '/account/info/edit', name: 'account-info-edit', component: () => import('../views/account/info/EditInfo.vue'), meta: { requiresAuth: true } },

    { path: '/account/images', name: 'account-images', component: () => import('@/views/account/images/Index.vue'), meta: { requiresAuth: true } },
    { path: '/account/images/upload', name: 'account-images-upload', component: () => import('@/views/account/images/Upload.vue'), meta: { requiresAuth: true } },

    { path: '/account/galleries', name: 'account-galleries', component: () => import('@/views/account/galleries/Index.vue'), meta: { requiresAuth: true } },
    { path: '/account/galleries/:id', name: 'account-gallery-detail', component: () => import('@/views/account/galleries/Detail.vue'), meta: { requiresAuth: true } },

    // Users (public)
    { path: '/u/:id', name: 'user-info', component: () => import('@/views/users/Info.vue') },
    { path: '/u/:id/images', name: 'user-images', component: () => import('@/views/users/Images.vue') },
    { path: '/u/:id/galleries', name: 'user-galleries', component: () => import('@/views/users/Galleries.vue') },

    // Catch-all
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/Page404.vue') },
]


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