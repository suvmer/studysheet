import React from 'react'
import { dateToString } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../components/Event';
import { InfoBlock } from '../components/InfoBlock';
import { AuthForm } from '../components/AuthForm';
import { LightButton } from '../components/UI/Buttons';
import { logout } from '../components/actions/users';

export const AccountPage = () => {
    const isLogged = useSelector(state => state.profile.isLogged);
    const user = useSelector(state => state.profile.user);
    const dispatch = useDispatch();
    return <div className="wall">
        <div className="box_nobg box_nobg_header box_nobg_big">
            <p>Ваш аккаунт</p>
            {isLogged ? <LightButton onClick={() => dispatch(logout())}>Выйти</LightButton> : ""}
        </div>
        {!isLogged ? <AuthForm/> : <div className="event">
                <InfoBlock text="">{user.name}</InfoBlock>

            <div className="eventTitle">Дата регистрации: {dateToString(+user.regtime).join(" ")}</div>
            <br/>
            
            <InfoBlock text="Расписаний:">{(user.ownTables??[]).length}</InfoBlock>
            <InfoBlock text="Ближайшее событие:">00:05:00</InfoBlock>
        </div>}
        
    </div>;
}