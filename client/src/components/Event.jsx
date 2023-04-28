import { dateToString, getTitle, msToNumbers, msToWords } from '../utils/utils';
import { useSelector } from 'react-redux';
import { InfoBlock } from './InfoBlock';

export const Event = ({table}) => {
    const curdate = useSelector(state => state.ui.time);  

    return <div className={`event `+((curdate - table.start > 0) ? 'active' : '')}>
    <div className="nextEvent">
      <span>{getTitle(table.start - curdate)}</span>
      <span className="time">
        {dateToString(table.start)[1]} - {dateToString(table.start + table.duration * 60 * 1000)[1]}
      </span>
    </div>
    <hr />
    <div className="eventBody">{table.name}</div>
    <div className="eventTitle">Начнётся через {msToWords(table.start - curdate)}</div>
    <hr />
    <br/>
    
    <InfoBlock text="Кабинет:">{table.cabinet}</InfoBlock>
    <InfoBlock text="До начала:">{msToNumbers(table.start - curdate)}</InfoBlock>
    <br/>
    <p className="left">{table.teacher}</p>
    <p className="left">{table.place}</p>
  </div>;
  };