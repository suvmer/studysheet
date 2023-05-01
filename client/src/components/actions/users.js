import axios from 'axios';
import { fetchUser } from '../../store/profileReducer';

const users =
[
    {
        id: 1,
        name: "Сергей",
        currentTable: 1,
        ownTables: [1]
    }
]

export const getUser = (id) => {
  return async (dispatch) => {
      const response = users.find(el => el.id==id);
      console.log(`getUser(${id}) dispatched`, response);
      //const response = axios.get('https://api.github.com/users/suvmer');
      dispatch(fetchUser(response));
  }
}