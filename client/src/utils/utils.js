import dayjs from "dayjs";

Number.prototype.width = function () {
  return this.toString().length;
};
Number.prototype.toWidth = function (width) {
  return width - this.width() <= 0
    ? this
    : new String("0", width - this.width()) + this;
};

export const dateToString = (stamp, nosecs = false) => {
  var a = new Date(stamp);
  return [
    `${a.getDate().toWidth(2)}.${(a.getMonth() + 1).toWidth(2)}.${a
      .getFullYear()
      .toWidth(2)}`,
    `${a.getHours().toWidth(2)}:${a.getMinutes().toWidth(2)}${nosecs ? `` : `:${a
      .getSeconds()
      .toWidth(2)}`}`,
  ];
};

export const checkField = (fieldName, str) => {
  var message = "Некорректные данные";
  var pattern = /\S*/;
  var min = 0;
  var max = 50;
  switch(fieldName) {
      case "name":
          message = "Некорректное имя";
          pattern = /^[a-zA-Zа-яА-Я_\-]{2,20}( [a-zA-Zа-яА-Я_\-]{2,20})?$/;
          break;
      case "email":
          message = "Некорректная почта";
          pattern = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
          break;
      case "university":
          message = "Некорректное место";
          pattern = /^[a-zA-Zа-яА-Я_ \-0-9]{2,20}$/;
          break;
      case "city":
          message = "Некорректный город";
          pattern = /^[a-zA-Zа-яА-Я _-]{2,20}$/;
          break;
      case "ip":
          message = "Некорректный ip";
          pattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
          break;
  }
  
  if(typeof str != 'string')
      return false;
  str = str.trim();
  
  if(!str || !(str.length >= min && str.length <= max && pattern.test(str)))
      return false;
  return true;
};

export const validateTableData = (table) => {
  return true;
};
/*
{
    "info": {
        "unversity": "Вуз",  ^[a-zA-Zа-яА-Я_ \-0-9]{2,20}$
        "city": ""  ^[a-zA-Zа-яА-Я _\-]{2,20}$
    },
    "name": "fa",  ^[a-zA-Zа-яА-Я_\-]{2,20}$
    "email": "fda", ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$
    "password": "fda"
}
*/
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

export const msToWords = (ms, parentCase = false) => {
    if(ms < 1000)
        return "0 секунд";
    var ss = Math.round(Math.abs(ms/1000));
    const hours = Math.floor(ss / 3600);
    ss %= 3600;
    const mins = Math.floor(ss / 60);
    const sec = ss % 60;
    if(parentCase)
      return `${hours > 0 ? hours.toString() + (CountForm(hours, [" час ", " часа ", " часов "])) : ''}
              ${mins > 0 ? mins.toString() + (CountForm(mins, [" минута ", " минуты ", " минут "])) : ''}
              ${sec > 0 ? sec + " " + (CountForm(sec, ["секунда", "секунды", "секунд"])) : ''}`;
    return `${hours > 0 ? hours.toString() + (CountForm(hours, [" час ", " часа ", " часов "])) : ''}
            ${mins > 0 ? mins.toString() + (CountForm(mins, [" минута ", " минуты ", " минут "])) : ''}
            ${sec > 0 ? sec + " " + (CountForm(sec)) : ''}`;
};
export const msToNumbers = (ms) => {
    var ss = Math.round(Math.max(0, ms/1000));
    const hours = Math.floor(ss / 3600);
    ss %= 3600;
    const mins = Math.floor(ss / 60);
    const sec = ss % 60;
    return `${hours.toWidth(2)}:${mins.toWidth(2)}:${sec.toWidth(2)}`;
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

export const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
export const shortDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];