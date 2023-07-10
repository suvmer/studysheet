import ScheduleService from '../../services/ScheduleService';
import dayjs from 'dayjs'

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