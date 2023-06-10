import axios from "axios";
import { checkAuth } from "../components/actions/users";
import { store } from "../store";

export const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    withCredentials: true, //auto cookie attachment
    baseURL: API_URL
});
//const {dispatch} = store;

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
}) //attachment of auth token for every request

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    if(error.response.status == 401) {
        const originalRequest = error.config;
        store.dispatch(checkAuth());
        return api.request(originalRequest);
    }
    throw error;
    //return api.request(originalRequest);
})

export default api;