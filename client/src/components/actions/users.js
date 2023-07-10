import { changeInfoAct, login, logoutAct, selectSheetAct } from '../../store/profileReducer';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import UserService from '../../services/UserService';
import { API_URL } from '../../config';


export const sendLogin = (email, password) => {
    return async (dispatch, getState) => {
        if(getState().profile.isLogged)
            return;
        const response = await AuthService.login(email, password);
        if(!response || !response.data || !response.data.user)
            return response?.message ?? "Ошибка";
        localStorage.setItem('token', response.data.accessToken);  
        dispatch(login(response.data.user, response.data.refreshToken, response.data.accessToken));
    }
  }
export const sendReg = (name, email, password, info) => {
    return async (dispatch, getState) => {
        if(getState().profile.isLogged)
            return;
        const response = await AuthService.register(name, email, password, info);
        if(!response.data.user)
            return;
        alert(`На вашу почту ${email} отправлено письмо для подтверждения аккаунта`)
        localStorage.setItem('token', response.data.accessToken);  
        dispatch(login(response.data.user, response.data.refreshToken, response.data.accessToken));
    }
}
export const logout = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(logoutAct());
            await AuthService.logout();
        } catch(e) {
            console.log(e);
        }
    }
  }

  export const sendChpw = (info) => {
    return async (dispatch, getState) => {
        if(!getState().profile.isLogged || !info.oldpassword || !info.password)
            return;
        const response = await AuthService.changePassword(info.oldpassword, info.password);
        if(!response || !response.data)
            throw Error(response?.message ?? "Ошибка"); 
        return "Success";
    }
  }
  export const sendNewInfo = (info) => {
    return async (dispatch, getState) => {
        if(!getState().profile.isLogged || !info.university || !info.city)
            return;
        const response = await AuthService.changeInfo(info.university, info.city);
        if(!response || !response.data?.info)
            throw Error(response?.message ?? "Ошибка"); 
        dispatch(changeInfoAct(response.data.info));
        return "Success";
    }
  }

  export const checkAuth = () => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            if(!response.data.user)
                throw Error("Требуется авторизация");
            localStorage.setItem('token', response.data.accessToken);
            await dispatch(login(response.data.user, response.data.refreshToken, response.data.accessToken));
        } catch(e) {
            console.log(e)
            await dispatch(logout());
        }
    }
  }

  export const selectSheet = (id) => {
    return async (dispatch, getState) => {
        try {
            if(!getState().profile.isLogged)
                return;
            dispatch(selectSheetAct(id));
            const response = await UserService.selectSheet(id);
            if(!response || !response.data)
                throw Error(response?.message ?? "Ошибка");
            return "Успешно";
        } catch(e) {
            console.log(e)
        }
    }
  }