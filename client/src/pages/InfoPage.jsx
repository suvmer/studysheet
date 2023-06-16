import React, { useEffect, useState } from 'react'
import { dateToString, days } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useNavigate, useOutlet, useParams } from 'react-router-dom';
import { deleteTable, getTable } from '../components/actions/tables';
import dayjs from 'dayjs';
import { AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowUp, AiOutlineEdit } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { DarkButton, DarkRepeatButton, LightButton } from '../components/UI/Buttons';
import { AuthAsk } from '../components/AuthAsk';
import { TableBar } from '../components/TableBar';

export const SubjectBar = (props) => {
    return <div className='subjectBar'><p>{props.num}. {props.name}{props.cabinet ? ` (${props.cabinet})` : ""}</p><p>{dateToString(props.start, true)[1]} - {dateToString(props.end, true)[1]}</p></div>
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
    const user = useSelector(state => state.profile.user);
    const current = user?.currentTable ?? -1;

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
            <AiOutlineArrowLeft onClick={() => navigate(-1)} className="icons"/>
            <div>
                <DarkRepeatButton onClick={() => deleteSheet(table.id)}>Удалить</DarkRepeatButton>
            </div>
        </div>
        <TableBar table={table} selected={table.id == current}/>
        <NavLink className="wall_info_panel" to={`/my/edit/${table.id}`}>
            <DarkButton>Редактировать</DarkButton>
        </NavLink>
        <div className="info">
            {table.tables.map((element, day) => {
                return <div className='sheet' key={`sbjlist${day}`}>
                    <p className="big center">{days[day]}</p>
                    <br/>
                    <hr/>
                    {element.length == 0 ? <p className="mid center">Занятий нет</p> : ""}
                    {element.map((el, num) => {
                        if(num == 0)
                            return <SubjectBar key={`sbj${day} ${num}`} {...{...el, num: num+1}}/>
                        return <>
                            <hr/>
                            <SubjectBar key={`sbj${day} ${num}`} {...{...el, num: num+1}}/>
                        </>
                    })}
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