import { useMemo, useState } from "react";
import "./App.css";
import { Clock as Calendar } from "./resources/Calendars";
import { dateToString, msToNumbers, msToWords } from "./utils/utils";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const table = useSelector((state) => state.table.tables[0]);

  var date = new Date();
  useMemo(() => setInterval(() => setDate(Date.now()), 1000), []);

  const [curdate, setDate] = useState(Date.now());

  const getTitle = (ms) => {
    if(ms > 60*60*1000)
      return "Следующее событие";
    if(ms > 20*60*1000)
      return "Скоро будет";
    return "Почти началось";
  }

  return (
    <>
      <header>
        <Calendar />
        <a href="#">
          Study<mark className="blue bold">SHEET</mark>
        </a>
        <p>{dateToString(curdate)[1]}</p>
      </header>
      <main>
        <aside>
          <a href="#">Главная</a>
          <a href="#">Моё расписание</a>
          <a href="#">Аккаунт</a>
        </aside>
        <div className="wall">
          <span className="event" style={{ marginRight: "auto" }}>
            <mark className="big">{dateToString(curdate)[0]}</mark>
          </span>
          <div className={`event `+((curdate - table.start > 0) ? 'active' : '')}>
            <div className="nextEvent">
              <span>{getTitle(table.start - curdate)}</span>
              <span className="time">
                {dateToString(table.start)[1]} - {dateToString(table.start + table.duration * 60 * 1000)[1]}
              </span>
            </div>
            <hr />
            <div className="eventBody">{table.name}</div>
            <div className="eventTitle">Начнётся через {msToWords(table.start - curdate)}</div>
            <br/>
            
            <p>
              Кабинет: <mark className="big">{table.cabinet}</mark>
            </p>
            <p>
              До начала: <mark className="big">{msToNumbers(table.start - curdate)}</mark>
            </p>
            <br/>
            <p className="left">{table.teacher}</p>
            <p className="left">{table.place}</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
