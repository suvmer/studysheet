import axios from 'axios';
import { fetchTable, fetchTables } from '../../store/tableReducer';
import { fetchUser } from '../../store/profileReducer';
import { getUser } from './users';

const schedules =
[
    {
      id: 1,
      name: "КБ21СО",
      creator: 1,
      tables:
      [
        [
          {
              "start": 978327000000,
              "end": 978333300000,
              "duration": 95,
              "name": "Электроника и схемотехника",
              "cabinet": "207",
              "teacher": "Артемова Татьяна Константиновна",
              "place": "2 корпус(ул. Кирова, 8/10)"
          },
          {
              "start": 978344400000,
              "end": 978350100000,
              "duration": 95,
              "name": "Дифференциальные уравнения",
              "cabinet": "420",
              "teacher": "Секацкая Алина Вадимовна",
              "place": "7 корпус(Союзная 144)"
          },
          {
              "start": 978350100000,
              "end": 978356400000,
              "duration": 95,
              "name": "Дифференциальные уравнения",
              "cabinet": "420",
              "teacher": "Секацкая Алина Вадимовна",
              "place": "7 корпус(Союзная 144)"
          }
        ],
        [
          {
              "start": 978327000000,
              "end": 978333300000,
              "duration": 95,
              "name": "Электроника и схемотехника",
              "cabinet": "207",
              "teacher": "Артемова Татьяна Константиновна",
              "place": "2 корпус(ул. Кирова, 8/10)"
          },
          {
              "start": 978335100000,
              "end": 978340800000,
              "duration": 95,
              "name": "",
              "cabinet": "",
              "teacher": "",
              "place": "7 корпус(Союзная 144)"
          }
        ],
        [
          {
              "start": 978327000000,
              "end": 978333300000,
              "duration": 95,
              "name": "Электроника и схемотехника",
              "cabinet": "207",
              "teacher": "Артемова Татьяна Константиновна",
              "place": "2 корпус(ул. Кирова, 8/10)"
          }
        ],
        [
          {
              "start": 978327000000,
              "end": 978333300000,
              "duration": 95,
              "name": "Электроника и схемотехника",
              "cabinet": "207",
              "teacher": "Артемова Татьяна Константиновна",
              "place": "2 корпус(ул. Кирова, 8/10)"
          }
        ],
        [
          {
              "start": 978327000000,
              "end": 978333300000,
              "duration": 95,
              "name": "Электроника и схемотехника",
              "cabinet": "207",
              "teacher": "Артемова Татьяна Константиновна",
              "place": "2 корпус(ул. Кирова, 8/10)"
          }
        ],
        [
          {
              "start": 978327000000,
              "end": 978333300000,
              "duration": 95,
              "name": "Электроника и схемотехника",
              "cabinet": "207",
              "teacher": "Артемова Татьяна Константиновна",
              "place": "2 корпус(ул. Кирова, 8/10)"
          }
        ],
        [
          {
              "start": 978327000000,
              "end": 978333300000,
              "duration": 95,
              "name": "Электроника и схемотехника",
              "cabinet": "207",
              "teacher": "Артемова Татьяна Константиновна",
              "place": "2 корпус(ул. Кирова, 8/10)"
          }
        ]
      ]
    }
]

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
        console.log("getTables() dispatched", response);
        //const response = axios.get('https://api.github.com/users/suvmer');
        dispatch(fetchTables(response));
    }
}

export const getTable = (id) => {
  return async (dispatch, getState) => {
      const response = schedules.find(el => el.id==id);
      /*const response = [
          {
            start: Date.now() + 20*60*1000 + 10000,
            duration: 35,
            name: "Пара математического анализа",
            cabinet: "405",
            teacher: "Ухалов Алексей Юрьевич",
            place: "2 корпус(ул. Кирова, 8/10)"
          }
        ]*/
      console.log(`getTable(${id}) dispatched`, response);
      //const response = axios.get('https://api.github.com/users/suvmer');
      if(!response)
        return;
      dispatch(fetchTable(response));
      if(!getState().profile.users.find(user => user.id == response.creator)) {
        console.log(`Fetching profile id ${response.creator}`);
        dispatch(getUser(response.creator));
      }
  }
}