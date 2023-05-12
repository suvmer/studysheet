import React, { useEffect } from 'react'
import { dateToString, days, getDif, getDifSign, shortDays } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { getTable, getTables } from '../components/actions/tables';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';

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
  return <span className="midbox" style={{ marginRight: "auto" }}>
           <mark className="mid">{days[(new Date()).getDay()]}, {dateToString(curdate)[0]}</mark>
         </span>
}

export const MainPage = () => {
  document.title = "StudySHEET - расписание под рукой!";
  const dispatch = useDispatch();
  const user = useSelector(state => state.profile.user);
  const isLogged = useSelector(state => state.profile.isLogged);
  useEffect(() => {
    if(isLogged)
      user.ownTables.forEach(id => dispatch(getTable(id)));
  }, []);
  const schedules = useSelector(state => state.table.schedules);
  if(!isLogged)
    return <Authorize/>;

  var table = schedules.find(el => el.id == user.currentTable);
  if(table == undefined) {
    if(user.ownTables.length == 0)
      return <AddSomeSchedule/>
    table = user.ownTables[0];
  }

  const dayWeek = 0;//(new Date()).getDay();
  console.log(schedules, dayWeek);
  const today = dayjs().hour(10).minute(10);
  const tables = schedules.filter(el => (user.ownTables.find(id => (id == el.id)) != undefined)).map(element => {
    /*var closest = element.tables[dayWeek].reduce(function(prev, curr) {
      return (getDif(curr.start, today) < getDifSign(prev.start, today) ? curr : prev);
    });*/
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
         </div>;
}