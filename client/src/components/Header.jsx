import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Clock as Calendar } from "../resources/Calendars";
import { dateToString } from "../utils/utils";
import { useEffect } from "react";
import { setTime } from "../store/uiReducer";

export const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    var date = new Date();
    setInterval(() => dispatch(setTime(Date.now())), 1000);
  }, []);
  
  
  const curdate = useSelector(state => state.ui.time); 
    
  return <header>
    <Calendar />
    <Link to="/">
      Study<mark className="blue bold">SHEET</mark>
    </Link>
    <p>{dateToString(curdate)[1]}</p>
  </header>;
}