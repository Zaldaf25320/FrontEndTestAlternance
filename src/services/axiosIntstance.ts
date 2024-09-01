import axios from 'axios';

// Crée une instance Axios avec une configuration de base
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api', // Remplacez par votre URL de base API
});

// Ajoute un interceptor pour ajouter le token JWT à chaque requête
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('jwtToken');

    // Vérifiez si le token est bien au format string
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {
    // Gère les erreurs ici si nécessaire
    return Promise.reject(error);
});

export default axiosInstance;