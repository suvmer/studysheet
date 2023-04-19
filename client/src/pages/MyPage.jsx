import React from 'react'
import { dateToString } from '../utils/utils';
import { useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { InfoBlock } from '../components/InfoBlock';

export const MyPage = () => {
    const curdate = useSelector(state => state.ui.time);
    return <div className="wall">
            <div className="midbox">
                <mark className="big">Ваши расписания</mark>
            </div>
            <div className="event">
                 <InfoBlock text="">ЯрГУ (2 курс)</InfoBlock>

                <div className="eventTitle">Автор: User</div>
                <br/>
                
                <InfoBlock text="Событий в неделю:">5</InfoBlock>
                <InfoBlock text="Ближайшее событие:">00:45:00</InfoBlock>
            </div>
        </div>;
}