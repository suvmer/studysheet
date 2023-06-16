import dayjs from 'dayjs';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { selectSheet } from './actions/users';
import { getClosest, msToNumbers, msToWords } from '../utils/utils';
import {BsPeople, BsPeopleFill} from 'react-icons/bs'
import { editTable } from '../components/actions/tables';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const TableBar = ({table, selected}) => {
    const dispatch = useDispatch();
    console.log("rerender")
    const curdate = useSelector(state => state.ui.time); 
    const [isPublic, setPublic] = useState(table.public);
    if(table == undefined)
        return <div>Загрузка...</div>;   

    const subj = getClosest(table.tables)[0];
    var closest = "-";
    if(subj != null)
        closest = msToWords(subj.start - curdate);

    const sendPublic = (val) => {
        setPublic(val);
        //if(table.public == val)
        //    return;
        dispatch(editTable({...table, public: val})).then(succ => console.log(succ), err => console.log(err));
    }
    
    return <NavLink to={`/info/${table.id}`}>
            <div className={`sheet${selected ? ` sheet_selected` : ``}`}>
            <div className="sheet_panel">
                {/*selected ? <AiFillPushpin onClick={(e) => e.preventDefault() } className="icons"/> : <AiOutlinePushpin onClick={(e) => { e.preventDefault(); dispatch(selectSheet(table.id))}} className="icons"/>*/}
                <p className="sheet_panel_title">{table.name}</p>
                {/*<AiFillPushpin visibility="hidden" className="icons"/>*/}
            </div>
                <div className="eventTitle">Автор: {table.creator.name}</div>
                <div className="eventTitle">Создано: {dayjs(+table.created).format("DD.MM.YYYY HH:mm:ss")}</div>

                <br/>

                <p className="mid center">Событий в неделю: {table.tables.reduce((acc, cur) => acc+cur.length, 0)}</p>
                {subj ? <p className="mid center">До ближайшего события: {closest}</p> : ""}
                <br/>
                <div className="sheet_footer">
                    {isPublic ? <BsPeopleFill onClick={(e) => {e.preventDefault(); sendPublic(false)}} className="icons"/> : <BsPeople onClick={(e) => {e.preventDefault(); sendPublic(true)}} className="icons"/>}
                    {isPublic ? <p className="mid">Доступно всем</p> : <p className="mid error_label">Доступно участникам</p>}
                </div>
                <div className="sheet_footer">
                    {selected ? <AiFillPushpin onClick={(e) => e.preventDefault() } className="icons"/> : <AiOutlinePushpin onClick={(e) => { e.preventDefault(); dispatch(selectSheet(table.id))}} className="icons"/>}
                    {selected ? <p className="mid">Закреплено</p> : ""}
                </div>
                <br/>
        </div>
        </NavLink>
    ;
}