import axios from "axios";

export const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    withCredentials: true, //auto cookie attachment
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
}) //attachment of auth token for every request

export default api;