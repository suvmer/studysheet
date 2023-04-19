Number.prototype.width = function () {
  return this.toString().length;
};
Number.prototype.toWidth = function (width) {
  return width - this.width() <= 0
    ? this
    : new String("0", width - this.width()) + this;
};

export const dateToString = (stamp) => {
  var a = new Date(stamp);
  return [
    `${a.getDate().toWidth(2)}.${(a.getMonth() + 1).toWidth(2)}.${a
      .getFullYear()
      .toWidth(2)}`,
    `${a.getHours().toWidth(2)}:${a.getMinutes().toWidth(2)}:${a
      .getSeconds()
      .toWidth(2)}`,
  ];
};

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