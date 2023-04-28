import React, { useReducer, useState } from "react";
import classes from "../styles/UI/CreateTable.module.css";
import { InfoBlock } from "./InfoBlock";
import { TimePicker } from 'antd';
import * as dayjs from 'dayjs'
import { useSelector } from "react-redux";

export const CreateTable = () => {
  const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

  const getField = () => ({
    start: Date.now(),
    duration: 95,
    name: "",
    cabinet: "",
    teacher: "",
    place: "7 корпус(Союзная 144)" });

  const [tabler, setTable] = useState([
    ...Array(7).fill([getField()])
  ]);
  const table = tabler;

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const addSubj = (index) => {
    table[index] = [...table[index], getField()];
    setTable(table);
    forceUpdate();
    console.log(tabler)
  };
  const selectTime = time => {
    console.log(time);
  }
  const handleChange = event => {
    console.log(event.target.parentNode.getAttribute('indx'), event.target.name, event.target.value);
    var idChange = event.target.parentNode.getAttribute('indx');
    var idFor = event.target.parentNode.getAttribute('indxer');
    table[idChange][idFor] = Object.assign({}, ...Object.keys(table[idChange][idFor]).map(k => [k] == event.target.name ? ({[k]: event.target.value}) : ({[k]: table[idChange][idFor][k]})));
  }


  const defs = useSelector(state => state.table.schedules[0]);

  const getDefaultSchedule = (ind) => {
    return [dayjs('01.01.01 '+defs[Math.min(defs.length-1, ind)][0]), dayjs('01.01.01 '+defs[Math.min(defs.length-1, ind)][1])];
  }
  console.log("Updated");
  return (<>
        {tabler.map((elem, index) => {
          return (
            <div key={`mup${index}`} className="mup">
              <mark className="big center">{days[index]}</mark>
              {elem.map((subj, ind) => (<div indx={index} indxer={ind} key={`mupin${index}${ind}`} value={index} className="subject"><div className="mid">#{ind+1}.</div>
                <input onChange={handleChange} name="name" placeholder="Название" defaultValue={subj.name}/>
                <input onChange={handleChange} name="cabinet" placeholder="Кабинет" defaultValue={subj.cabinet}/>
                <input onChange={handleChange} name="place" placeholder="Место" defaultValue={subj.place}/>
                <TimePicker.RangePicker defaultValue={getDefaultSchedule(ind)} onChange={selectTime} format={"HH:mm"} minuteStep={5} placeholder={["Начало", "Конец"]} />
              </div>)
              )}
              <div onClick={() => addSubj(index)} className="btn mup">Добавить предмет</div>
            </div>
          )
        })}
        </>);
};
