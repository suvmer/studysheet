import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function useOnClickOutside(ref, action, path) {
    const used = useSelector(state => path.reduce((acc, cur) => acc[cur], state));
    console.log("eto ") 
    const dispatch = useDispatch();
    useEffect(() => {
      const handleClickOutside = (event) => {
        console.log("eda ", ref) 
        if (ref.current && !ref.current.contains(event.target))
            dispatch(action(!used))
      };
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, []);
}