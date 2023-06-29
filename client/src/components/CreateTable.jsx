import React, { useEffect, useReducer, useState } from "react";
import { TimePicker } from 'antd';
import * as dayjs from 'dayjs'
import { useDispatch, useSelector } from "react-redux";
import { dateToString, days, shortTo, validateTableData } from "../utils/utils";
import { DarkButton, LightButton, SmallButton } from "./UI/Buttons";
import {FiTrash2, FiRefreshCcw, FiPlus, FiArrowLeft} from 'react-icons/fi'
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai'
import { editTable, sendTable } from "./actions/tables";
import { useNavigate } from "react-router-dom";
import { AuthAsk } from "./AuthAsk";


var globid = 0;

export const CreateTable = (props = null) => {
  const [page, setPage] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const defs = useSelector(state => state.table.defs[0]);
  const getDefaultSchedule = (ind) => {
    ind = Math.min(defs.length-1, ind);
    const [starthour, startminute] = defs[ind][0].split(':').map(el => +el);
    const [endhour, endminute] = defs[ind][1].split(':').map(el => +el);
    return [dayjs().hour(starthour).minute(startminute), dayjs().hour(endhour).minute(endminute)];
    //return [dayjs('01.01.01 '+defs[Math.min(defs.length-1, ind)][0]), dayjs('01.01.01 '+defs[Math.min(defs.length-1, ind)][1])];
  }
  const [defPlace, setDefPlace] = useState("");
  const getField = (i = 0) => ({
    start: getDefaultSchedule(i)[0].valueOf(),
    end: getDefaultSchedule(i)[1].valueOf(),
    name: "",
    cabinet: "",
    teacher: "",
    id: globid++,
    place: defPlace });

  const [weekPart, setWeekPart] = useState(-1);
  const [storedSheet, storeSheet] = useState({
    name: "",
    public: true,
    tables: [
    //...Array(7).fill([getField()]) //no new instances
    ...Array(7).fill().map((el, ind) => ind == 0 ? [getField()] : []) //new instances
  ]});
  useEffect(() => {
    if(props?.toedit != null) {
      setEdit(true);
      storeSheet({...props.toedit, tables: props.toedit.tables.map(el => el.map(subel => ({...subel, id: globid++})))});
    }
  }, []);
  
  
  const sheet = storedSheet;
  console.log(sheet);

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const addSubj = (index) => {
    sheet.tables[index] = [...sheet.tables[index], getField(sheet.tables[index].length)];
    doSort(index);
    //storeSheet(sheet);
    //forceUpdate();
    console.log(storedSheet)
  };
  const changeEv = event => {
    handleChange(+(event.target.parentNode.parentNode.getAttribute('indx')), +(event.target.parentNode.parentNode.getAttribute('indxer')), event.target.name, event.target.value);
  }


  const doSort = (id) => {
    //console.log()
    sheet.tables[id].sort((e1, e2) => e1.start - e2.start);
    console.log(sheet.tables[id])
    storeSheet(sheet);
    forceUpdate();
  }

  const handleChange = (idChange, idFor, namer, value) => {
    console.log(`${idChange} ${idFor} ${namer}: ${value}`);
    if(namer == "defPlace") {
      setDefPlace(value);
      return;
    }
    if(namer == "start" || namer == "end") {
      console.log(namer, ":", dayjs(value).format("DD.MM.YYYY HH:mm"))
    }
    if(namer == "sheetName") {
      sheet['name'] = value;
      forceUpdate();
      return;
    }
    if(namer == "pub") { //TODO: публичное ли расписание, школа/вуз/колледж(лучше выбор уроки/пары),
      //TODO: если вуз - числитель и знаменатель или просто пары, название заведения (50%: УЧИТЕЛЯ И ПРЕПОДАВАТЕЛИ К РАСПИСАНИЮ)
      sheet['isPublic'] = value;
      return;
    }
    sheet.tables[idChange][idFor] = {...(sheet.tables[idChange][idFor]), [namer]: value};
    if(namer == 'start')
      doSort(idChange);
  }
  const deleteSubject = (idChange, idFor) => {
    console.log({...sheet.tables[idChange]})
    //for(var i = 0; i < sheet.tables[idChange].length - 1; i++)
    //  sheet.tables[idChange][i] = sheet.tables[idChange][i+1];
    sheet.tables[idChange] = sheet.tables[idChange].filter((e, i) => (i != idFor));
    console.log({...sheet.tables[idChange]})
    console.log(idChange, idFor)
    storeSheet(sheet);
    forceUpdate();
  }

  const moveSubject = (idChange, idFor, up) => {
    console.log("Moving ", idChange, idFor, up)
    if(sheet.tables[idChange].length <= 1)
      return;
    if(up && idFor == 0)
      return;
    if(!up && idFor == sheet.tables[idChange].length-1)
      return;
    var newid = up ? (idFor - 1) : (idFor + 1);
    [sheet.tables[idChange][idFor], sheet.tables[idChange][newid]] = [sheet.tables[idChange][newid], sheet.tables[idChange][idFor]];
    [sheet.tables[idChange][idFor].start, sheet.tables[idChange][newid].start] = [sheet.tables[idChange][newid].start, sheet.tables[idChange][idFor].start];
    [sheet.tables[idChange][idFor].end, sheet.tables[idChange][newid].end] = [sheet.tables[idChange][newid].end, sheet.tables[idChange][idFor].end];
    storeSheet(sheet);
    forceUpdate();
  }

  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const dispatch = useDispatch();
  const sendSchedule = () => {
    if(validateTableData(sheet.tables))
      dispatch(sendTable(sheet))
        .then((succ) => navigate("/my"), e => setErrorText(e.response?.data?.message));
  }
  const editSchedule = () => {
    if(validateTableData(sheet.tables))
      dispatch(editTable(sheet))
        .then((succ) => navigate(`/info/${sheet.id}`), e => setErrorText(e.response?.data?.message));
  }

  
  const user = useSelector(state => state.profile.user);
  if(!user?.id)
    return <div className="wall"><p className="big">Чтобы создавать расписания, войдите:</p><AuthAsk/></div>;

  console.log("Updated");
  return (<div className="wall wall_subjects">
      <div className="box_nobg box_nobg_header box_nobg_big box_nobg_center">
          <p>{page == 0 ? (isEdit ? "Редактирование расписания" : "Создание расписания") : shortTo(sheet.name, 40)}</p>
      </div>
      {page == 1 ? <p className="center gray">Автор: {storedSheet.creator ? storedSheet.creator.name : "Вы"}</p> : ""}
      
      {errorText ? <p className="error_label">{errorText}</p> : ""}
      {page == 0 ? <>
      <label for="sheetName">Название</label>
        <input
          key="sheetName"
          id="sheetName"
          name="sheetName"
          onChange={changeEv}
          value={sheet.name}
          placeholder={`Расписание от ${dateToString(Date.now())[0]}`}
          required
          autoFocus/>
        <div>
          {storedSheet.public ? <DarkButton onClick={() => storeSheet({...storedSheet, public: false}) }>Видят все</DarkButton> : <LightButton onClick={() => storeSheet({...storedSheet, public: true})}>Видят только участники</LightButton>}
        </div>
        <br/><LightButton type="submit" onClick={() => { sheet['name'] = sheet['name'] == "" ? `Расписание от ${dateToString(Date.now())[0]}` : sheet['name']; setPage(1) }}>Далее</LightButton>
      </>: <>
      <div className="box_nobg box_nobg_gap">
          <FiArrowLeft className="icons" onClick={() => setPage(0)}/>
          {/*{weekPart != -1 ? <FiTrash2 className="icons icons_delete" onClick={() => setWeekPart(-1)}/> : ""}
          {weekPart == -1 ? <FiPlus className="icons icons_add" onClick={() => setWeekPart(0)}/> : (weekPart == 0 ? <DarkButton>Числитель</DarkButton> : <LightButton onClick={() => setWeekPart(0)}>Числитель</LightButton>)}
      {weekPart == -1 ? "" : (weekPart == 1 ? <DarkButton>Знаменатель</DarkButton> : <LightButton onClick={() => setWeekPart(1)}>Знаменатель</LightButton>)}*/}
      </div>
      <input 
          onChange={changeEv} 
          value={defPlace}
          name="defPlace"
          placeholder="Место(автоматически при добавлении)" />
      <form onSubmit={(e) => e.preventDefault()} className={`wall_subjects_list ${page == 0 ? "wall_subjects_list_first" : "wall_subjects_list_second"}`}>
        {storedSheet.tables.map((elem, index) => {
          return (<div className="newsubject" key={index}>
            <div className="newsubject_in">
              <mark className="big center">{days[index]}</mark>
              {elem.length == 0 ? <><hr/><mark className="mid center">Нет занятий</mark></> : ""}
              {elem.map((subj, ind) => (
                <div indx={index} indxer={ind} key={subj.id} className="subject">
                  <div className="subject_panel"> {/* EVERY INPUT MUST HAVE UNIQUE KEY TO BE REPLACED ON DELETE */}
                    <TimePicker.RangePicker 
                      key={`inp_time${index}${ind}${subj.id}`}
                      defaultValue={[dayjs(subj.start), dayjs(subj.end)]} 
                      onChange={(a, b) => {
                        if(!a)
                          return;
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
                      <FiTrash2 onClick={() => deleteSubject(index, ind)}/>
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
            <DarkButton type="button" key={index+100000} onClick={() => addSubj(index)}>Добавить предмет</DarkButton>
            </div>
          )
        })}
        {errorText ? <p className="error_label">{errorText}</p> : ""}
        <LightButton type="submit" onClick={isEdit ? editSchedule : sendSchedule}>{isEdit ? "Изменить" : "Создать"}</LightButton>
      </form></>}
    </div>
  );
};
