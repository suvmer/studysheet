import React from 'react'
import { dateToString } from '../utils/utils';
import { useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { InfoBlock } from '../components/InfoBlock';
import { AuthForm } from '../components/AuthForm';

export const AccountPage = () => {
    const isLogged = useSelector(state => state.profile.isLogged);
    const user = useSelector(state => state.profile.user);
    
    return <div className="wall">
            <div className="midbox">
                <mark className="big">Ваш аккаунт</mark>
            </div>
            {!isLogged ? <AuthForm/> : <div className="event">
                 <InfoBlock text="">{user.name}</InfoBlock>

                <div className="eventTitle">Дата регистрации: {dateToString(user.regtime).join(" ")}</div>
                <br/>
                
                <InfoBlock text="Расписаний:">{user.ownTables.Length}</InfoBlock>
                <InfoBlock text="Ближайшее событие:">00:05:00</InfoBlock>
            </div>}
            
        </div>;
}