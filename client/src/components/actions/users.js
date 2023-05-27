import axios from 'axios';
import { fetchUser, login } from '../../store/profileReducer';
import AuthService from '../../services/AuthService';

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
      if(getState().profile.isLogged)
        return;
      const response = await AuthService.login(email, password);
      console.log(response);
      if(!response.data.user)
        return;
      dispatch(login(response.data.user, response.refreshToken, response.accessToken));
    }
  }
  
  
  export const getCity = () => {
    //https://api-maps.yandex.ru/2.0-stable/?load=package.standard&lang=ru-RU
  }