import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Clock as Calendar } from "../resources/Calendars";
import { dateToString } from "../utils/utils";
import { useEffect } from "react";
import { setTime } from "../store/uiReducer";
import {GiExitDoor} from 'react-icons/gi'
import {BiUserCircle} from 'react-icons/bi'
import {BiUserCircle} from 'react-icons/bi'


export const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    var date = new Date();
    setInterval(() => dispatch(setTime(Date.now())), 1000);
  }, []);
  
  
  const curdate = useSelector(state => state.ui.time); 
    
  return <header className="header">
    <div className="header_title">
      <Calendar />
    </div>
    <Link to="/">Study<mark className="blue bold">SHEET</mark></Link>
    {0 ? <GiExitDoor className="header_icon" onClick={() => {}}/> :
    <BiUserCircle className="header_icon" onClick={() => {}}/>}
  </header>;
}