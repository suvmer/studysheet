import React from "react";
import { AuthForm } from "../components/AuthForm";
import { store } from "../store"
import { setModal } from "../store/uiReducer";
import { ChangePassForm } from "../components/ChangePassForm";
import { ChangeInfoForm } from "../components/ChangeInfo";

const Popup = ({children}) => <div className="modal_in"><div className="box">
                        <p className="big">{children}</p>
                    </div>
                </div>
export default class UIService {
    static openAuthForm(login = false) {
        store.dispatch(setModal(<AuthForm login={login}/>));
    }
    static openChangePass() {
        store.dispatch(setModal(<ChangePassForm/>));
    }
    static openChangeInfo() {
        store.dispatch(setModal(<ChangeInfoForm/>));
    }
    static showPopup(text) {
        store.dispatch(setModal(<Popup>{text}</Popup>));
    }
    static closeModals() {
        store.dispatch(setModal(null));
    }
}
