import { dateToString, getDif, getTitle, msToNumbers, msToWords } from '../utils/utils';
import { useSelector } from 'react-redux';
import { InfoBlock } from './InfoBlock';

export const Event = ({table}) => {
    const curdate = useSelector(state => state.ui.time);
    const dif = getDif(curdate, table.start);
    return <div className={`event `+((dif === 0) ? 'active' : '')}>
    <div className="nextEvent">
      <span>{getTitle(dif)}</span>
      <span className="time">
        {dateToString(table.start)[1]} - {dateToString(table.start + table.duration * 60 * 1000)[1]}
      </span>
    </div>
    <hr />
    <div className="eventBody">{table.name}</div>
    <div className="event_title">Начнётся через {msToWords(dif)}</div>
    <hr />
    <br/>
    
    <p>Кабинет: <mark className="big">{table.cabinet}</mark></p>
    <p>До начала: <mark className="big">{msToNumbers(dif)}</mark></p>
    <br/>
    <p className="left">{table.teacher}</p>
    <p className="left">{table.place}</p>
  </div>;
  };