const GET_TABLES = "GET_TABLES";

const defaultState = {
  schedules: [
    [['09:00', '10:35'], ['10:45', '12:20'], ['13:20', '14:55'], ['15:05', '16:40']]
  ],
  tables: []/*[
    {
      start: Date.now() + 20*60*1000 + 10000,
      duration: 35,
      name: "Пара математического анализа",
      cabinet: "405",
      teacher: "Ухалов Алексей Юрьевич",
      place: "2 корпус(ул. Кирова, 8/10)"
    },
  ]*/,
};

export const tableReducer = (state = defaultState, action) => {
  //if (action.type != "INITIALIZE" && !state.isInitialized) return state;
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case GET_TABLES:
      console.log(state, action.payload);
      return {
        ...state,
        tables: action.payload
      };
    default:
      return state;
  }
};

export const fetchTables = (tables) => ({type: GET_TABLES, payload: tables})