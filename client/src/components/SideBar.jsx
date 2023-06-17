import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setMenuOpen } from "../store/uiReducer";
import { useEffect, useRef, useState } from "react";

export const SideBar = () => {
    const isOpened = useSelector(state => state.ui.menuOpen);
    const ref = useRef(null);
    const dispatch = useDispatch();
    
    const isOpenedRef = useRef(false);
    useEffect(() => { isOpenedRef.current = isOpened }, [isOpened]);
    //const [isOpn, setOpn] = useState(false);
    //useEffect(() => { setOpn(isOpened) }, [isOpened]);

    const handleClickOutside = (event) => {
      if(isOpenedRef.current) {
        if (ref.current && !ref.current.contains(event.target))
          dispatch(setMenuOpen(false))
      }
    };
    useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, []);

  return <aside ref={ref} className={isOpened ? "opened" : ""}>
          <NavLink draggable="false" to="/" className={({isActive}) => isActive ? "active": ""}>Главная</NavLink>
          <NavLink draggable="false" to="/my" className={({isActive}) => isActive ? "active": ""}>Моё расписание</NavLink>
          <NavLink draggable="false" to="/account" className={({isActive}) => isActive ? "active": ""}>Аккаунт</NavLink>
        </aside>;
  }