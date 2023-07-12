import { BACKEND_URL } from "../constants";

export default class AuthService {
    static login = async (username: string, password: string) => {
        const response = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Basic ${btoa(`${username}:${password}`)}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;
    }
}