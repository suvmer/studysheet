import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DarkButton, DarkButtonMid, DarkSmallButton, SmallButton } from "./UI/Buttons";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/uiReducer";
import { useOnClickOutside } from "../utils/ownHooks";
import { login } from "../store/profileReducer";
import { sendLogin } from "./actions/users";

export const AuthForm = () => {
  var formData = {"info": []};

  const [isSignIn, setSign] = useState(false);
  const setSignIn = (value) => {
    formData = {"info": []}
    setSign(value);
  }

  const changeEv = event =>
    handleChange(event.target.name, event.target.value, event.target.getAttribute('forer'));
  
  const handleChange = (name, value, forer) => {
    forer ? formData["info"][name] = value : formData[name] = value;
    console.log(forer, formData);
  }


  const mount = document.getElementById("portal");
  const el = document.createElement("div");

  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  const dispatch = useDispatch();

  const sendSignIn = () => {
    dispatch(sendLogin(formData.email, formData.password));
  }


  

  const ref = useRef(null);
  useOnClickOutside(ref, setLogin, ["ui", "loginOpen"]);

  return createPortal(<div ref={ref} className="login">
    {isSignIn ? <>
      <p>Авторизируйтесь</p>
      <input autoFocus onChange={changeEv} name="email" type="email" placeholder="Почта"/>
      <input onChange={changeEv} name="password" type="password" placeholder="Пароль"/>
      <DarkButton onClick={() => sendSignIn()}>Войти</DarkButton>
      <div className="login_regbtn"><SmallButton onClick={() => setSignIn(false)}>Регистрация</SmallButton></div>
    </> : <>
      <p>Регистрация</p>
      <input autoFocus onChange={changeEv} name="name" type="text" pattern="^[a-zA-Zа-яА-Я_\-]{2,20}$" placeholder="Имя"/>
      <input onChange={changeEv} name="email" type="email" placeholder="Почта"/>
      <input onChange={changeEv} name="password" type="password" placeholder="Пароль"/>
      <input onChange={changeEv} forer="info" name="unversity" type="text" placeholder="Вуз(школа)" pattern="^[a-zA-Zа-яА-Я_\-]{2,20}$"/>
      <input onChange={changeEv} forer="info" name="city" type="text" placeholder="Город" pattern="^[a-zA-Zа-яА-Я_\-]{2,20}$"/>
      <DarkButtonMid>Зарегистрироваться</DarkButtonMid>
      <div className="login_regbtn"><SmallButton onClick={() => setSignIn(true)}>Авторизация</SmallButton></div>
    </>}
  </div>, el);
};
