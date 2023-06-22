import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendNewInfo } from "./actions/users";
import { DarkButton } from "./UI/Buttons";
import UIService from "../services/UIService";

export const ChangeInfoForm = () => {
  const user = useSelector(state => state.profile.user);
  const [formData, setformData] = useState({university: user.info.university, city: user.info.city});
  const [isSuccess, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");
  //setformData({university: user.info.university, city: user.info.city});
 
  const changeEv = event =>
    handleChange(event.target.name, event.target.value);

  const handleChange = (name, newvalue) =>
    setformData({...formData, [name]: newvalue})


  const dispatch = useDispatch();

  const sendData = () => {
    if(!formData.university || !formData.city)
        return setErrorText("Введите корректные данные");
    dispatch(sendNewInfo(formData))
      .then((res) => UIService.showPopup("Данные успешно изменены!"), e => setErrorText(e.response?.data?.message));
  }
    return <form onSubmit={(e) => e.preventDefault()} className="modal_in">
        <p className="mid">Редактирование профиля</p>
        {errorText ? <p className="error_label">{errorText}</p> : ""}
        <label htmlFor="city">Город</label>
        <input 
            id="city"
            placeholder="Город" 
            title="Название города от 2 до 20 символов" 
            onChange={changeEv} 
            value={formData.city ?? ""}
            name="city" 
            type="text" 
            minLength={2}
            maxLength={20}
            pattern="^[a-zA-Zа-яА-Я _\-]{2,20}$"
            autoComplete="on"
            required/>
        <label htmlFor="university">Место учёбы</label>
        <input 
            id="university"
            placeholder="Вуз(школа)" 
            onChange={changeEv}
            value={formData.university ?? ""} 
            name="university" 
            type="text" 
            minLength={2}
            maxLength={20}
            title="Название вуза от 2 до 20 символов" 
            pattern="^[a-zA-Zа-яА-Я_ \-0-9]{2,20}$"
            autoComplete="on"
            required/>
        <DarkButton type="submit" onClick={() => sendData()}>Изменить данные</DarkButton>
    </form>
}
