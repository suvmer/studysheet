import React, { useReducer, useState } from "react";
import classes from "../styles/UI/CreateTable.module.css";
import { InfoBlock } from "./InfoBlock";
import { TimePicker } from 'antd';
import * as dayjs from 'dayjs'
import { useSelector } from "react-redux";
import { days } from "../utils/utils";

export const CreateTable = () => {

  const defs = useSelector(state => state.table.defs[0]);
  const getDefaultSchedule = (ind) => {
    return [dayjs('01.01.01 '+defs[Math.min(defs.length-1, ind)][0]), dayjs('01.01.01 '+defs[Math.min(defs.length-1, ind)][1])];
  }
  const getField = (i = 0) => ({
    start: getDefaultSchedule(i)[0].valueOf(),
    end: getDefaultSchedule(i)[1].valueOf(),
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
    table[index] = [...table[index], getField(table[index].length)];
    setTable(table);
    forceUpdate();
    console.log(tabler)
  };
  const changeEv = event => {
    handleChange(event.target.parentNode.getAttribute('indx'), event.target.parentNode.getAttribute('indxer'), event.target.name, event.target.value);
  }

  const handleChange = (idChange, idFor, namer, value) => {
    console.log(`${idChange} ${idFor} ${namer}: ${value}`);
    table[idChange][idFor] = Object.assign({}, ...Object.keys(table[idChange][idFor]).map(k => [k] == namer ? ({[k]: value}) : ({[k]: table[idChange][idFor][k]})));
  }


  
  
  console.log("Updated");
  return (<>
        {tabler.map((elem, index) => {
          return (
            <div key={`mup${index}`} className="mup">
              <mark className="big center">{days[index]}</mark>
              {elem.map((subj, ind) => (<div indx={index} indxer={ind} key={`mupin${index}${ind}`} value={index} className="subject"><div className="mid">#{ind+1}.</div>
                <input onChange={changeEv} name="name" placeholder="Название" defaultValue={subj.name}/>
                <input onChange={changeEv} name="cabinet" placeholder="Кабинет" defaultValue={subj.cabinet}/>
                <input onChange={changeEv} name="place" placeholder="Место" defaultValue={subj.place}/>
                <input onChange={changeEv} name="teacher" placeholder="Преподаватель" defaultValue={subj.teacher}/>
                <TimePicker.RangePicker defaultValue={[dayjs(subj.start), dayjs(subj.end)]} onChange={(a, b) => { handleChange(index, ind, 'start', a[0].valueOf()); handleChange(index, ind, 'end', a[1].valueOf()) }} format={"HH:mm"} minuteStep={5} placeholder={["Начало", "Конец"]} />
                {/*
                TODO: save time without clicking OK button
                <input type="text" className="form-control js-time-picker" value="02:56"></input>*/}
              </div>)
              )}
              <div onClick={() => addSubj(index)} className="btn mup">Добавить предмет</div>
            </div>
          )
        })}
        </>);
};
