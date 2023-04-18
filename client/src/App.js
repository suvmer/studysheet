import { useMemo, useState } from "react";
import "./App.css";
import { Clock as Calendar } from "./resources/Calendars";
import { dateToString, msToString } from "./utils/utils";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const table = useSelector((state) => state.table.tables[0]);

  var date = new Date();
  useMemo(() => setInterval(() => {
    setDate(dateToString(Date.now()));
    setTimer(msToString(table.start - Date.now()));
  }, 1000), []);

  const [curdate, setDate] = useState(dateToString(Date.now()));
  const [timer, setTimer] = useState(msToString(table.start - Date.now()));
  return (
    <>
      <header>
        <Calendar />
        <a href="#">
          Study<mark className="blue bold">SHEET</mark>
        </a>
        <p>{curdate[1]}</p>
      </header>
      <main>
        <aside>
          <a href="#">Главная</a>
          <a href="#">Моё расписание</a>
          <a href="#">Аккаунт</a>
        </aside>
        <div className="wall">
          <span className="event" style={{ marginRight: "auto" }}>
            <mark className="big">{curdate[0]}</mark>
          </span>
          <div className="event">
            <div className="nextEvent">
              <span>Следующее событие</span>
              <span className="time">
                {dateToString(table.start)[1]} - {dateToString(table.start + table.duration * 60 * 1000)[1]}
              </span>
            </div>
            <hr />
            <div className="eventBody">{table.name}</div>
            <div className="eventTitle">Начнётся через {timer}</div>
            <br/>
            <p>
              До начала: <mark className="big">00:10:00</mark>
            </p>
            <p>
              Кабинет: <mark className="big">405</mark>
            </p>
            <br/>
            <p className="left">2 корпус (ул. Кирова, 8/10)</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
