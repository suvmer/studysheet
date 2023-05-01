const GET_TABLES = "GET_TABLES";
const GET_TABLE = "GET_TABLE";

const defaultState = {
  defs: [
    [['09:00', '10:35'], ['10:45', '12:20'], ['13:20', '14:55'], ['15:05', '16:40']]
  ],
  tables: [],/*[
    {
      start: Date.now() + 20*60*1000 + 10000,
      end: Date.now() + 20*60*1000 + 10000,
      duration: 35,
      name: "Пара математического анализа",
      cabinet: "405",
      teacher: "Ухалов Алексей Юрьевич",
      place: "2 корпус(ул. Кирова, 8/10)"
    },
  ],*/
  schedules: [],
  users: []
};

export const tableReducer = (state = defaultState, action) => {
  //if (action.type != "INITIALIZE" && !state.isInitialized) return state;
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case GET_TABLES:
      return {
        ...state,
        tables: action.payload
      };
    case GET_TABLE:
      if(action.payload == undefined)
        return state;
      let fnd = state.schedules.findIndex(el => el.id == action.payload.id);
      if(fnd == -1)
        return {
          ...state,
          schedules: [...state.schedules, action.payload]
        };

      return {
        ...state,
        schedules: state.schedules.map((schedule, id) => id == fnd ? action.payload : schedule)
      };
    default:
      return state;
  }
};

export const fetchTables = (tables) => ({type: GET_TABLES, payload: tables})
export const fetchTable = (table) => ({type: GET_TABLE, payload: table})