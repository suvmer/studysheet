import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Clock as Calendar } from "../resources/Calendars";
import { dateToString } from "../utils/utils";
import { useEffect, useRef, useState } from "react";
import { setLogin, setMenuOpen, setTime } from "../store/uiReducer";
import {AiOutlineMenu, AiOutlineUser} from 'react-icons/ai'
import {BiLogIn} from 'react-icons/bi'


export const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    var date = new Date();
    setInterval(() => dispatch(setTime(Date.now())), 1000);
  }, []);
  
  const isLogged = useSelector(state => state.profile.isLogged);
  const isOp = useSelector(state => state.ui.menuOpen);
  useEffect(() => setOpened(isOp), [isOp]);
  const [isOpened, setOpened] = useState(false); //TODO: fix that...
  const setOpn = () => {
    dispatch(setMenuOpen(!isOpened));
  }
  //const curdate = useSelector(state => state.ui.time); 
  return <header className="header">
    <AiOutlineMenu onClick={() => setOpn()} className={`icons menuIcon${isOpened ? " opened" : ""}`}/>
    <div className="header_title">
      <Link to="/">Study<mark className="blue bold">SHEET</mark></Link>
    </div>
    {isLogged ?
      <Link to="/account"><AiOutlineUser className="header_icon" onClick={() => {}} /></Link> :
      <BiLogIn className="header_icon" onClick={() => dispatch(setLogin(true))} />
    }
  </header>;
}