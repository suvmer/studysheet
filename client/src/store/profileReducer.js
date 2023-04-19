/* near TODO:
1) Получать данные с сервака сначала про ид таблиц, которыми владеет пользователь
2) Затем получать с сервака инфу о нужном расписании

*/
const defaultState = {
  currentTable: 0,
  ownTables: [0]
};

export const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
