import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/category',
        name: 'Category',
        component: () => import("@/views/Category.vue"),
    },
    {
        path: '/forum',
        name: 'Forum',
        component: () => import("@/views/Forum.vue"),
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import("@/views/Detail.vue"),
    },
    {
        path: '/authors',
        name: 'Authors',
        component: () => import("@/views/Authors.vue"),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login.vue"),
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import("@/views/Signup.vue"),
    },
    {
        path: '/information',
        name: 'Information',
        component: () => import("@/views/Information.vue"),
    },
    {
        path: '/CreatingCenter',
        name: 'CreatingCenter',
        component: () => import("@/views/CreatingCenter.vue"),
    },
    {
        path: '/item/:id',
        name: 'item',
        component: () => import("@/views/Item.vue"),
        props: true // 允许通过props将路由参数传递给组件
    },
    {
        path: '/Game',
        name: 'Game',
        component: () => import("@/views/Game.vue"),
    },
    {
        path: '/UserHome',
        name: 'UserHome',
        component: () => import("@/views/UserHome.vue"),
    },
    {
        path: '/UserSpace',
        name: 'UserSpace',
        component: () => import("@/views/UserSpace.vue"),
    },
    {
        path: '/Contribution',
        name: 'Contribution',
        component: () => import("@/views/Contribution.vue"),
    },
    {
        path: '/ManageFans',
        name: 'ManageFans',
        component: () => import("@/views/ManageFans.vue"),
    },
    {
        path: '/my-info',
        name: 'MyInfo',
        component: () => import("@/views/MyInfo.vue"),
    },
    {
        path: '/myHistory',
        name: 'MyHistory',
        component: () => import("@/views/MyHistory.vue"),
    },

    {
        path: '/Interactions',
        name: 'Interactions',
        component: () => import("@/views/InteractiveManagement.vue"),
    },
]

const router = new VueRouter({
    routes,
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    }
})

export default router
