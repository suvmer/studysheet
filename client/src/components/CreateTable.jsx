import React, { useReducer, useState } from "react";
import classes from "../styles/UI/CreateTable.module.css";
import { InfoBlock } from "./InfoBlock";
import { TimePicker } from 'antd';
import * as dayjs from 'dayjs'
import { useSelector } from "react-redux";
import { days } from "../utils/utils";
import { DarkButton, LightButton, SmallButton } from "./UI/Buttons";
import {FiTrash2, FiRefreshCcw, FiPlus} from 'react-icons/fi'
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai'


var globid = 0;

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
    id: globid++,
    place: "7 корпус(Союзная 144)" });

  const [weekPart, setWeekPart] = useState(-1);
  const [tabler, setTable] = useState([
    //...Array(7).fill([getField()]) //no new instances
    ...Array(7).fill().map((el, ind) => [getField()]) //new instances
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
  const moveSubject = (idChange, idFor, up) => {
    if(table[idChange].length <= 1)
      return;
    if(up && idFor == 0)
      return;
    if(!up && idFor == table[idChange].length-1)
      return;
    var newid = up ? (idFor - 1) : (idFor + 1);
    [table[idChange][idFor], table[idChange][newid]] = [table[idChange][newid], table[idChange][idFor]];
    [table[idChange][idFor].start, table[idChange][newid].start] = [table[idChange][newid].start, table[idChange][idFor].start];
    [table[idChange][idFor].end, table[idChange][newid].end] = [table[idChange][newid].end, table[idChange][idFor].end];
    setTable(table);
    forceUpdate();
  }
  
  console.log("Updated");
  return (<div className="wall wall_subjects">
        <div className="box_nobg box_nobg_header box_nobg_big">
            <p>Создание расписания</p>
        </div>
        <div className="box_nobg box_nobg_gap">
            {weekPart != -1 ? <FiTrash2 className="icons_delete" onClick={() => setWeekPart(-1)}/> : ""}
            {weekPart == -1 ? <FiPlus className="icons_add" onClick={() => setWeekPart(0)}/> : (weekPart == 0 ? <DarkButton>Числитель</DarkButton> : <LightButton onClick={() => setWeekPart(0)}>Числитель</LightButton>)}
            {weekPart == -1 ? "" : (weekPart == 1 ? <DarkButton>Знаменатель</DarkButton> : <LightButton onClick={() => setWeekPart(1)}>Знаменатель</LightButton>)}
        </div>
        {tabler.map((elem, index) => {
          return (<>
            <div key={`mup${index}`} className="newsubject">
              <mark className="big center">{days[index]}</mark>
              {elem.map((subj, ind) => (
                <div indx={index} indxer={ind} key={`mupin${index}${ind}`} className={`subject ${subj.id}`}>
                  <div className="subject_panel"> {/* EVERY INPUT MUST HAVE UNIQUE KEY TO BE REPLACED ON DELETE */}
                    <TimePicker.RangePicker 
                      key={`inp_time${index}${ind}${subj.id}`}
                      defaultValue={[dayjs(subj.start), dayjs(subj.end)]} 
                      onChange={(a, b) => {
                      handleChange(index, ind, 'start', a[0].valueOf()); 
                      handleChange(index, ind, 'end', a[1].valueOf())
                    }} 
                    format={"HH:mm"}
                    minuteStep={5} 
                    placeholder={["Начало", "Конец"]} />
                    <div className="subject_panel_icons">
                      {weekPart != -1 ? <FiRefreshCcw/> : ""}
                      <AiOutlineArrowUp onClick={() => moveSubject(index, ind, true)}/>
                      <AiOutlineArrowDown onClick={() => moveSubject(index, ind, false)}/>
                      <FiTrash2 className="subject_panel_icons_delete" onClick={() => deleteSubject(index, ind)}/>
                    </div>
                  </div>
                  <div className="subject_body">
                    <input
                      key={`inp_name${index}${ind}${subj.id}`}
                      onChange={changeEv}
                      name="name"
                      placeholder="Название"
                      defaultValue={subj.name}
                      required/>
                    <input
                      key={`inp_cab${index}${ind}${subj.id}`}
                      onChange={changeEv}
                      name="cabinet"
                      placeholder="Кабинет" 
                      defaultValue={subj.cabinet}/>
                    <input 
                      key={`inp_place${index}${ind}${subj.id}`}
                      onChange={changeEv} 
                      name="place" 
                      placeholder="Место" 
                      defaultValue={subj.place}/>
                    <input 
                      key={`inp_prep${index}${ind}${subj.id}`}
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
