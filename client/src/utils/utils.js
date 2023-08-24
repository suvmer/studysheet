import dayjs from "dayjs";

const width = (num) => num.toString().length;
const toWidth = (num, len) => len - width(num) <= 0 ? num.toString() : "0".repeat(len - width(num)) + num.toString();

export const dateToString = (stamp, nosecs = false) => {
  var a = new Date(stamp);
  return [
    `${toWidth(a.getDate(), 2)}.${toWidth((a.getMonth() + 1), 2)}.${toWidth(a.getFullYear(), 2)}`,
    `${toWidth(a.getHours(), 2)}:${toWidth(a.getMinutes(), 2)}${nosecs ? `` : `:${toWidth(a.getSeconds(), 2)}`}`,
  ];
};

export const checkField = (fieldName, str) => {
  var pattern = /\S*/;
  var min = 0;
  var max = 50;
  switch(fieldName) {
      case "name":
          pattern = /^[a-zA-Zа-яА-Я_-]{2,20}( [a-zA-Zа-яА-Я_-]{2,20})?$/;
          break;
      case "email":
          pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          break;
      case "university":
          pattern = /^[a-zA-Zа-яА-Я_ \-0-9]{2,20}$/;
          break;
      case "city":
          pattern = /^[a-zA-Zа-яА-Я _-]{2,20}$/;
          break;
      case "ip":
          pattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
          break;
      default:
        break;
  }
  
  if(typeof str != 'string')
      return false;
  str = str.trim();
  
  if(!str || !(str.length >= min && str.length <= max && pattern.test(str)))
      return false;
  return true;
};

export const validateTableData = (table) => true; //Todo :) (currently only server-side checking works + html inputs browser validation)
export const validateLoginData = (formData) => {
  return (
    formData
    && formData.email
    && formData.password
    && checkField("email", formData.email)
  );
}
export const validateRegData = (formData) => {
  return (
    formData   
    && formData.name
    && formData.email
    && formData.password
    && formData.info
    && formData.info.university
    && formData.info.city
    && checkField("name", formData.name)
    && checkField("email", formData.email)
    && checkField("university", formData.info.university)
    && checkField("city", formData.info.city)
  );
}

export const msToWords = (ms) => {
    if(ms < 1000)
        return "0 секунд";
    var ss = Math.round(Math.abs(ms/1000));
    const days = Math.floor(ss / 3600 /24);
    const hours = Math.floor(ss / 3600)%24;
    ss %= 3600;
    const mins = Math.floor(ss / 60);
    const sec = ss % 60;
    return `${days > 0 ? days.toString() + (CountForm(days, [" день ", " дня ", " дней "])) : ''}
            ${hours > 0 ? hours.toString() + (CountForm(hours, [" час ", " часа ", " часов "])) : ''}
            ${mins > 0 ? mins.toString() + (CountForm(mins, [" минута ", " минуты ", " минут "])) : ''}
            ${days === 0 && sec > 0 ? sec + " " + (CountForm(sec, [" секунда ", " секунды ", " секунд "])) : ''}`;
};
export const msToNumbers = (ms) => {
    var ss = Math.round(Math.max(0, ms/1000));
    const hours = Math.floor(ss / 3600);
    ss %= 3600;
    const mins = Math.floor(ss / 60);
    const sec = ss % 60;
    return `${toWidth(hours, 2)}:${toWidth(mins,2)}:${toWidth(sec, 2)}`;
  };
  
export const CountForm = (number, titles = ["секунду", "секунды", "секунд"]) => {
    number = Math.abs(number);
    if (Number.isInteger(number)) {
      const cases = [2, 0, 1, 1, 1, 2];  
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }
    return titles[1];
  }

export const getTitle = (ms) => {
  if(ms > 60*60*1000)
    return "Следующее событие";
  if(ms > 20*60*1000)
    return "Скоро будет";
  if(ms > 0)
    return "Почти началось";
  return "Уже началось";
}

export const generateKey = (pre) => {
  return `${ pre }_${ new Date().getTime() }`;
}
//todo: fix closest event search
export const getDif = (ts1, ts2) => {
  const d1 = dayjs(ts1);
  const d2 = dayjs(ts2);
  return Math.abs((dayjs().hour(d1.hour()).minute(d1.minute()).second(d1.second())).valueOf() - (dayjs().hour(d2.hour()).minute(d2.minute()).second(d2.second())).valueOf());
}
export const getDifSign = (ts1, ts2) => {
  const d1 = dayjs(ts1);
  const d2 = dayjs(ts2);
  return ((dayjs().hour(d1.hour()).minute(d1.minute()).second(d1.second())).valueOf() - (dayjs().hour(d2.hour()).minute(d2.minute()).second(d2.second())).valueOf());
}

export const getClosestSubject = (list, time = Date.now()) => {
  const today = ((new Date(time)).getDay()+6)%7;
  var cursubj = null;
  var mode = -1; //0 - before, 1 - in process
  var dif = today - (((new Date()).getDay()+6)%7);
  if(dif < 0)
      dif += 7;
  dif *= 86400000; //1 day = 1000*60*60*24 = 86400000ms
  list[today].forEach(el => {
      if(el.start + dif <= time && el.end + dif >= time) {
          if(cursubj == null || el.start < cursubj.start) {
              cursubj = el;
              mode = 1;
          }
      }
      if(el.start + dif > time) {
          if(mode !== 1) {
              if(cursubj === null || el.start < cursubj.start) {
                  cursubj = el;
                  mode = 0;
              }
          }
      }
  })
  if(cursubj != null)
      return [{...cursubj, start: cursubj.start + dif, end: cursubj.end + dif}, mode, today];
  return [cursubj, mode, today];
}
export const getClosest = (list) => {
  const [cursubj, mode, today] = getClosestSubject(list);
  if(cursubj == null) { //not found upcoming events in today
      for(var i = 1; i <= 7; i++) { //so find them in other days
          const [nextSubj, nextMode, nextday] = getClosestSubject(list, dayjs(Date.now() + i*86400000).hour(0).minute(0).second(0).valueOf()); //1 day = 1000*60*60*24 = 86400000ms
          if(nextSubj != null) 
              return [nextSubj, nextMode, nextday];
      }
  }
  return [cursubj, mode, today];
}

export const shortTo = (str, cnt) => str.length > cnt ? str.substr(0, cnt-3) + "..." : str;

export const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
export const shortDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];