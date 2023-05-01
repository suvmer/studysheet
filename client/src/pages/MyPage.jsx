import React, { useEffect, useMemo } from 'react'
import { dateToString } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useOutlet } from 'react-router-dom';
import { getTable } from '../components/actions/tables';
import { getUser } from '../components/actions/users';


const TableBar = ({table, creator, current}) => {
    if(table == undefined)
        return <div>Загрузка...</div>;
    return <div className="event">
            <InfoBlock text="">{table.name}</InfoBlock>

            <div className="eventTitle">Автор: {creator == undefined ? "Загрузка..." : creator.name}</div>

            <br/>

            <InfoBlock text="Событий в неделю:">5</InfoBlock>
            <InfoBlock text="Ближайшее событие:">00:45:00</InfoBlock>
        </div>
    ;
}

export const MyPage = () => {
    const dispatch = useDispatch();
    const tables = useSelector(state => state.profile.user.ownTables);
    const users = useSelector(state => state.profile.users);
    const current = useSelector(state => state.profile.currentTable);
    const schedules = useSelector(state => state.table.schedules);
    useMemo(() => {
        (async () => {
            for(var i = 0; i < tables.length; i++) {
                const jj = await getTable(tables[i]);
                dispatch(jj)
            }
        })();
    }, []);
    /*useEffect(() => {
        
            console.log("schedules ", schedules);
            schedules.forEach(table => {
                dispatch(getUser(table.creator))
                console.log("asking ", table.creator);
            }); //TODO: load table then user

    }, []);*/


    const outlet = useOutlet();
    //const creator = users.find(el => el.id == table.creator);
    
    const bars = tables.map(id => {
        const table = schedules.find(el => el.id == id);
        const creator = users.find(user => user.id == table.creator);
        //if(table && !creator)
        //    dispatch(getUser(table.creator)); //SETSTATE ON RUN!
        console.log(creator)
        return <TableBar key={`mtb${id}`} creator={creator} table={table} selected={current}
    />});
    
    const ownTables =
    tables.length > 0 ? 
    <>
    <div className="midbox">
        <mark className="big">Ваши расписания</mark>
        <NavLink className="btn" to="/my/add">Добавить</NavLink>
    </div>
    {bars} </> :
    <>
        <div className="midbox">
            <mark className="big">Расписаний нет</mark>
            <NavLink className="btn" to="/my/add">Добавить</NavLink>
        </div>
    </>;
    return <div className="wall">
    {outlet || ownTables}
    </div>;
}