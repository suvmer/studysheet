import React from 'react'
import { dateToString } from '../utils/utils';
import { useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { InfoBlock } from '../components/InfoBlock';
import { AuthForm } from '../components/AuthForm';

export const AccountPage = () => {
    const curdate = useSelector(state => state.ui.time);
    const isLogged = useSelector(state => state.profile.isLogged);
    
    return <div className="wall">
            <div className="midbox">
                <mark className="big">Ваш аккаунт</mark>
            </div>
            {!isLogged ? <AuthForm/> : <div>Не авторизованы</div>}
            <div className="event">
                 <InfoBlock text="">Мугомус</InfoBlock>

                <div className="eventTitle">Дата регистрации: 20.04.2023 00:23</div>
                <br/>
                
                <InfoBlock text="Расписаний:">5</InfoBlock>
                <InfoBlock text="Ближайшее событие:">00:05:00</InfoBlock>
            </div>
        </div>;
}