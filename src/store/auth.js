import { reactive } from 'vue';

export const authState = reactive({
    isAuthenticated: !!localStorage.getItem('token'),

    login(token) {
        localStorage.setItem('token', token);
        this.isAuthenticated = true;
    },

    logout() {
        localStorage.removeItem('token');
        this.isAuthenticated = false;
    }
});