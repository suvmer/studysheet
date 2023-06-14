import React, { useEffect, useState } from 'react'
import { dateToString, days } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useNavigate, useOutlet, useParams } from 'react-router-dom';
import { deleteTable, getTable } from '../components/actions/tables';
import dayjs from 'dayjs';
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineEdit } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { DarkButton, LightButton } from '../components/UI/Buttons';
import { AuthAsk } from '../components/AuthAsk';
import { CreateTable } from '../components/CreateTable';

export const SubjectBar = (props) => {
    return <div className='subjectBar'><p>{props.num}. {props.name}</p><p>{dateToString(props.start, true)[1]} - {dateToString(props.end, true)[1]}</p></div>
}



/*
TODO: кликом на предмет модальное окно с редактированием предмета(кабинет, время, ...)


*/









export const EditPage = () => {
    const dispatch = useDispatch();
    let { id } = useParams();
    const [response, setResponse] = useState(["Загрузка", null]);

    useEffect(() => { //TODO: REPLACE useEffect() WITH useLoaderData from react router
        dispatch(getTable(id)).then((res) => res && setResponse(["", res.table, 200]),
            (err) => {
                return setResponse([err.response.data.message, null, err.response.status])
            });
    }, [useSelector(state => state.profile.isLogged)]);
    const table = response[1];
    console.log(table);

    const navigate = useNavigate();
    const [errorText, setErrorText] = useState("");
   
    const [edit, setEdit] = useState(false);
    return table?.id ? 
        <CreateTable toedit={table}/>
    :
        <>
            <div className="infoTitle infoTitle_error">
                <div>
                    <InfoBlock text="">{response[0]}</InfoBlock>
                    <div className="eventTitle">Автор: ---</div>
                </div>
                {response[2] == 404 ? <>
                    <InfoBlock text="">Вы можете</InfoBlock>
                    <NavLink to="/my/add/"><DarkButton>Создать своё</DarkButton></NavLink>
                </> : ""}
                {response[2] == 403 ? <>
                    <InfoBlock text="">Попросите добавить вас в расписание или</InfoBlock>
                    <NavLink to="/my/add/"><DarkButton>Создайте своё</DarkButton></NavLink>
                </> : ""}
                {response[2] == 401 ? <>
                    <InfoBlock text="">Войдите в свой аккаунт для просмотра расписания:</InfoBlock>
                    <AuthAsk/>
                </> : ""}
            </div>
        </>;
}