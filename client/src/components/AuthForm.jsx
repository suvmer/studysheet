import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DarkButton, DarkButtonMid, DarkSmallButton, SmallButton } from "./UI/Buttons";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/uiReducer";
import { useOnClickOutside } from "../utils/ownHooks";
import { login } from "../store/profileReducer";
import { getCity, sendLogin } from "./actions/users";
import { validateLoginData } from "../utils/utils";

export const AuthForm = () => {
  var formData = {"info": {}};

  const [isSignIn, setSign] = useState(false);
  const setSignIn = (value) => {
    formData = {"info": {}}
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
    if(validateLoginData(formData))
      dispatch(sendLogin(formData.email, formData.password));
  }


  const ref = useRef(null);
  useOnClickOutside(ref, setLogin, ["ui", "loginOpen"]);

  return createPortal(<form onSubmit={(e) => e.preventDefault()} ref={ref} className="login">
    {isSignIn ? <>
      <p>Авторизируйтесь</p>
      <input
        placeholder="Почта"
        autoFocus
        onChange={changeEv} 
        name="email" 
        type="email" 
        title="Пример: amogus@mail.ru" 
        pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
        required />
      <input 
        placeholder="Пароль"
        onChange={changeEv}
        name="password"
        type="password"
        required/>
      <DarkButton type="submit" onClick={() => sendSignIn()}>Войти</DarkButton>
      <div className="login_regbtn"><SmallButton onClick={() => setSignIn(false)}>Регистрация</SmallButton></div>
    </> : <>
      <p>Регистрация</p>
      <input
        placeholder="Имя"
        autoFocus
        onChange={changeEv}
        name="name"
        type="text"
        minLength={2}
        maxLength={20}
        title="Имя одним словом от 2 до 20 символов"
        pattern="^[a-zA-Zа-яА-Я_\-]{2,20}$"
        required/>
      <input
        placeholder="Почта"
        onChange={changeEv} 
        name="email" 
        type="email" 
        title="Пример: amogus@mail.ru" 
        pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
        required/>
      <input  
        placeholder="Пароль"
        onChange={changeEv} 
        name="password" 
        type="password" 
        required/>
      <input 
        placeholder="Вуз(школа)" 
        onChange={changeEv} 
        forer="info" 
        name="unversity" 
        type="text" 
        minLength={2}
        maxLength={20}
        title="Название вуза от 2 до 20 символов" 
        pattern="^[a-zA-Zа-яА-Я_ \-0-9]{2,20}$"
        required/>
      <input 
        placeholder="Город" 
        title="Название города от 2 до 20 символов" 
        onChange={changeEv} 
        forer="info" 
        name="city" 
        type="text" 
        minLength={2}
        maxLength={20}
        pattern="^[a-zA-Zа-яА-Я _\-]{2,20}$"
        required/>
      <DarkButton type="submit">Зарегистрироваться</DarkButton>
      <div className="login_regbtn"><SmallButton onClick={() => setSignIn(true)}>Авторизация</SmallButton></div>
    </>}
  </form>, el);
};
