
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

interface User {
    token: string;
    [key: string]: any;
}

class AuthService {
    login(email: string, password: string): Promise<User> {
        return axios
            .post(`${API_URL}/login`, {
                email,
                password,
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('jwtToken', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout(): void {
        localStorage.removeItem('jwtToken');
    }

    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }
}

export default new AuthService();