import React from "react";
import classes from "../styles/UI/CreateTable.module.css";
import { InfoBlock } from "./InfoBlock";

export const CreateTable = () => {
  return <><div className="midbox">
  <mark className="big">Добавить расписание</mark>
</div>
<div className="btn" to="/my/add">Добавить существующее</div>
  <div className="midbox center">
    <mark className="big">Или</mark>
  </div>
<div className="event create">
  
  <label for="name">Как назвать расписание?</label>
  <input id="name" placeholder="Название"/>
  <div className="btn" to="/my/add">Добавить</div>
</div></>;
};
