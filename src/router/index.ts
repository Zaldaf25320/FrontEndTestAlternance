import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import EnterprisesPage from '../views/EnterprisesPage.vue';
import * as process from "node:process";
import RegisterPage from "../views/RegisterPage.vue";
import authService from "../services/authService";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/enterprises',
    name: 'Enterprises',
    component: EnterprisesPage,
    beforeEnter: (to, from, next) => {
      const user = authService.getCurrentUser();

      if (!user) {
        return next({ name: 'Login' });
      }
      next();
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation guard to redirect to login if not authenticated
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user'); // Simple check for auth
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
