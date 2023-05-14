import React, { useReducer, useState } from "react";

export const Login = () => {

  const changeEv = event => {
    handleChange(event.target.parentNode.getAttribute('indx'), event.target.parentNode.getAttribute('indxer'), event.target.name, event.target.value);
  }

  const handleChange = (idChange, idFor, namer, value) => {
    
  }
  
 
  return (<div className="login">
        <input onChange={changeEv} name="name" type="email" placeholder="Почта"/>
        <input onChange={changeEv} name="name" type="password" placeholder="Пароль"/>
        <div className="btn">Войти</div>
        </div>);
};
