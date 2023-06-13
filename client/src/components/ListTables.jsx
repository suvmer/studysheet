import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink } from 'react-router-dom';
import { getOwnTables } from '../components/actions/tables';
import {LightButton} from '../components/UI/Buttons';
import { AuthAsk } from './AuthAsk';
import dayjs from 'dayjs';


const TableBar = ({table, selected}) => {
    if(table == undefined)
        return <div>Загрузка...</div>;
    console.log(table);
    return <NavLink className="event" to={`/info/${table.id}${selected ? ` event_selected` : ``}`}>
            <InfoBlock text="">{table.name}</InfoBlock>

            <div className="eventTitle">Автор: {JSON.stringify(table.creator)}</div>
            <div className="eventTitle">Создано: {dayjs(+table.created).format("DD.MM.YYYY HH:mm:ss")}</div>

            <br/>

            <InfoBlock text="Событий в неделю:">{/*table.tables.reduce((acc, cur) => acc+cur.length, 0)*/}</InfoBlock>
            <InfoBlock text="Ближайшее событие:">00:45:00</InfoBlock>
        </NavLink>
    ;
}
var a = 5;
export const ListTables = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.user);
    const current = user?.currentTable ?? -1;
    const [list, setList] = useState([]);

    useEffect(() => {
        dispatch(getOwnTables()).then((res) => res && setList(res.tables), (err) => setList([]));
    }, [useSelector(state => state.profile.isLogged)]);

    
    console.log("Rerender listtables ", a++);
    return <div className="wall wall_list">
    {!user?.id ? <AuthAsk text="Войдите для сохранения расписаний"/> :
        list.length > 0 ?
            <>
                <div className="box_nobg box_nobg_header box_nobg_big">
                    <p>Ваши расписания</p>
                    <NavLink to="/my/add/"><LightButton>Добавить</LightButton></NavLink>
                </div>
                {list.map(el => <TableBar key={el.id} table={el} selected={el.id == current}/>)}
            </>
        :
            <div className="midbox">
                <mark className="big">Расписаний нет</mark>
                <NavLink to="/my/add/"><LightButton>Добавить</LightButton></NavLink>
            </div>}
    </div>;
}