import React from 'react'
import { dateToString } from '../utils/utils';
import { useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useOutlet } from 'react-router-dom';

export const MyPage = () => {
    const outlet = useOutlet();
    const ownTables = <><div className="midbox">
    <mark className="big">Ваши расписания</mark>
    <NavLink className="btn" to="/my/add">Добавить</NavLink>
</div>
<div className="event">
     <InfoBlock text="">ЯрГУ (2 курс)</InfoBlock>

    <div className="eventTitle">Автор: User</div>
    <br/>
    
    <InfoBlock text="Событий в неделю:">5</InfoBlock>
    <InfoBlock text="Ближайшее событие:">00:45:00</InfoBlock>
</div></>;
    return <div className="wall">
            {outlet || ownTables}
        </div>;
}