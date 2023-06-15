import React, { useEffect, useState } from 'react'
import { dateToString } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { InfoBlock } from '../components/InfoBlock';
import { AuthForm } from '../components/AuthForm';
import { LightButton } from '../components/UI/Buttons';
import { logout } from '../components/actions/users';
import { getOwnTables } from '../components/actions/tables';

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
            <br/>
            
            <InfoBlock text="Расписаний:">{count}</InfoBlock>
            {user.info?.city ? <InfoBlock text="Город:">{user.info?.city}</InfoBlock> : ""}
            {user.info?.university ? <InfoBlock text="Вуз:">{user.info?.university}</InfoBlock> : ""}
            <InfoBlock text="Ближайшее событие:">00:05:00</InfoBlock>
        </div>}
        
    </div>;
}