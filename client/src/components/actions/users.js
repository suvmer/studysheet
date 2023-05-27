import { fetchUser, login, logoutAct } from '../../store/profileReducer';
import AuthService from '../../services/AuthService';
import UtilsService from '../../services/UtilsService';
import axios from 'axios';
import { API_URL } from '../../http';

const users =
[
    {
        id: 1,
        name: "Сергей",
        currentTable: 1,
        ownTables: [1]
    }
]

export const getUser = (id) => {
  return async (dispatch) => {
      const response = users.find(el => el.id==id);
      console.log(`getUser(${id}) dispatched`, response);
      //const response = axios.get('https://api.github.com/users/suvmer');
      dispatch(fetchUser(response));
  }
}


export const sendLogin = (email, password) => {
    return async (dispatch, getState) => {
        //console.log(email, password, getState().profile.isLogged)
        if(getState().profile.isLogged)
            return;
        const response = await AuthService.login(email, password);
        
        if(!response.data.user)
            return;
        dispatch(login(response.data.user, response.data.refreshToken, response.data.accessToken));
    }
  }
export const sendReg = (name, email, password, info) => {
    return async (dispatch, getState) => {
        if(getState().profile.isLogged)
            return;
        console.log(name, email, password, info);
        const response = await AuthService.register(name, email, password, info);
        if(!response.data.user)
            return;
        alert(`На вашу почту ${email} отправлено письмо для подтверждения аккаунта`)
        dispatch(login(response.data.user, response.data.refreshToken, response.data.accessToken));
    }
}
export const logout = () => {
    return async (dispatch, getState) => {
        try {
            if(!getState().profile.isLogged)
                return;
            await AuthService.logout();
            dispatch(logoutAct());
        } catch(e) {
            alert(e.response?.data?.message)
        }
    }
  }

  export const checkAuth = () => {
    return async (dispatch, getState) => {
        try {
            console.log(document.cookie);
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            //const response = await axios({withCredentials: true}).get(`${API_URL}/refresh`)
            console.log("refresh: ", response)

            if(!response.data.user)
                return;
            dispatch(login(response.data.user, response.data.refreshToken, response.data.accessToken));
        } catch(e) {
            alert(e.response?.data?.message)
        }
    }
  }
  
  
  export const getCity = () => {
    try {
        return async (dispatch) => await UtilsService.getCity();
    } catch(e) {
        alert(e);
        //const newch = Object.assign(document.createElement("div"), {innerHTML: `${e}`});
        //document.getElementById("ddd").appendChild(newch);
    }
  }