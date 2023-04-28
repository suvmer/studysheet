import axios from 'axios';
import { fetchTables } from '../../store/tableReducer';

export const getTables = () => {
    return async (dispatch) => {
        const response = [
            {
              start: Date.now() + 20*60*1000 + 10000,
              duration: 35,
              name: "Пара математического анализа",
              cabinet: "405",
              teacher: "Ухалов Алексей Юрьевич",
              place: "2 корпус(ул. Кирова, 8/10)"
            }
          ]
        console.log("response dispatched", response);
        //const response = axios.get('https://api.github.com/users/suvmer');
        dispatch(fetchTables(response));
    }
}