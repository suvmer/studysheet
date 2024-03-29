import axios from "axios";
import { checkAuth } from "../components/actions/users";
import { store } from "../store";
import { API_URL } from "../config";

const api = axios.create({
    withCredentials: true, //auto cookie attachment
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
}) //attachment of auth token for every request

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    if(error.response.status === 401 && localStorage.getItem('token')) {
        const originalRequest = error.config;
        console.log("relogin... token: ", localStorage.getItem("token"));
        await store.dispatch(checkAuth());
        return api.request(originalRequest);
    }
    throw error;
})

export default api;