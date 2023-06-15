import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { setChpw } from "../store/uiReducer";
import { useOnClickOutside } from "../utils/ownHooks";
import { useDispatch } from "react-redux";
import { sendChpw } from "./actions/users";
import { DarkButton } from "./UI/Buttons";

const Form = () => {
  const [formData, setformData] = useState({});
  const [isSuccess, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");
  
  const changeEv = event =>
    handleChange(event.target.name, event.target.value);

  const handleChange = (name, newvalue) =>
    setformData({...formData, [name]: newvalue})

  const dispatch = useDispatch();

  const sendData = () => {
    if(!formData.oldpassword || !formData.password || !formData.repeatpassword)
        return setErrorText("Введите корректные данные");
    if(formData.password !== formData.repeatpassword)
        return setErrorText("Пароли не совпадают!");
    dispatch(sendChpw(formData))
      .then(() => setSuccess(true), e => setErrorText(e.response?.data?.message));
  }
    return <form onSubmit={(e) => e.preventDefault()} className="portal">
        {!isSuccess ? <>
        <p className="mid">Смена пароля</p>
        {errorText ? <p className="error_label">{errorText}</p> : ""}
        <input 
            placeholder="Старый пароль"
            onChange={changeEv}
            value={formData.oldpassword ?? ""}
            name="oldpassword"
            type="password"
            autoComplete="on"
            required/>
        <input 
            placeholder="Новый пароль"
            onChange={changeEv}
            name="password"
            value={formData.password ?? ""}
            type="password"
            autoComplete="on"
            required/>
        <input 
            placeholder="Новый пароль ещё раз"
            onChange={changeEv}
            name="repeatpassword"
            value={formData.repeatpassword ?? ""}
            type="password"
            autoComplete="on"
            required/>
        <DarkButton type="submit" onClick={() => sendData()}>Сменить пароль</DarkButton>
        </> : <>
            <div className="box">
                <p className="big">Пароль был успешно сменён!</p>
            </div>
        </>}
    </form>
}
export const ChangePassPortal = () => {
  const mount = document.getElementById("portal");
  const el = document.createElement("div");

  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  const ref = useRef(null);
  useOnClickOutside(ref, setChpw, ["ui", "chpwOpen"]);

  return createPortal(<div ref={ref}>
    <Form/>
  </div>, el);
};
