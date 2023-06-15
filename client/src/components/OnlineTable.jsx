import React from 'react'
import { days, getDif, getTitle, msToNumbers, msToWords, shortDays } from '../utils/utils';
import { useSelector } from 'react-redux';
import { InfoBlock } from '../components/InfoBlock';
import dayjs from 'dayjs';

export const OnlineTable = ({table}) => {
    
    const getClosestSubject = (list, today = (((new Date()).getDay()+6)%7)) => {
        var cursubj = null;
        var mode = -1; //0 - before, 1 - in process
        var dif = today - (((new Date()).getDay()+6)%7);
        if(dif < 0)
            dif += 7;
        dif *= 86400000; //1 day = 1000*60*60*24 = 86400000ms
        list[today].forEach(el => {
            if(el.start + dif <= Date.now() && el.end + dif >= Date.now()) {
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
        if(cursubj != null)
            return [{...cursubj, start: cursubj.start + dif, end: cursubj.end + dif}, mode, today];
        return [cursubj, mode, today];
    }
    const getClosest = (list) => {
        const [cursubj, mode, today] = getClosestSubject(table.tables);
        if(cursubj == null) { //not found upcoming events in today
            for(var i = 1; i <= 7; i++) { //so find them in other days
                const [nextSubj, nextMode, nextday] = getClosestSubject(list, (today + i)%7);
                if(nextSubj != null) 
                    return [nextSubj, nextMode, nextday];
            }
        }
        return [cursubj, mode, today];
    }
    //console.log(table)
    const [cursubj, mode, day] = getClosest(table.tables);
    const today = ((new Date()).getDay()+6)%7;
    const curdate = useSelector(state => state.ui.time);    
    if(cursubj == null)
        return <div>Нет занятий</div>
    const dif = cursubj.start - curdate;
    return <div className={`event`+(dif == 0 ? ' active' : '')+(day != today ? ' soon' : '')}>
        <div className="nextEvent">
        <span>{getTitle(dif)}</span>
        <span className="time">
            {day == today ? 
                `${dayjs(cursubj.start).format("HH:mm")} - ${dayjs(cursubj.end).format("HH:mm")}`
            :
                `${days[day]}`
            }
        </span>
        </div>
        <hr />
        <div className="eventBody">{cursubj.name}</div>
        <div className="eventTitle">{curdate < cursubj.start ? "Начнётся через" : "Идёт"}  {msToWords(Math.abs(dif))}</div>
        {day != today ? <p className='mid'>{dayjs(cursubj.start).format("HH:mm")} - {dayjs(cursubj.end).format("HH:mm")}</p> : ""}
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