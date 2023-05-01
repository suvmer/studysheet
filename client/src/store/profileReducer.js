/* near TODO:
1) Получать данные с сервака сначала про ид таблиц, которыми владеет пользователь
2) Затем получать с сервака инфу о нужном расписании
*/

const GET_USER = "GET_USER";

const defaultState = {
  isLogged: true,
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
        if(action.payload == undefined)
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
    default:
      return state;
  }
};

export const fetchUser = (user) => ({type: GET_USER, payload: user})
