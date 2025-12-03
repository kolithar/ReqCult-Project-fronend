import API, { setAccessToken } from "./api";

interface RegisteDataType {
    name: string;
    email: string;
    password: string;
    role?: string;
}

interface LoginPayload {
    email: string;
    password: string;
}

interface AuthResponse {
    accessToken: string;
    user: { id: string; name: string; email: string; roles: string[] };
}

export const register = (data: RegisteDataType) => {
    return API.post("/auth/register", data);
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await API.post<AuthResponse>("/auth/login", payload);
    setAccessToken(res.data.accessToken);
    return res.data;
};

export const refresh = async (): Promise<string> => {
    const res = await API.post("/auth/refresh", {}, { withCredentials: true });
    setAccessToken(res.data.accessToken);
    return res.data.accessToken;
};

export const logout = async (): Promise<void> => {
    await API.post("/auth/logout");
    setAccessToken(null);
};
