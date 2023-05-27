import React, { useEffect } from 'react'
import { dateToString } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useOutlet } from 'react-router-dom';
import { getTable } from '../components/actions/tables';
import { getUser } from '../components/actions/users';
import {LightButton} from '../components/UI/Buttons';


const TableBar = ({table, creator, current}) => {
    if(table == undefined)
        return <div>Загрузка...</div>;
    console.log(table);
    return <NavLink className="event" to={`/info/${table.id}`}>
            <InfoBlock text="">{table.name}</InfoBlock>

            <div className="eventTitle">Автор: {creator == undefined ? "Загрузка..." : creator.name}</div>

            <br/>

            <InfoBlock text="Событий в неделю:">{table.tables.length}</InfoBlock>
            <InfoBlock text="Ближайшее событие:">00:45:00</InfoBlock>
        </NavLink>
    ;
}

export const MyPage = () => {
    const dispatch = useDispatch();
    const tables = useSelector(state => state.profile.user.ownTables) ?? [];
    const users = useSelector(state => state.profile.users);
    const current = useSelector(state => state.profile.currentTable);
    const schedules = useSelector(state => state.table.schedules);
    useEffect(() => {
        tables.forEach(id => dispatch(getTable(id)));
    }, []);

    const outlet = useOutlet();
    
    const bars = tables.map(id => {
        const table = schedules.find(el => el.id == id);
        const creator = users.find(user => user.id == table.creator);
        return <TableBar key={`mtb${id}`} creator={creator} table={table} selected={current}
    />});
    
    const ownTables =
    tables.length > 0 ? 
    <>
    <div className="box_nobg box_nobg_header box_nobg_big">
        <p>Ваши расписания</p>
        <NavLink to="/my/add"><LightButton onClick={() => {}}>Добавить</LightButton></NavLink>
        {/*<NavLink className="btn" to="/my/add">Добавить</NavLink>*/}
    </div>

    {bars} </> :
    <>
        <div className="midbox">
            <mark className="big">Расписаний нет</mark>
            <NavLink to="/my/add"><LightButton onClick={() => {}}>Добавить</LightButton></NavLink>
        </div>
    </>;
    return <div className="wall">
    {outlet || ownTables}
    </div>;
}