import React, { useEffect, useState } from 'react'
import { dateToString, days, getDif, getDifSign, shortDays } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { getOwnTables, getTable, getTables } from '../components/actions/tables';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { OnlineTable } from '../components/OnlineTable';

const Authorize = () =>
  <div className="wall">
    <MainTitle />
    <div className="midbox big">Авторизируйтесь, чтобы создавать расписания</div>
  </div>

const AddSomeSchedule = () =>
  <div className="wall">
    <MainTitle />
    <div className="midbox big">У вас нет расписаний</div>
    <NavLink className="btn" to="/my/add">Добавить</NavLink>
  </div>


const MainTitle = () => {
  const curdate = useSelector(state => state.ui.time);
  return <span className="box_nobg box_nobg_header" style={{ marginRight: "auto" }}>
           <p>{days[(new Date()).getDay()]}, {dateToString(curdate)[0]}</p>
           <p>{dateToString(curdate)[1]}</p>
         </span>
}

export const MainPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.profile.user);
  const [response, setResponse] = useState(["Загрузка", null]);

  useEffect(() => { //TODO: REPLACE useEffect() WITH useLoaderData from react router
    dispatch(getOwnTables()).then((res) => {
      console.log("res: ", res);
      if(!res)
        return;
      if(res.tables.length == 0)
        return setResponse(["Нет таблиц", null, 404])
      if(!user.currentTable || !res.tables.find(el => el.id == user.currentTable))
        return setResponse(["", res.tables[0], 200]);
      return setResponse(["", res.tables.find(el => el.id == user.currentTable), 200]);
    },
    (err) => {
        return setResponse([err.response.data.message, null, err.response.status])
    });
  }, [useSelector(state => state.profile.isLogged)]);

  console.log("rerenderrrr")

  if(!user.id)
    return <Authorize/>;

  if(!response[1])
      return <AddSomeSchedule/>
  return <div className='wall'>{/*<div>{JSON.stringify(response[1])}</div>*/}<OnlineTable table={response[1]}/></div>
/*
  const dayWeek = 0;//(new Date()).getDay();
  console.log(schedules, dayWeek);
  const today = dayjs().hour(10).minute(10);
  const tables = schedules.filter(el => ((user.ownTables??[]).find(id => (id == el.id)) != undefined)).map(element => {
    /*var closest = element.tables[dayWeek].reduce(function(prev, curr) {
      return (getDif(curr.start, today) < getDifSign(prev.start, today) ? curr : prev);
    });*
    const check = 1;
    console.log(dateToString(today)[1]);
    console.log(dateToString(element.tables[dayWeek][check].start)[1]);
    console.log(dateToString(element.tables[dayWeek][check].end)[1]);
    console.log(dateToString(getDifSign(element.tables[dayWeek][check].start, today))[1]);
    console.log(dateToString(getDifSign(element.tables[dayWeek][check].start, element.tables[dayWeek][check].end))[1]);
    var closest = element.tables[dayWeek].find(elem => (getDifSign(elem.start, today) <= getDif(elem.start, elem.end)));
    return <Event key={`tab${closest.name}}`} table={closest}/>;
  });
  return <div className="wall">
            <MainTitle />
            {tables}
         </div>;*/
}