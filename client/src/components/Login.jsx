import React, { useReducer, useState } from "react";
import { DarkButton } from "./UI/Buttons";

export const Login = () => {

  const changeEv = event => {
    handleChange(event.target.parentNode.getAttribute('indx'), event.target.parentNode.getAttribute('indxer'), event.target.name, event.target.value);
  }

  const handleChange = (idChange, idFor, namer, value) => {
    
  }
  
 
  return (<div className="login">
        <input onChange={changeEv} name="name" type="email" placeholder="Почта"/>
        <input onChange={changeEv} name="name" type="password" placeholder="Пароль"/>
        <DarkButton>Войти</DarkButton>
        </div>);
};
