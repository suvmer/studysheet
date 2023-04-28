import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Header } from "./components/Header";


/* near TODO:

ROUTER(навигация по страницам + /view/:id)

useMemo(оптимизация)


*/


function App() {
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
