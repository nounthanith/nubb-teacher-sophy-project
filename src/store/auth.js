import { reactive } from 'vue';

export const authState = reactive({
    isAuthenticated: !!localStorage.getItem('user_session'),

    login(token) {
        localStorage.setItem('user_session', token);
        this.isAuthenticated = true;
    },

    logout() {
        localStorage.removeItem('user_session');
        this.isAuthenticated = false;
    }
});