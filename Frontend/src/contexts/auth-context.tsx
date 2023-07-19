import {
    createContext,
    ReactNode,
    useState,
} from 'react';

interface AuthContextStructure {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void;
}

const initialVal: AuthContextStructure = {
    authenticated: false,
    setAuthenticated: () => { return; },
};

export const AuthContext = createContext<AuthContextStructure>(initialVal);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(initialVal.authenticated);

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

