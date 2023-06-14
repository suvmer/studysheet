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
    const dif = cursubj.start - curdate;
    return <div className={`event `+((dif == 0) ? 'active' : '')}>
        <div className="nextEvent">
        <span>{getTitle(dif)}</span>
        <span className="time">
            {dayjs(cursubj.start).format("HH:mm")} - {dayjs(cursubj.end).format("HH:mm")}
        </span>
        </div>
        <hr />
        <div className="eventBody">{cursubj.name}</div>
        <div className="eventTitle">{curdate < cursubj.start ? "Начнётся через" : "Идёт"}  {msToWords(Math.abs(dif))}</div>
        <hr />
        <br/>
        {cursubj.cabinet ? <p className='mid'>Кабинет: {cursubj.cabinet}</p> : ""}
        {cursubj.teacher ? <p className='mid'>Ведёт: {cursubj.teacher}</p> : ""}
        {curdate >= cursubj.start ? <p className='mid'>До конца: {msToNumbers(cursubj.end - curdate)}</p> : ""}
        <p className='mid'>Длительность: {msToWords(cursubj.end - cursubj.start)}</p>
        <br/>
        <p className="left">{cursubj.place}</p>
    </div>
}