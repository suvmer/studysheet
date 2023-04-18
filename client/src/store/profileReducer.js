const defaultState = {
  skipStart: false, //for skip start info modal
  score: 0,
  money: 0,
  games: [], //history
  isLoaded: false, //for waitng server responce(or offile mode(check v3.0 desc in info.txt))
};

export const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
