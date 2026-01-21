import { reactive } from 'vue';

export const authState = reactive({
    // Check localStorage immediately so refresh doesn't log you out
    isAuthenticated: !!localStorage.getItem('user_session'),

    login(token) {
        localStorage.setItem('user_session', token);
        this.isAuthenticated = true; // Instantly switches App.vue
    },

    logout() {
        localStorage.removeItem('user_session');
        this.isAuthenticated = false; // Instantly switches App.vue
    }
});