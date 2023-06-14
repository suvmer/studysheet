import React from 'react'
import { getDif, getTitle, msToNumbers, msToWords } from '../utils/utils';
import { useSelector } from 'react-redux';
import { InfoBlock } from '../components/InfoBlock';
import dayjs from 'dayjs';

export const OnlineTable = ({table}) => {
    
    const getClosestSubject = (list) => {
        var cursubj = null;
        var mode = -1; //0 - before, 1 - in process
        list[((new Date()).getDay()+6)%7].forEach(el => {
            if(el.start <= Date.now() && el.end >= Date.now()) {
                if(cursubj == null || el.start < cursubj.start) {
                    cursubj = el;
                    mode = 1;
                }
            }
            if(el.start > Date.now()) {
                if(mode != 1) {
                    if(cursubj == null || el.start < cursubj.start) {
                        cursubj = el;
                        mode = 0;
                    }
                }
            }
        })
        return [cursubj, mode];
    }
    console.log(table)
    const [cursubj, mode] = getClosestSubject(table.tables);
    const curdate = useSelector(state => state.ui.time);    
    if(cursubj == null)
        return <div>Нет занятий</div>
    const dif = getDif(curdate, cursubj.start);
    return <div className={`event `+((dif == 0) ? 'active' : '')}>
        <div className="nextEvent">
        <span>{getTitle(dif)}</span>
        <span className="time">
            {dayjs(cursubj.start).format("HH:mm")} - {dayjs(cursubj.end).format("HH:mm")}
        </span>
        </div>
        <hr />
        <div className="eventBody">{cursubj.name}</div>
        <div className="eventTitle">Начнётся через {msToWords(dif)}</div>
        <hr />
        <br/>
        
        <InfoBlock text="Кабинет:">{cursubj.cabinet}</InfoBlock>
        <InfoBlock text="До начала:">{msToNumbers(dif)}</InfoBlock>
        <br/>
        <p className="left">{cursubj.teacher}</p>
        <p className="left">{cursubj.place}</p>
    </div>
}