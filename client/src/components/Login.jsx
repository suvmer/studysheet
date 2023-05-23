import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { DarkButton } from "./UI/Buttons";

export const Login = () => {

  const changeEv = event => {
    handleChange(event.target.parentNode.getAttribute('indx'), event.target.parentNode.getAttribute('indxer'), event.target.name, event.target.value);
  }

  const handleChange = (idChange, idFor, namer, value) => {
    
  }

  const mount = document.getElementById("portal");
  const el = document.createElement("div");

  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  return createPortal(<div className="login">
  <input onChange={changeEv} name="name" type="email" placeholder="Почта"/>
  <input onChange={changeEv} name="name" type="password" placeholder="Пароль"/>
  <DarkButton>Войти</DarkButton>
  </div>, el);
};



const Portal = ({children}) => {
  

 

  
};