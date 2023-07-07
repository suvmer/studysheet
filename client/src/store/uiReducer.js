const defaultState = {
    time: Date.now(),
    modal: null,
    loginOpen: false,
    menuOpen: false
};

export const SETTIME = "SETTIME";
export const SETLOGIN = "SETLOGIN";
export const SETMENUOPEN = "SETMENUOPEN";
export const SETMODAL = "SETMODAL";
  
export const uiReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SETTIME:
            return {...state, time: action.payload};
        case SETLOGIN:
            return {...state, loginOpen: action.payload};
        case SETMENUOPEN:
            return {...state, menuOpen: action.payload};
        case SETMODAL:
            return {...state, modal: action.payload};
    }
    return state;
};

export const setTime = (time) => ({type: SETTIME, payload: time});
export const setLogin = (open) => ({type: SETLOGIN, payload: open});
export const setMenuOpen = (open) => ({type: SETMENUOPEN, payload: open});
export const setModal = (content) => ({type: SETMODAL, payload: content});