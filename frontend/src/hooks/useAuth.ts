import { useState, useEffect } from "react";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return { isAuthenticated, logout };
}

export default useAuth;