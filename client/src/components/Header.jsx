import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { setMenuOpen, setTime } from "../store/uiReducer";
import {AiOutlineMenu, AiOutlineUser} from 'react-icons/ai'
import {BiLogIn} from 'react-icons/bi'
import UIService from "../services/UIService";


export const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setInterval(() => dispatch(setTime(Date.now())), 1000);
  }, [dispatch]);
  
  const isLogged = useSelector(state => state.profile.isLogged);
  const isOp = useSelector(state => state.ui.menuOpen);
  useEffect(() => setOpened(isOp), [isOp]);
  const [isOpened, setOpened] = useState(false);
  const setOpn = () => dispatch(setMenuOpen(!isOpened));
  
  return <header className="header">
    <AiOutlineMenu onClick={() => setOpn()} className={`icons menuIcon${isOpened ? " opened" : ""}`}/>
    <div className="header_title">
      <Link to="/">Study<mark className="blue bold">SHEET</mark></Link>
    </div>
    {isLogged ?
      <Link to="/account"><AiOutlineUser className="header_icon" onClick={() => {}} /></Link> :
      <BiLogIn className="header_icon" onClick={() => UIService.openAuthForm(true)} />
    }
  </header>;
}