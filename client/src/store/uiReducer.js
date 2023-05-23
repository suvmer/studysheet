const defaultState = {
    time: Date.now(),
    loginOpen: false
};

export const SETTIME = "SETTIME";
export const SETLOGIN = "SETLOGIN";
  
export const uiReducer = (state = defaultState, action) => {
    console.log(state)
    switch (action.type) {
        case SETTIME:
            return {...state, time: action.payload};
        case SETLOGIN:
            return {...state, loginOpen: action.payload};
    }
    return state;
};

export const setTime = (time) => ({type: SETTIME, payload: time});
export const setLogin = (open) => ({type: SETLOGIN, payload: open});