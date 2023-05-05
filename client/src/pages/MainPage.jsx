import React, { useEffect } from 'react'
import { dateToString } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { getTables } from '../components/actions/tables';

const Authorize = () =>
  <div className="wall">
    <MainTitle />
    <div className="midbox big">Авторизируйтесь, чтобы создавать расписания</div>
  </div>


const MainTitle = () => {
  const curdate = useSelector(state => state.ui.time);
  return <span className="midbox" style={{ marginRight: "auto" }}>
           <mark className="mid">{dateToString(curdate)[0]}</mark>
         </span>
}

export const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTables());
  }, []);
  const schedules = useSelector(state => state.table.schedules);
  const isLogged = useSelector(state => state.profile.isLogged);
  if(!isLogged)
    return <Authorize/>;
  
  console.log(schedules);
  return <div className="wall">
            <MainTitle />
            {schedules.map(element => <Event key={`tab${element.name}}`} table={element}/>)}
         </div>;
}