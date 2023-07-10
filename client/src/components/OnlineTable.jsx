import React from 'react'
import { days, getClosest, getTitle, msToNumbers, msToWords } from '../utils/utils';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

export const OnlineTable = ({table}) => {
    const [cursubj, mode, day] = getClosest(table.tables);
    const today = ((new Date()).getDay()+6)%7;
    const curdate = useSelector(state => state.ui.time);    
    const dif = cursubj.start - curdate;

    if(cursubj == null)
        return <div>Нет занятий</div>

    return <div className={`event`+(dif === 0 ? ' active' : '')+(day !== today ? ' soon' : '')}>
        <div className="nextEvent">
        <span>{getTitle(dif)}</span>
        <span className="time">
            {day === today ? 
                `${dayjs(cursubj.start).format("HH:mm")} - ${dayjs(cursubj.end).format("HH:mm")}`
            :
                `${days[day]}`
            }
        </span>
        </div>
        <hr />
        <div className="eventBody">{cursubj.name}</div>
        <div className="event_title">{curdate < cursubj.start ? "Начнётся через" : "Идёт"}  {msToWords(Math.abs(dif))}</div>
        {day !== today ?
            <p className='mid'>{dayjs(cursubj.start).format("HH:mm")} - {dayjs(cursubj.end).format("HH:mm")}</p> :
            ""
        }
        <hr />
        <br/>
        {cursubj.cabinet ?
            <p className='mid'>Кабинет: {cursubj.cabinet}</p> :
            ""
        }
        {cursubj.teacher ?
            <p className='mid'>Ведёт: {cursubj.teacher}</p> :
            ""
        }
        {curdate >= cursubj.start ?
            <p className='mid'>До конца: {msToNumbers(cursubj.end - curdate)}</p> :
            ""
        }
        <p className='mid'>Длительность: {msToWords(cursubj.end - cursubj.start)}</p>
        <br/>
        <p className="left">{cursubj.place}</p>
    </div>
}