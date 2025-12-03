import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api", // match  backend
    withCredentials: true,
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
    accessToken = token;
};

API.interceptors.request.use((config) => {
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default API;
