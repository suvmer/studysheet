import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DarkButton, DarkButtonMid, DarkSmallButton, SmallButton } from "./UI/Buttons";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/uiReducer";
import { useOnClickOutside } from "../utils/ownHooks";
import { login } from "../store/profileReducer";
import { getCity, sendLogin } from "./actions/users";

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

  dispatch(getCity());

  

  const ref = useRef(null);
  useOnClickOutside(ref, setLogin, ["ui", "loginOpen"]);

  return createPortal(<form ref={ref} className="login">
    {isSignIn ? <>
      <p>Авторизируйтесь</p>
      <input required autoFocus onChange={changeEv} name="email" type="email" title="Пример: amogus@mail.ru" placeholder="Почта"/>
      <input required onChange={changeEv} name="password" type="password" placeholder="Пароль"/>
      <DarkButton type="submit" onClick={() => sendSignIn()}>Войти</DarkButton>
      <div className="login_regbtn"><SmallButton onClick={() => setSignIn(false)}>Регистрация</SmallButton></div>
    </> : <>
      <p>Регистрация</p>
      <input required autoFocus onChange={changeEv} name="name" type="text" title="Имя одним словом от 2 до 20 символов" pattern="^[a-zA-Zа-яА-Я_\-]{2,20}$" placeholder="Имя"/>
      <input required onChange={changeEv} name="email" type="email" title="Пример: amogus@mail.ru" placeholder="Почта"/>
      <input required onChange={changeEv} name="password" type="password" placeholder="Пароль"/>
      <input required onChange={changeEv} forer="info" name="unversity" type="text" title="Название вуза от 2 до 20 символов" placeholder="Вуз(школа)" pattern="^[a-zA-Zа-яА-Я_ \-0-9]{2,20}$"/>
      <input required onChange={changeEv} forer="info" name="city" type="text" title="Название города от 2 до 20 символов" placeholder="Город" pattern="^[a-zA-Zа-яА-Я _\-]{2,20}$"/>
      <DarkButton type="submit">Зарегистрироваться</DarkButton>
      <div className="login_regbtn"><SmallButton onClick={() => setSignIn(true)}>Авторизация</SmallButton></div>
    </>}
  </form>, el);
};
