import "./App.css";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Header } from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./components/actions/users";
import { ModalPortal } from "./components/ModalPortal";

const Modals = () => {
  const modal = useSelector(state => state.ui.modal);
  return <ModalPortal content={modal}/>;
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem('token'))
      dispatch(checkAuth());
  }, []);
  return (
    <>
      <Header/>
      <Modals/>
      <main>
        <SideBar/>
        <Outlet/>
      </main>
    </>
  );
}

export default App;
