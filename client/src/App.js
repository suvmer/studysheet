import "./App.css";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Header } from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { AuthForm } from "./components/AuthForm";
import { Portal } from "./components/Portal";
import { checkAuth } from "./components/actions/users";


/* near TODO:

ROUTER(навигация по страницам + /view/:id)

useMemo(оптимизация)


*/


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
      {loginOpen ? <Portal><AuthForm/></Portal> : <></>}
      <main>
        <SideBar/>
        <Outlet/>
      </main>
    </>
  );
}

export default App;
