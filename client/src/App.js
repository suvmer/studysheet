import "./App.css";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Header } from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { AuthForm } from "./components/AuthForm";
import { Portal } from "./components/Portal";
import { checkAuth } from "./components/actions/users";
import { ChangePassPortal } from "./components/ChangePassPortal";
import { ChangeInfoPortal } from "./components/ChangeInfoPortal";


/* near TODO:

ROUTER(навигация по страницам + /view/:id)

useMemo(оптимизация)


*/
const Modals = () => {
  const chpwOpen = useSelector(state => state.ui.chpwOpen);
  const infoOpen = useSelector(state => state.ui.infoOpen);
  return <>{chpwOpen ? <ChangePassPortal/> : ""}
  {infoOpen ? <ChangeInfoPortal/> : ""}</>;
}

function App() {
  const loginOpen = useSelector(state => state.ui.loginOpen); 
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token'))
      dispatch(checkAuth());
  }, []);
  return (
    <>
      <Header/>
      <Modals/>
      {loginOpen ? <Portal><AuthForm/></Portal> : <></>}
      <main>
        <SideBar/>
        <Outlet/>
      </main>
    </>
  );
}

export default App;
