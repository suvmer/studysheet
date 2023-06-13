import React, { useEffect, useState } from 'react'
import { dateToString, days } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useNavigate, useOutlet, useParams } from 'react-router-dom';
import { deleteTable, getTable } from '../components/actions/tables';
import dayjs from 'dayjs';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { DarkButton, LightButton } from '../components/UI/Buttons';
import { AuthAsk } from '../components/AuthAsk';

export const SubjectBar = (props) => {
    return <div className='subjectBar'><p>{props.num}. {props.name}</p><p>{dateToString(props.start, true)[1]} - {dateToString(props.end, true)[1]}</p></div>
}



/*
TODO: кликом на предмет модальное окно с редактированием предмета(кабинет, время, ...)


*/









export const InfoPage = () => {
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
    const deleteSheet = (id) => {
        dispatch(deleteTable(table.id)).then((succ) => navigate("/my"), (err) => {
            setErrorText(err.response.data.message)
        });
    }

    return <div className="wall wall_info">
    {table?.id ? 
        <>
        {errorText ? <p className="error_label mid">{errorText}</p> : ""}
        <div className="wall_info_icons">
            <AiOutlineArrowUp className="icons"/>
            <AiOutlineArrowDown className="icons"/>
            <FiTrash2 onClick={() => deleteSheet(table.id)} className="icons"/>
        </div>
        <div className='infoTitle'>
            <InfoBlock text="">{table.name}</InfoBlock>
            <div className="eventTitle">Автор: {table.creator.name}</div>
            <div className="eventTitle">Создано: {dayjs(+table.created).format("DD.MM.YYYY HH:mm:ss")}</div>
        </div>
        <div className="info">
            {table.tables.map((element, day) => {
                return <div key={`sbjlist${day}`}>
                    <mark className="big">{days[day]}</mark>
                    {element.length == 0 ? <p className="mid center">Занятий нет</p> : ""}
                    {element.map((el, num) => <SubjectBar key={`sbj${day} ${num}`} {...{...el, num: num+1}}/>)}
                    </div>
            })}
        </div>
        </> :
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
        </>}
    </div>;
}