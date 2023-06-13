import { useOutlet } from 'react-router-dom';

export const MyPage = () => {
    const outlet = useOutlet();
    return outlet;
}