import {
    useContext,
} from 'react';
import {
    useLoaderData
} from 'react-router-dom';

import {
    AuthContext
} from '../contexts/auth-context';

const useAuth = () => {
    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const data = useLoaderData() as { isSession?: boolean };

    const logout = () => {
        setAuthenticated(false);
    }

    const login = () => {
        if (data.isSession) {
            setAuthenticated(true);
        }
    }

    return { authenticated, login, logout };
}

export default useAuth;