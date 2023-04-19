import { useSelector } from "react-redux";
import { Clock as Calendar } from "../resources/Calendars";
import { dateToString } from "../utils/utils";

export const Header = () => {
    const curdate = useSelector(state => state.ui.time); 
    return <header>
      <Calendar />
      <a href="#">
        Study<mark className="blue bold">SHEET</mark>
      </a>
      <p>{dateToString(curdate)[1]}</p>
    </header>;
  }