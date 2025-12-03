import React, { createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import * as AuthService from "../services/auth.service";
import { setUser, clearUser } from "../store/slices/authSlice";
import type { AppDispatch } from "../store";

type AuthContextType = {
    login: (email: string, password: string) => Promise<void>;
    register: (payload: { name: string; email: string; password: string; role?: string }) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();

    const login = async (email: string, password: string) => {
        const data = await AuthService.login({ email, password });
        dispatch(setUser(data.user));
    };

    const register = async (payload: { name: string; email: string; password: string; role?: string }) => {
        await AuthService.register(payload);
    };

    const logout = async () => {
        await AuthService.logout();
        dispatch(clearUser());
    };

    return (
        <AuthContext.Provider value={{ login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
    return ctx;
};
