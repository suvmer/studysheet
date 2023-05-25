import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DarkButton, DarkSmallButton, SmallButton } from "./UI/Buttons";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/uiReducer";

export const LoginForm = () => {
  const [isRegister, setRegister] = useState(false);
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
    {isRegister ? <>
      <p>Регистрация</p>
      <input onChange={changeEv} name="name" type="text" pattern="^[a-zA-Zа-яА-Я_-]{2,20}$" placeholder="Имя"/>
      <input onChange={changeEv} name="name" type="email" placeholder="Почта"/>
      <input onChange={changeEv} name="name" type="password" placeholder="Пароль"/>
      <input onChange={changeEv} name="name" type="text" pattern="^[a-zA-Zа-яА-Я_-]{2,20}$" placeholder="Вуз(школа)"/>
      <input onChange={changeEv} name="name" type="text" pattern="^[a-zA-Zа-яА-Я_-]{2,20}$" placeholder="Город"/>
      <DarkButton>Зарегистрироваться</DarkButton>
      <div className="login_regbtn"><SmallButton onClick={() => setRegister(false)}>Авторизация</SmallButton></div>
    </> : <>
      <p>Авторизируйтесь</p>
      <input onChange={changeEv} name="name" type="email" placeholder="Почта"/>
      <input onChange={changeEv} name="name" type="password" placeholder="Пароль"/>
      <DarkButton>Войти</DarkButton>
      <div className="login_regbtn"><SmallButton onClick={() => setRegister(true)}>Регистрация</SmallButton></div>
    </>}
  
  </div>, el);
};
