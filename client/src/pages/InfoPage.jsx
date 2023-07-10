import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { deleteTable, getTable } from '../components/actions/tables';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { DarkButton, DarkRepeatButton } from '../components/UI/Buttons';
import { AuthAsk } from '../components/AuthAsk';
import { TableBar } from '../components/TableBar';
import { InfoBar } from '../components/InfoBar';

export const InfoPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [response, setResponse] = useState(["Загрузка", null]);
    const table = response[1];
    const [errorText, setErrorText] = useState(""); //red text under the title
    const user = useSelector(state => state.profile.user);
    const currentTable = user?.currentTable ?? -1;
    const isLogged = useSelector(state => state.profile.isLogged);
    let { id } = useParams();
    useEffect(() => { //TODO: REPLACE useEffect() WITH useLoaderData from react router
        dispatch(getTable(id)).then((res) => res && setResponse(["", res.table, 200]),
            (err) => {
                return setResponse([err.response.data.message, null, err.response.status])
            });
    }, [isLogged, dispatch, id]);


    const deleteSheet = () => { //send remove sheet request
        dispatch(deleteTable(table.id)).then((succ) => navigate("/my"), (err) => {
            setErrorText(err.response.data.message)
        });
    }
    const permission = table?.id ? (user.id === table.creator.id) : false;

    return <div className="wall wall_info">
    {table?.id ? 
        <>
        {errorText ? <p className="error_label mid">{errorText}</p> : ""}
        <div className="wall_info_icons">
            <div className='box_nobg box_nobg_align'>
                <AiOutlineArrowLeft onClick={() => navigate(-1)} className="icons"/>
                <p className='big'>О расписании</p>
            </div>
            <div>
                {permission ? <DarkRepeatButton onClick={() => deleteSheet()}>Удалить</DarkRepeatButton> : ""}
            </div>
        </div>
        <TableBar table={table} selected={table.id === currentTable} isOpen={true} permission={permission}/>
        <NavLink className="wall_info_panel" to={`/my/edit/${table.id}`}>
            {permission ? <DarkButton>Редактировать</DarkButton> : ""}
        </NavLink>
        <InfoBar tables={table.tables}/>
        </>
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
        </>}
    </div>;
}