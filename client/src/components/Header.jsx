import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Clock as Calendar } from "../resources/Calendars";
import { dateToString } from "../utils/utils";
import { useEffect } from "react";
import { setLogin, setTime } from "../store/uiReducer";
import {AiOutlineUser} from 'react-icons/ai'
import {BiLogIn} from 'react-icons/bi'


export const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    var date = new Date();
    setInterval(() => dispatch(setTime(Date.now())), 1000);
  }, []);
  
  
  //const curdate = useSelector(state => state.ui.time); 
    
  return <header className="header">
    <div className="header_title">
      <Link to="/">Study<mark className="blue bold">SHEET</mark></Link>
    </div>
    {1 ? <BiLogIn className="header_icon" onClick={() => dispatch(setLogin(true))} /> :
    <AiOutlineUser className="header_icon" onClick={() => {}} />}
  </header>;
}