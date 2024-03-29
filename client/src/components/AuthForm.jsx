import React, { useState } from "react";
import { DarkButton, SmallButton } from "./UI/Buttons";
import { useDispatch } from "react-redux";
import { sendLogin, sendReg } from "./actions/users";
import { validateLoginData, validateRegData } from "../utils/utils";
import UIService from "../services/UIService";

export const AuthForm = (props) => {
  const [formData, setformData] = useState({"info": {}});
  const [isSignIn, setSign] = useState(props.login ?? false);
  const [errorText, setErrorText] = useState("");
  const dispatch = useDispatch();

  const changeEv = event =>
    handleChange(event.target.name, event.target.value, event.target.getAttribute('forer'));
  
  const handleChange = (name, newvalue, forer) => {
    forer ? setformData({...formData, info: {...formData.info, [name]: newvalue}}) : setformData({...formData, [name]: newvalue})
  }

  const sendSignIn = () => {
    if(validateLoginData(formData))
      dispatch(sendLogin(formData.email, formData.password))
        .then(UIService.closeModals, e => setErrorText(e.response?.data?.message));
  }
  const sendSignUp = () => {
    if(validateRegData(formData))
      dispatch(sendReg(formData.name, formData.email, formData.password, formData.info))
        .then(UIService.closeModals, e => setErrorText(e.response?.data?.message));
  }

  return <form onSubmit={(e) => e.preventDefault()} className="modal_in">
    {isSignIn ? <>
      <p>Авторизируйтесь</p>
      {errorText ? <p className="error_label">{errorText}</p> : ""}
      <input
        placeholder="Почта"
        autoFocus
        onChange={changeEv} 
        name="email" 
        type="email" 
        title="Пример: amogus@mail.ru" 
        pattern="^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$"
        value={formData.email??""}
        autoComplete="on"
        required />
      <input 
        placeholder="Пароль"
        onChange={changeEv}
        name="password"
        type="password"
        value={formData.password??""}
        autoComplete="on"
        required/>
      <DarkButton type="submit" onClick={() => sendSignIn()}>Войти</DarkButton>
      <div className="portal_regbtn"><SmallButton onClick={() => setSign(false)}>Регистрация</SmallButton></div>
    </> : <>
      <p>Регистрация</p>
      {errorText ? <p className="error_label">{errorText}</p> : ""}
      <input
        placeholder="Имя(Фамилия)"
        onChange={changeEv}
        name="name"
        type="text"
        value={formData.name??""}
        minLength={2}
        maxLength={20}
        title="Иван или Иван Попов"
        pattern="^[a-zA-Zа-яА-Я_\-]{2,20}( [a-zA-Zа-яА-Я_\-]{2,20})?$"
        autoComplete="on"
        required/>
      <input
        placeholder="Почта"
        onChange={changeEv} 
        name="email" 
        type="email" 
        title="Пример: amogus@mail.ru" 
        pattern="^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$"
        value={formData.email??""}
        autoComplete="on"
        required/>
      <input  
        placeholder="Пароль"
        onChange={changeEv}
        name="password" 
        type="password" 
        value={formData.password??""}
        autoComplete="on"
        required/>
      <input 
        placeholder="Вуз(школа)" 
        onChange={changeEv} 
        forer="info" 
        name="university" 
        type="text" 
        minLength={2}
        maxLength={20}
        title="Название вуза от 2 до 20 символов" 
        pattern="^[a-zA-Zа-яА-Я_ \-0-9]{2,20}$"
        autoComplete="on"
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
        autoComplete="on"
        required/>
      <DarkButton type="submit" onClick={() => sendSignUp()}>Зарегистрироваться</DarkButton>
      <div className="portal_regbtn"><SmallButton onClick={() => setSign(true)}>Авторизация</SmallButton></div>
    </>}
  </form>;
};
