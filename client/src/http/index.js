import axios from "axios";
import { useDispatch } from "react-redux";
import { checkAuth } from "../components/actions/users";

export const API_URL = 'http://localhost:5000/api';

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
    const originalRequest = error.config;
    const dispatch = useDispatch();
    if(error.response.status == 401) {
        dispatch(checkAuth());
        return api.request(originalRequest);
    }
})

export default api;