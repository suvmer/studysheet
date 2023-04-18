const defaultState = {
  tables: [
    {
      start: Date.now() + 10*60*1000,
      duration: 60,
      name: "Пара математического анализа",
      cabinet: "405",
      place: "2 корпус(ул. Кирова, 8/10)",
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
