import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setMenuOpen } from "../store/uiReducer";
import { useEffect, useRef } from "react";

export const SideBar = () => {
    const isOpened = useSelector(state => state.ui.menuOpen);
    const sidebarRef = useRef(null);
    const isOpenedRef = useRef(false);
    const dispatch = useDispatch();
    
    const closeMenu = () => dispatch(setMenuOpen(false));
    useEffect(() => { isOpenedRef.current = isOpened }, [isOpened]); //sync with global stage(sry for this way...)
    useEffect(() => { //handle click outside
      const handleClickOutside = (event) => {
        if(isOpenedRef.current) {
          if (sidebarRef.current && !sidebarRef.current.contains(event.target))
            dispatch(setMenuOpen(false))
        }
      };
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, [dispatch]);
  return <aside ref={sidebarRef} className={isOpened ? "opened" : ""}>
          <NavLink onClick={() => closeMenu()} draggable="false" to="/" className={({isActive}) => isActive ? "active": ""}>Главная</NavLink>
          <NavLink onClick={() => closeMenu()} draggable="false" to="/my" className={({isActive}) => isActive ? "active": ""}>Моё расписание</NavLink>
          <NavLink onClick={() => closeMenu()} draggable="false" to="/account" className={({isActive}) => isActive ? "active": ""}>Аккаунт</NavLink>
          <a target="_BLANK" rel="noreferrer" href="https://vk.com/suvmer" className="link small center">© vk.com/suvmer</a>
        </aside>;
  }