const defaultState = {
    time: Date.now(),
};

export const SETTIME = "SETTIME";
  
export const uiReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SETTIME:
            return {...state, time: action.payload};
    }
    return state;
};

export const setTime = (time) => ({type: SETTIME, payload: time});