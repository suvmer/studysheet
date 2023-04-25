const defaultState = {
  schedules: [
    [['09:00', '10:35'], ['10:45', '12:20'], ['13:20', '14:55'], ['15:05', '16:40']]
  ],
  tables: [
    {
      start: Date.now() + 20*60*1000 + 10000,
      duration: 35,
      name: "Пара математического анализа",
      cabinet: "405",
      teacher: "Ухалов Алексей Юрьевич",
      place: "2 корпус(ул. Кирова, 8/10)"
    },
  ],
};

export const tableReducer = (state = defaultState, action) => {
  if (action.type != "INITIALIZE" && !state.isInitialized) return state;
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "ANSWER":
      return {
        ...state,
        step: Math.min(state.answers.length - 1, state.step + 1),
        answers: state.answers.map((el, i) => {
          if (i == state.step) return action.payload;
          return el;
        }),
      };
    case "CHANGESCORE":
      return { ...state, score: action.payload };
    case "STARTGAME":
      return { ...state, isStarted: true };
    case "CHANGEPAGE":
      return {
        ...state,
        step: Math.min(
          Math.max(0, state.step + action.payload),
          state.questions.length - 1
        ),
      };
    default:
      return state;
  }
};
