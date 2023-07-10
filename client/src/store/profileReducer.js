const GET_USER = "GET_USER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SELECTSHEET = "SELECTSHEET";
const CHANGEINFO = "CHANGEINFO";

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
      let fndd = state.users.findIndex(el => el.id === action.payload.id);
      if(fndd === -1)
        return {
          ...state,
          users: [...state.users, action.payload]
        };

      return {
        ...state,
        users: state.users.map((user, id) => id === fndd ? action.payload : user)
      };

    case LOGIN:
      if(state.isLogged || !action.payload)
        return state;
      return {...state, isLogged: true, user: {...action.payload.user, info: JSON.parse(action.payload.user.info)}};

    case LOGOUT:
      localStorage.removeItem('token');
      return {...state, isLogged: false, user: {}};

    case SELECTSHEET:
      if(!state.isLogged || !action.payload)
        return state;
      return {...state, user: {...state.user, currentTable: action.payload}};

    case CHANGEINFO:
      if(!state.isLogged || !action.payload)
        return state;
      return {...state, user: {...state.user, info: action.payload}};

    default:
      return state;
  }
};

export const fetchUser = (user) => ({type: GET_USER, payload: user})
export const login = (user, refreshToken, accessToken) => ({type: LOGIN, payload: {user: user, refreshToken: refreshToken, accessToken: accessToken}})
export const logoutAct = () => ({type: LOGOUT})
export const selectSheetAct = (id) => ({type: SELECTSHEET, payload: id})
export const changeInfoAct = (info) => ({type: CHANGEINFO, payload: info})