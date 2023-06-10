/* near TODO:
1) Получать данные с сервака сначала про ид таблиц, которыми владеет пользователь
2) Затем получать с сервака инфу о нужном расписании
*/
const GET_USER = "GET_USER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const defaultState = {
  isLogged: false,
  user: {},
  users: []
};

export const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER:
      if(!action.payload)
        return state;
      let fndd = state.users.findIndex(el => el.id == action.payload.id);
      if(fndd == -1)
        return {
          ...state,
          users: [...state.users, action.payload]
        };

      return {
        ...state,
        users: state.users.map((user, id) => id == fndd ? action.payload : user)
      };
    case LOGIN:
      if(state.isLogged || !action.payload)
        return state;
      console.log(action.payload)
      localStorage.setItem('token', action.payload.accessToken);
      return {...state, isLogged: true, user: {...action.payload.user, info: JSON.parse(action.payload.user.info)}};
    case LOGOUT:
      if(!state.isLogged)
        return state;
      localStorage.removeItem('token');
      return {...state, isLogged: false, user: {}};
    default:
      return state;
  }
};

export const fetchUser = (user) => ({type: GET_USER, payload: user})
export const login = (user, refreshToken, accessToken) => ({type: LOGIN, payload: {user: user, refreshToken: refreshToken, accessToken: accessToken}})
export const logoutAct = () => ({type: LOGOUT})
