import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Header } from "./components/Header";
import { useSelector } from "react-redux";
import { AuthForm } from "./components/AuthForm";


/* near TODO:

ROUTER(навигация по страницам + /view/:id)

useMemo(оптимизация)


*/


function App() {
  const loginOpen = useSelector(state => state.ui.loginOpen); 
  return (
    <>
      <Header/>
      {loginOpen ? <AuthForm/> : <></>}
      <main>
        <SideBar/>
        <Outlet/>
      </main>
    </>
  );
}

export default App;
