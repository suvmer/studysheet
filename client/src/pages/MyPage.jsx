import React, { useEffect, useState } from 'react'
import { dateToString } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useOutlet } from 'react-router-dom';
import { getOwnTables, getTable } from '../components/actions/tables';
import { getUser } from '../components/actions/users';
import {LightButton} from '../components/UI/Buttons';


const TableBar = ({table, creator, selected}) => {
    if(table == undefined)
        return <div>Загрузка...</div>;
    console.log(table);
    return <NavLink className="event" to={`/info/${table.id}${selected ? ` event_selected` : ``}`}>
            <InfoBlock text="">{table.name}</InfoBlock>

            <div className="eventTitle">Автор: {creator == undefined ? "Загрузка..." : creator.name}</div>

            <br/>

            <InfoBlock text="Событий в неделю:">{/*table.tables.reduce((acc, cur) => acc+cur.length, 0)*/}</InfoBlock>
            <InfoBlock text="Ближайшее событие:">00:45:00</InfoBlock>
        </NavLink>
    ;
}

export const MyPage = () => {
    const dispatch = useDispatch();
    const tables = useSelector(state => state.profile.user.ownTables) ?? [];
    const user = useSelector(state => state.profile.user);
    const current = useSelector(state => state.profile.currentTable) ?? -1;
    const schedules = useSelector(state => state.table.schedules);
    const [list, setList] = useState([]);
    useEffect(() => {
        //tables.forEach(id => dispatch(getTable(id)));
        dispatch(getOwnTables()).then((res) => res && setList(res.tables), (err) => setList([]));
    }, [useSelector(state => state.profile.isLogged)]);

    const outlet = useOutlet();
    
    const bars = list.map(el => {
        return <TableBar key={el.id} table={el} creator={user} selected={el.id == current}/>
    });
    
    const ownTables =
    list.length > 0 ? 
    <div className="wall">
    <div className="box_nobg box_nobg_header box_nobg_big">
        <p>Ваши расписания</p>
        <NavLink to="/my/add"><LightButton onClick={() => {}}>Добавить</LightButton></NavLink>
        {/*<NavLink className="btn" to="/my/add">Добавить</NavLink>*/}
    </div>

    {bars} </div> :
    <div className="wall">
        <div className="midbox">
            <mark className="big">Расписаний нет</mark>
            <NavLink to="/my/add"><LightButton onClick={() => {}}>Добавить</LightButton></NavLink>
        </div>
    </div>;
    return (outlet || ownTables);
}