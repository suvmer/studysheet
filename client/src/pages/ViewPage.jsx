import React, { useEffect, useState } from 'react'
import { shortTo } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { getTable } from '../components/actions/tables';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { DarkButton } from '../components/UI/Buttons';
import { AuthAsk } from '../components/AuthAsk';
import { OnlineTable } from '../components/OnlineTable';
import { InfoBar } from '../components/InfoBar';

export const ViewPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogged = useSelector(state => state.profile.isLogged);
    const [response, setResponse] = useState(["Загрузка", null]);
    const table = response[1];
    let { id } = useParams();
    useEffect(() => { //TODO: REPLACE useEffect() WITH useLoaderData from react router
        dispatch(getTable(id)).then((res) => res && setResponse(["", res.table, 200]),
            (err) => {
                return setResponse([err.response.data.message, null, err.response.status])
            });
    }, [isLogged, dispatch, id]);

  return <div className="wall wall_info">
    {table?.id ? <>
    <div className='box_nobg box_nobg_align'>
        <AiOutlineArrowLeft onClick={() => navigate(-1)} className="icons"/>
        <p className='big'>Мониторинг</p>
    </div>
    <div className='wall'>
        <OnlineTable table={table}/>
        <br/>
        <p className='mid center'>{shortTo(table.name, 50)}</p>
        <InfoBar tables={table.tables}/>
    </div> </>:
        <>
            <div className="infoTitle infoTitle_error">
                <div>
                    <InfoBlock text="">{response[0]}</InfoBlock>
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