import React, { useEffect } from 'react'
import { dateToString } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { getTables } from '../components/actions/tables';

export const MainPage = () => {
    const dispatch = useDispatch();
    const curdate = useSelector(state => state.ui.time);
    useEffect(() => {
      dispatch(getTables());
    }, []);
    const tables = useSelector(state => state.table.tables);
    
    return <div className="wall">
    <span className="midbox" style={{ marginRight: "auto" }}>
      <mark className="mid">{dateToString(curdate)[0]}</mark>
    </span>
    {tables.map(element => <Event key={`tab${element.name}}`} table={element}/>)}
  </div>;
}