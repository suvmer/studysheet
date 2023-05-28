import React, { useReducer, useState } from "react";
import classes from "../styles/UI/CreateTable.module.css";
import { InfoBlock } from "./InfoBlock";
import { TimePicker } from 'antd';
import * as dayjs from 'dayjs'
import { useSelector } from "react-redux";
import { days } from "../utils/utils";
import { DarkButton } from "./UI/Buttons";
import {FiTrash2, FiRefreshCcw} from 'react-icons/fi'
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai'



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
    //...Array(7).fill([getField()]) //no new instances
    ...Array(7).fill().map(() => [getField()]) //new instances
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
    handleChange(+(event.target.parentNode.parentNode.getAttribute('indx')), +(event.target.parentNode.parentNode.getAttribute('indxer')), event.target.name, event.target.value);
  }

  const handleChange = (idChange, idFor, namer, value) => {
    console.log(`${idChange} ${idFor} ${namer}: ${value}`);
    table[idChange][idFor] = {...(table[idChange][idFor]), [namer]: value};
  }
  const deleteSubject = (idChange, idFor) => {
    console.log({...table[idChange]})
    //for(var i = 0; i < table[idChange].length - 1; i++)
    //  table[idChange][i] = table[idChange][i+1];
    table[idChange] = table[idChange].filter((e, i) => (i != idFor));
    console.log({...table[idChange]})
    console.log(idChange, idFor)
    setTable(table);
    forceUpdate();
  }
  
  console.log("Updated");
  return (<div className="wall wall_subjects">
        <div className="box_nobg box_nobg_header box_nobg_big">
            <p>Создание расписания</p>
        </div>
        {tabler.map((elem, index) => {
          return (<>
            <div key={`mup${index}`} className="newsubject">
              {/* скопировать со знаменателя, вверх, вниз, удалить */}
              <mark className="big center">{days[index]}</mark>
              {elem.map((subj, ind) => (
                <div indx={index} indxer={ind} key={`mupin${index}${ind}`} className="subject">
                <div className="subject_panel">
                  <TimePicker.RangePicker 
                    defaultValue={[dayjs(subj.start), dayjs(subj.end)]} 
                    onChange={(a, b) => {
                    handleChange(index, ind, 'start', a[0].valueOf()); 
                    handleChange(index, ind, 'end', a[1].valueOf())
                  }} 
                  format={"HH:mm"} 
                  minuteStep={5} 
                  placeholder={["Начало", "Конец"]} />
                  <div className="subject_panel_icons">
                    <FiRefreshCcw/>
                    <AiOutlineArrowUp/>
                    <AiOutlineArrowDown/>
                    <FiTrash2 onClick={() => deleteSubject(index, ind)}/>
                  </div>
                </div>
                  <div className="subject_body">
                  <input
                    onChange={changeEv}
                    name="name"
                    placeholder="Название"
                    defaultValue={subj.name}
                    required/>
                  <input
                    onChange={changeEv}
                    name="cabinet"
                    placeholder="Кабинет" 
                    defaultValue={subj.cabinet}/>
                  <input 
                    onChange={changeEv} 
                    name="place" 
                    placeholder="Место" 
                    defaultValue={subj.place}/>
                  <input 
                    onChange={changeEv} 
                    name="teacher" 
                    placeholder="Преподаватель" 
                    defaultValue={subj.teacher}/>
                  {/*
                  TODO: save time without clicking OK button
                  <input type="text" className="form-control js-time-picker" value="02:56"></input>*/}
                </div>
              </div>)
              )}
            </div>
            <DarkButton onClick={() => addSubj(index)}>Добавить предмет</DarkButton>
            </>
          )
        })}
          <DarkButton type="submit" onClick={() => {}}>Создать</DarkButton>
        </div>
        );
};
