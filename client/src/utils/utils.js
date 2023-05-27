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
export const checkEmail = (email) => {
  if(!email) return false;
  return  (email.length <= 50 && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)));
}
export const checkUniversity = (university) => {
  if(!university) return false;
  return  (/^[a-zA-Zа-яА-Я_ \-0-9]{2,20}$/.test(university));
}

export const validateLoginData = (formData) => {
  if(!formData || !formData.email || !formData.password)
    return false;
  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)))
    return false;
  return true;
}
export const validateRegData = (formData) => {
  if(!formData || !formData.email || !formData.password || !formData.info || !formData.info.university || !formData.info.city)
    return false;
  if(!checkEmail(formData.email))
    return false;
  if(!checkUniversity(formData.info.university))
    return false;
  if(!(/^[a-zA-Zа-яА-Я _\-]{2,20}$/.test(formData.info.city)))
    return false;
  return true;
}

export const msToWords = (ms) => {
    if(ms < 1000)
        return "0 секунд";
    var ss = Math.round(Math.abs(ms/1000));
    const hours = Math.floor(ss / 3600);
    ss %= 3600;
    const mins = Math.floor(ss / 60);
    const sec = ss % 60;

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
  return "Почти началось";
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