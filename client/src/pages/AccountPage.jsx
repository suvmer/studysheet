import React, { useEffect, useState } from 'react'
import { dateToString } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { InfoBlock } from '../components/InfoBlock';
import { AuthForm } from '../components/AuthForm';
import { DarkButton, LightButton } from '../components/UI/Buttons';
import { logout } from '../components/actions/users';
import { getOwnTables } from '../components/actions/tables';
import { setChpw, setInfoOpen } from '../store/uiReducer';

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
        (err) => {
            return setCount(0);
        });
      }, [useSelector(state => state.profile.isLogged)]);
    //console.log(user);
    return <div className="wall">
        <div className="box_nobg box_nobg_header box_nobg_big">
            <p>Ваш аккаунт</p>
            {isLogged ? <LightButton onClick={() => dispatch(logout())}>Выйти</LightButton> : ""}
        </div>
        {!isLogged ? <AuthForm/> : <div className="event">
                <InfoBlock text="">{user.name}</InfoBlock>

            <div className="eventTitle">Дата регистрации: {dateToString(+user.regtime).join(" ")}</div>
            <div className="eventTitle">Почта: {user.email} {user.isActivated ? <a className='good_label'>Подтверждена</a> : <a className='error_label'>Не подтверждена</a>}</div>
            <br/>
            
            <p className="mid">Расписаний: {count}</p>
            {user.info?.city ? <p className="mid">Город: {user.info?.city}</p> : ""}
            {user.info?.university ? <p className="mid">Учёба: {user.info?.university}</p> : ""}
            <div className='event_footer'>
                <DarkButton onClick={() => dispatch(setChpw(true))}>Изменить пароль</DarkButton>
                <DarkButton onClick={() => dispatch(setInfoOpen(true))}>Редактировать профиль</DarkButton>
            </div>
        </div>}
        
    </div>;
}