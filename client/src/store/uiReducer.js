const defaultState = {
    time: Date.now(),
    loginOpen: false,
    chpwOpen: false,
    infoOpen: false
};

export const SETTIME = "SETTIME";
export const SETLOGIN = "SETLOGIN";
export const SETCHWP = "SETCHWP";
export const SETINFOOPEN = "SETINFOOPEN";

  
export const uiReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SETTIME:
            return {...state, time: action.payload};
        case SETLOGIN:
            return {...state, loginOpen: action.payload};
        case SETCHWP:
            return {...state, chpwOpen: action.payload};
        case SETINFOOPEN:
            return {...state, infoOpen: action.payload};
    }
    return state;
};

export const setTime = (time) => ({type: SETTIME, payload: time});
export const setLogin = (open) => ({type: SETLOGIN, payload: open});
export const setChpw = (open) => ({type: SETCHWP, payload: open});
export const setInfoOpen = (open) => ({type: SETINFOOPEN, payload: open});