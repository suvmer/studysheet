import React, { useEffect, useState } from 'react'
import { dateToString, days, shortTo } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { InfoBlock } from '../components/InfoBlock';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { deleteTable, getTable } from '../components/actions/tables';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { DarkButton, DarkRepeatButton, LightButton } from '../components/UI/Buttons';
import { AuthAsk } from '../components/AuthAsk';
import { TableBar } from '../components/TableBar';
import { OnlineTable } from '../components/OnlineTable';
import { InfoBar } from '../components/InfoBar';

export const ViewPage = () => {
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

  return <div className="wall wall_info">
    {table?.id ? <>
    <div className='box_nobg'>
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