import { useMemo, useState } from "react";
import "./App.css";
import { Clock as Calendar } from "./resources/Calendars";
import { dateToString, getTitle, msToNumbers, msToWords } from "./utils/utils";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setTime } from "./store/uiReducer";
import { Outlet } from "react-router-dom";


/* near TODO:

ROUTER(навигация по страницам + /view/:id)

useMemo(оптимизация)


*/


function App() {
  const table = useSelector((state) => state.table.tables[0]);
  const curdate = useSelector(state => state.ui.time);  
  const dispatch = useDispatch();

  var date = new Date();
  useMemo(() => setInterval(() => dispatch(setTime(Date.now())), 1000), []);


  const SideBar = () => {
    return <aside>
      <a className="active" href="#">Главная</a>
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

  return (
    <>
      <Header/>
      <main>
        <SideBar/>
        <Outlet/>
      </main>
    </>
  );
}

export default App;
