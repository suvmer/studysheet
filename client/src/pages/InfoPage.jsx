import React, { useEffect, useState } from 'react'
import { dateToString, days } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useOutlet, useParams } from 'react-router-dom';
import { getTable } from '../components/actions/tables';
import { getUser } from '../components/actions/users';

export const SubjectBar = (props) => {
    return <div className='subjectBar'><p>{props.num}. {props.name}</p><p>{dateToString(props.start, true)[1]} - {dateToString(props.end, true)[1]}</p></div>
}



/*
TODO: кликом на предмет модальное окно с редактированием предмета(кабинет, время, ...)


*/









export const InfoPage = () => {
    document.title = "Просмотр расписания";
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.user);
    const current = useSelector(state => state.profile.currentTable);
    const schedules = useSelector(state => state.table.schedules);
    let { id } = useParams();

    const [table, setTable] = useState(null);

    useEffect(() => { //TODO: REPLACE useEffect() WITH useLoaderData from react router
        dispatch(getTable(id)).then((res) => res && setTable(res.table), (err) => setTable(null));
    }, [useSelector(state => state.profile.isLogged)]);


    const outlet = useOutlet();
    //const table = schedules.find(el => el.id == id);
    const creator = user;//users.find(user => user.id == table.creator);
    console.log(table);
    const ownTables =
    table ? 
    <>
    <div className='infoTitle'>
        <InfoBlock text="">{table.name}</InfoBlock>
        <div className="eventTitle">Автор: {creator == undefined ? "Загрузка..." : creator.name}</div>
    </div>
    <div className="info">
        {table.tables.map((element, day) => {
            return <div key={`sbjlist${day}`}>
                <mark className="big">{days[day]}</mark>
                {element.length == 0 ? <p className="mid center">Занятий нет</p> : ""}
                {element.map((el, num) => <SubjectBar key={`sbj${day} ${num}`} {...{...el, num: num+1}}/>)}
                </div>
        })}
    </div>
     </> :
    <>
        <div className="midbox">
            <mark className="big">Расписание не найдено</mark>
            <NavLink className="btn" to="/my/add">Добавить</NavLink>
        </div>
    </>;
    return <div className="wall">
    {outlet || ownTables}
    </div>;
}