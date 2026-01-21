import { createWebHistory, createRouter } from 'vue-router'
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "Login", component: Login },
        { path: "/dashboard", name: "Dashboard", component: Dashboard }
    ],
})

// Simple Guard: This runs before every page change
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('user_session');

    // If user has NO token and tries to go to Dashboard
    if (to.path === '/dashboard' && !token) {
        next('/'); // Send them back to Login
    }
    // If user HAS a token and tries to go to Login
    else if (to.path === '/' && token) {
        next('/dashboard'); // Send them to Dashboard
    }
    else {
        next(); // Carry on as normal
    }
});

export default router;