import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getOwnTables } from '../components/actions/tables';
import {LightButton} from '../components/UI/Buttons';
import { AuthAsk } from './AuthAsk';
import { TableBar } from './TableBar';

export const ListTables = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.user);
    const current = user?.currentTable ?? -1;
    const [list, setList] = useState([]);
    const isLogged = useSelector(state => state.profile.isLogged);
    useEffect(() => {
        dispatch(getOwnTables()).then((res) => res && setList(res.tables), (err) => setList([]));
    }, [isLogged, dispatch]);

    
    return <div className="wall wall_list">
    {!user?.id ? <AuthAsk text="Войдите для сохранения расписаний"/> :
        list.length > 0 ?
            <>
                <div className="box_nobg box_nobg_header box_nobg_big">
                    <p>Ваши расписания</p>
                    <NavLink to="/my/add/"><LightButton>Добавить</LightButton></NavLink>
                </div>
                {list.map(el => <TableBar key={el.id} table={el} selected={el.id === current} isOpen={false} permission={true}/>)}
            </>
        :
            <div className="midbox">
                <mark className="big">Расписаний нет</mark>
                <NavLink to="/my/add/"><LightButton>Добавить</LightButton></NavLink>
            </div>}
    </div>;
}