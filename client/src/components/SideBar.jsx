import { NavLink } from "react-router-dom";

export const SideBar = () => {
    return <aside>
      <NavLink draggable="false" to="/" className={({isActive}) => isActive ? "active": ""}>Главная</NavLink>
      <NavLink draggable="false" to="/my" className={({isActive}) => isActive ? "active": ""}>Моё расписание</NavLink>
      <NavLink draggable="false" to="/account" className={({isActive}) => isActive ? "active": ""}>Аккаунт</NavLink>
    </aside>;
  }