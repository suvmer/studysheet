import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function useOnClickOutside(ref, action, path) {
    const used = useSelector(state => path.reduce((acc, cur) => acc[cur], state));
    const dispatch = useDispatch();
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target))
            dispatch(action(!used))
      };
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, []);
}