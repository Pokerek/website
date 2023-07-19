import { BACKEND_URL } from "../constants";


export default class AuthService {
    static login = async (username: string, password: string): Promise<void> => {
        const response = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'GET',
            headers: {
                'authorization': `Basic ${btoa(`${username}:${password}`)}`
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json() as AuthResponse;

        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('expiresAt', data.expiresAt);
    }

    static checkIsSession = async (): Promise<boolean> => {
        const response = await fetch(`${BACKEND_URL}/auth/checkSession`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('expiresAt');
            return false;
        }

        const data = await response.json() as AuthResponse;
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('expiresAt', data.expiresAt);

        return true;
    }

    static logout = async (): Promise<void> => {
        const response = await fetch(`${BACKEND_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        sessionStorage.removeItem('username');
        sessionStorage.removeItem('expiresAt');
    }
}