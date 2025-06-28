import { useState, useEffect } from "react";

// Helper to decode JWT and check expiration
function isTokenValid(token: string | null): boolean {
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (!payload.exp) return false;
        // exp is in seconds, Date.now() is in ms
        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (isTokenValid(token)) {
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return { isAuthenticated, logout };
}

export default useAuth;