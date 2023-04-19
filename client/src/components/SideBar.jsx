import { Link, NavLink } from "react-router-dom";

export const SideBar = () => {
    return <aside>
      <NavLink to="/" className={({isActive}) => isActive ? "active": ""}>Главная</NavLink>
      <NavLink to="/my" className={({isActive}) => isActive ? "active": ""}>Моё расписание</NavLink>
      <NavLink to="/account" className={({isActive}) => isActive ? "active": ""}>Аккаунт</NavLink>
    </aside>;
  }