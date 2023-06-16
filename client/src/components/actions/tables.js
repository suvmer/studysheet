import { fetchTable, fetchTables } from '../../store/tableReducer';
import { getUser } from './users';
import ScheduleService from '../../services/ScheduleService';
import dayjs from 'dayjs'

const schedules =
[
    {
      id: 1,
      name: "КБ21СО",
      creator: 1,
      info: {},
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

const standartTable = (table) => {
  if(typeof(table.tables) == "string")
    table.tables = JSON.parse(table.tables);
  return ({
      ...table,
      tables: table.tables.map(el =>
        el.map(subj => {
            var start = dayjs(subj.start);
            var end = dayjs(subj.end);
            return ({...subj, start: dayjs().hour(start.hour()).minute(start.minute()), end: dayjs().hour(end.hour()).minute(end.minute())});
          }
        )
      )
    }
  )
}

export const getTable = (id) => {
  return async (dispatch, getState) => {
    //if(!getState().profile.isLogged)
    //  return;
    const response = await ScheduleService.getTable(id);
    if(!response || !response.data)
        throw Error(response?.message ?? "Ошибка");
    return ({
      ...response.data,
      table: standartTable(response.data.table)
    });
  }
}

export const sendTable = (table) => {
  return async (dispatch, getState) => {
      if(!getState().profile.isLogged)
          return;
      const response = await ScheduleService.sendTable(table);
      if(!response || !response.data)
          throw Error(response?.message ?? "Ошибка");
      return "Успешно";
      //dispatch(table(response.data.user, response.data.refreshToken, response.data.accessToken));*/
  }
}
export const editTable = (table) => {
  return async (dispatch, getState) => {
      if(!getState().profile.isLogged)
          return;
      const response = await ScheduleService.editTable(table);
      if(!response || !response.data)
          throw Error(response?.message ?? "Ошибка");
      return "Успешно";
      //dispatch(table(response.data.user, response.data.refreshToken, response.data.accessToken));*/
  }
}

export const deleteTable = (id) => {
  return async (dispatch, getState) => {
      if(!getState().profile.isLogged)
          return;
      const response = await ScheduleService.deleteTable(id);
      if(!response || !response.data)
          throw Error(response?.message ?? "Ошибка");
      return "Успешно";
  }
}

export const getOwnTables = () => {
  return async (dispatch, getState) => {
      if(!getState().profile.isLogged)
          return;
      const response = await ScheduleService.getMyTables();
      if(!response || !response.data)
          throw Error(response?.message ?? "Ошибка");
      return {...response.data,
        tables: response.data.tables.map(el => standartTable(el)).sort((e1, e2) => e2.created - e1.created)
      };
  }
}

//    /schedule/getfrom