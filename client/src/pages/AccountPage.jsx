import React from 'react'
import { dateToString } from '../utils/utils';
import { useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { InfoBlock } from '../components/InfoBlock';

export const AccountPage = () => {
    const curdate = useSelector(state => state.ui.time);
    return <div className="wall">
            <div className="midbox">
                <mark className="big">Ваш аккаунт</mark>
            </div>
            <div className="event">
                 <InfoBlock text="">Мугомус</InfoBlock>

                <div className="eventTitle">Дата регистрации: 20.04.2023 00:23</div>
                <br/>
                
                <InfoBlock text="Расписаний:">5</InfoBlock>
                <InfoBlock text="Ближайшее событие:">00:05:00</InfoBlock>
            </div>
        </div>;
}