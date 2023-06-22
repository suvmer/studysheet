import dayjs from 'dayjs';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { selectSheet } from './actions/users';
import { dateToString, getClosest, msToNumbers, msToWords } from '../utils/utils';
import {BsPeople, BsPeopleFill} from 'react-icons/bs'
import { editTable } from '../components/actions/tables';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DarkButton, DarkSmallButton, SmallButton } from './UI/Buttons';
import { CURRENT_URL } from '../http';

export const TableBar = ({table, selected, isOpen, permission}) => {
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
    
    return <NavLink className={isOpen ? "sheet_disabled" : ""} onClick={(e) => isOpen && e.preventDefault() } to={`/info/${table.id}`}>
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
                <p className="mid center">Общая длительность: {msToNumbers(table.tables.reduce((acc, cur) => acc+ cur.reduce((allTime, subj) => Math.abs(subj.end - subj.start), 0), 0))}</p>
                {subj ? <p className="mid center">До ближайшего: {closest}</p> : ""}
                <br/>
                <div className="sheet_footer">
                    {isPublic ? <BsPeopleFill onClick={(e) => { if(!permission) return; e.preventDefault(); sendPublic(false)}} className="icons"/> : <BsPeople onClick={(e) => { if(!permission) return; e.preventDefault(); sendPublic(true)}} className="icons"/>}
                    {isPublic ? <p className="mid">Доступно всем</p> : <p className="mid error_label">Доступно участникам</p>}
                </div>
                {isOpen && isPublic && permission ? <>
                        <DarkSmallButton onClick={() => {
                            var inp =document.createElement('input');
                            document.body.appendChild(inp)
                            inp.value = CURRENT_URL+"/view/"+(table.id).toString()
                            inp.select();
                            document.execCommand('copy',false);
                            inp.remove();
                        }}>Копировать ссылку для просмотра</DarkSmallButton>
                        <br/>
                    </>: ""}
                <div className="sheet_footer">
                    {selected ? <AiFillPushpin onClick={(e) => e.preventDefault() } className="icons"/> : <AiOutlinePushpin onClick={(e) => { if(!permission) return; e.preventDefault(); dispatch(selectSheet(table.id))}} className="icons"/>}
                    {selected ? <p className="mid">Закреплено</p> : ""}
                </div>
                <div className='center'>
                    <NavLink to={`/view/${table.id}`}><DarkButton>Мониторинг</DarkButton></NavLink>
                </div>
                <br/>
        </div>
        </NavLink>
    ;
}