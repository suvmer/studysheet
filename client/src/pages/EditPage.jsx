import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useParams } from 'react-router-dom';
import { getTable } from '../components/actions/tables';
import { DarkButton } from '../components/UI/Buttons';
import { AuthAsk } from '../components/AuthAsk';
import { CreateTable } from '../components/CreateTable';

export const EditPage = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.profile.isLogged);
    const [response, setResponse] = useState(["Загрузка", null]);
    let { id } = useParams();
    useEffect(() => { //TODO: REPLACE useEffect() WITH useLoaderData from react router
        dispatch(getTable(id)).then((res) => res && setResponse(["", res.table, 200]),
            (err) => {
                return setResponse([err.response.data.message, null, err.response.status])
            });
    }, [isLogged, dispatch, id]);

    const table = response[1];
    return table?.id ? 
        <CreateTable toedit={table}/>
    :
        <>
            <div className="infoTitle infoTitle_error">
                <div>
                    <InfoBlock text="">{response[0]}</InfoBlock>
                    <div className="event_title">Автор: ---</div>
                </div>
                {response[2] === 404 ? <>
                    <InfoBlock text="">Вы можете</InfoBlock>
                    <NavLink to="/my/add/"><DarkButton>Создать своё</DarkButton></NavLink>
                </> : ""}
                {response[2] === 403 ? <>
                    <InfoBlock text="">Попросите добавить вас в расписание или</InfoBlock>
                    <NavLink to="/my/add/"><DarkButton>Создайте своё</DarkButton></NavLink>
                </> : ""}
                {response[2] === 401 ? <>
                    <InfoBlock text="">Войдите в свой аккаунт для просмотра расписания:</InfoBlock>
                    <AuthAsk/>
                </> : ""}
            </div>
        </>;
}