import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Clock as Calendar } from "../resources/Calendars";
import { dateToString } from "../utils/utils";

export const Header = () => {
    const curdate = useSelector(state => state.ui.time); 
    return <header>
      <Calendar />
      <NavLink to="/">
        Study<mark className="blue bold">SHEET</mark>
      </NavLink>
      <p>{dateToString(curdate)[1]}</p>
    </header>;
  }