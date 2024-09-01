import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
});

const app = createApp(App);
app.config.globalProperties.$axios = axiosInstance;

app.use(router);
app.mount('#app');
