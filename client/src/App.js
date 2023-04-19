import { useMemo, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setTime } from "./store/uiReducer";
import { Outlet } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Header } from "./components/Header";


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
