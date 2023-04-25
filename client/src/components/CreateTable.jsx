import React, { useState } from "react";
import classes from "../styles/UI/CreateTable.module.css";
import { InfoBlock } from "./InfoBlock";
//import {TimePicker} from 'react-ios-time-picker';
//import {TimePicker} from 'react-time-picker';
import { TimePicker } from 'antd';
import * as dayjs from 'dayjs'
import { useSelector } from "react-redux";

export const CreateTable = () => {
  
  /*
  const table = [[{
    start: Date.now() + 20*60*1000 + 10000,
    duration: 35,
    name: "Пара математического анализа",
    cabinet: "405",
    teacher: "Ухалов Алексей Юрьевич",
    place: "2 корпус(ул. Кирова, 8/10)"
  }], [], [], [], [], [], []];*/
  //const table = [[], [], [], [], [], [], []];
  const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

  const getField = () => ({
    start: Date.now(),
    duration: 95,
    name: "",
    cabinet: "",
    teacher: "",
    place: "7 корпус(Союзная 144)" });

  const [table, setTable] = useState([
    ...Array(7).fill([getField()])
  ]);

  const addSubj = (index) => {
    setTable(table.map((elem, ind) => index == ind ? [...table[index], getField()] : elem));
  };
  console.log(table)
  const selectTime = time => {
    console.log(time);
  }
  const handleChange = event => {
    console.log(event.target.name, event.target.value);
  }

  const defs = useSelector(state => state.table.schedules[0]);

  const getDefaultSchedule = (ind) => {
    return [dayjs('01.01.01 '+defs[Math.min(defs.length-1, ind)][0]), dayjs('01.01.01 '+defs[Math.min(defs.length-1, ind)][1])];
  }
  return (<>
        {table.map((elem, index) => {
          return (
            <div key={index} className="mup">
              <mark className="big center">{days[index]}</mark>
              {elem.map((subj, ind) => (<div className="subject"><div className="mid">#{ind+1}.</div>
                <input onChange={handleChange} name="name" placeholder="Название" defaultValue={subj.name}/>
                <input onChange={handleChange} name="cabinet" placeholder="Кабинет" defaultValue={subj.cabinet}/>
                <input onChange={handleChange} name="start" placeholder="Время начала" defaultValue={subj.start}/>
                <input onChange={handleChange} name="place" placeholder="Место" defaultValue={subj.place}/>
                {/*<TimePicker name="time" onChange={handleChange} value={'10:00'} />*/}
                {/*<TimePicker name="time" onChange={selectTime} value={'10:00'} />*/}
                <TimePicker.RangePicker defaultValue={getDefaultSchedule(ind)} format={"HH:mm"} minuteStep={5} placeholder={["Начало", "Конец"]} />
              </div>)
              )}
              <div onClick={() => addSubj(index)} className="btn mup">Добавить предмет</div>
            </div>
          )
        })}
        </>);

  const toPaste = [];
  days.forEach((elem) => {
    
    toPaste.push(
      <div className="mup">
        <mark className="big center">{elem}</mark>
        <div className="btn">Добавить предмет</div>
      </div>
    );
  });

  
  return <>
<div className="midbox">
  <div className="big">Добавить расписание</div>
</div>
<div className="midbox">
  <input className="full" id="idTable" placeholder="ID расписания"/><div className="btn">Добавить</div>
</div>
<hr className="mup"/>
<mark className="big center">Или</mark>
<hr/>
<mark className="big center">Создать новое</mark>
  
<div className="event create">
  <label htmlFor="name">Как назвать расписание?</label>
  <input id="name" placeholder="Название"/>
  <label htmlFor="hours">Сколько часов?</label>
  <input id="hours" placeholder="Часы"/>
  {toPaste}
</div>
  <div className="btn" to="/my/add">Создать</div>

</>;
};
