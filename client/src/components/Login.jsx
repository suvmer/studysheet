import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { DarkButton, DarkSmallButton, SmallButton } from "./UI/Buttons";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/uiReducer";

export const Login = () => {

  const changeEv = event => {
    handleChange(event.target.parentNode.getAttribute('indx'), event.target.parentNode.getAttribute('indxer'), event.target.name, event.target.value);
  }

  const handleChange = (idChange, idFor, namer, value) => {
    
  }

  const dispatch = useDispatch();

  const mount = document.getElementById("portal");
  const el = document.createElement("div");

  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);


  const ref = useRef(null);
  const setVisible = (value) => dispatch(setLogin(value));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);


  return createPortal(<div ref={ref} className="login">
    <p>Авторизируйтесь</p>
  <input onChange={changeEv} name="name" type="email" placeholder="Почта"/>
  <input onChange={changeEv} name="name" type="password" placeholder="Пароль"/>
  <DarkButton>Войти</DarkButton>
  <div className="login_regbtn"><SmallButton>Регистрация</SmallButton></div>
  </div>, el);
};



const Portal = ({children}) => {
  

 

  
};