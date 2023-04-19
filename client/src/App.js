import { useMemo, useState } from "react";
import "./App.css";
import { Clock as Calendar } from "./resources/Calendars";
import { dateToString, getTitle, msToNumbers, msToWords } from "./utils/utils";
import { useDispatch, useSelector } from "react-redux";


/* near TODO:

ROUTER(навигация по страницам + /view/:id)

useMemo(оптимизация)


*/


function App() {
  const table = useSelector((state) => state.table.tables[0]);

  var date = new Date();
  useMemo(() => setInterval(() => setDate(Date.now()), 1000), []);

  const [curdate, setDate] = useState(Date.now());

  const SideBar = () => {
    return <aside>
      <a href="#">Главная</a>
      <a href="#">Моё расписание</a>
      <a href="#">Аккаунт</a>
    </aside>;
  }
  const Header = () => {
    return <header>
      <Calendar />
      <a href="#">
        Study<mark className="blue bold">SHEET</mark>
      </a>
      <p>{dateToString(curdate)[1]}</p>
    </header>;
  }

  const InfoBlock = ({text, children}) => {
    return <p>
      {text} <mark className="big">{children}</mark>
    </p>;
  }

  const Event = () => {
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
    <br/>
    
    <InfoBlock text="Кабинет:">{table.cabinet}</InfoBlock>
    <InfoBlock text="До начала:">{msToNumbers(table.start - curdate)}</InfoBlock>
    <br/>
    <p className="left">{table.teacher}</p>
    <p className="left">{table.place}</p>
  </div>;
  }

  return (
    <>
      <Header/>
      <main>
        <SideBar/>
        <div className="wall">
          <span className="event" style={{ marginRight: "auto" }}>
            <mark className="big">{dateToString(curdate)[0]}</mark>
          </span>
          <Event/>
        </div>
      </main>
    </>
  );
}

export default App;
