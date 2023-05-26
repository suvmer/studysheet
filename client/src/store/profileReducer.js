import AuthService from "../services/AuthService";

/* near TODO:
1) Получать данные с сервака сначала про ид таблиц, которыми владеет пользователь
2) Затем получать с сервака инфу о нужном расписании
*/
const GET_USER = "GET_USER";
const LOGIN = "LOGIN";

const defaultState = {
  isLogged: false,
  user: {
    id: 1,
    name: "Сергей",
    currentTable: 1,
    ownTables: [1]
  },
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
      const response = AuthService.login(action.payload.email, action.payload.password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      return state;
    default:
      return state;
  }
};

export const fetchUser = (user) => ({type: GET_USER, payload: user})
export const login = (email, password) => ({type: LOGIN, payload: {email: email, password: password}})
