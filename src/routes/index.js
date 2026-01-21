import { createWebHistory, createRouter } from 'vue-router'
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Order from "../pages/Order.vue";
import Users from "../pages/Users.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "Login", component: Login },
        { path: "/dashboard", name: "Dashboard", component: Dashboard },
        { path: "/order", name: "Order", component: Order },
        { path: "/users", name: "Categories", component: Users},
    ],
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('user_session');

    if (to.path === '/dashboard' && !token) {
        next('/');
    }
    else if (to.path === '/' && token) {
        next('/dashboard');
    }
    else {
        next();
    }
});

export default router;