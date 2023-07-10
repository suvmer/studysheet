import React, { useEffect, useState } from 'react'
import { dateToString } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AuthForm } from '../components/AuthForm';
import { DarkButton, LightButton } from '../components/UI/Buttons';
import { logout } from '../components/actions/users';
import { getOwnTables } from '../components/actions/tables';
import UIService from '../services/UIService';

export const AccountPage = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.profile.isLogged);
    const user = useSelector(state => state.profile.user);
    const [count, setCount] = useState("Загрузка...");
    useEffect(() => { //TODO: REPLACE useEffect() WITH useLoaderData from react router
        dispatch(getOwnTables()).then((res) => {
          if(!res)
            return;
          setCount(res.tables.length);
        },
        (err) => setCount(0)
        );
      }, [isLogged, dispatch]);
    return <div className="wall">
        <div className="box_nobg box_nobg_header box_nobg_big">
            <p>Ваш аккаунт</p>
            {isLogged ? <LightButton onClick={() => dispatch(logout())}>Выйти</LightButton> : ""}
        </div>
        {!isLogged ?
            <AuthForm/>
        :
            <div className="event">
                <p><mark className="big">{user.name}</mark></p>
                <div className="event_title">Дата регистрации: {dateToString(+user.regtime).join(" ")}</div>
                <div className="event_title">Почта: {user.email} {user.isActivated ? <p className='good_label event_mail'>Подтверждена</p> : <p className='error_label event_mail'>Не подтверждена</p>}</div>
                <br/>
                
                <p className="mid">Расписаний: {count}</p>
                {user.info?.city ? <p className="mid">Город: {user.info?.city}</p> : ""}
                {user.info?.university ? <p className="mid">Учёба: {user.info?.university}</p> : ""}
                <div className='event_footer'>
                    <DarkButton onClick={UIService.openChangePass}>Изменить пароль</DarkButton>
                    <DarkButton onClick={UIService.openChangeInfo}>Редактировать профиль</DarkButton>
                </div>
            </div>}
    </div>;
}