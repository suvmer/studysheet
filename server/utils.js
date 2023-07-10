const ApiError = require("./exceptions/api-error");

dayjs = require('dayjs')
var weekday = require('dayjs/plugin/weekday')
dayjs.extend(weekday)

class utils {
    HttpCodes = {
        success : 200,
        badRequest: 400,
        notFound : 404
    }

    days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    shortDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    withACapital(str) {
        return str.toLowerCase().replace(/(^[a-zа-яё]{1})|(\s+[a-zа-яё]{1})/g, letter => letter.toUpperCase())
    }

    checkField(fieldName, str, tr = false, canbeEmpty = false) {
        var message = "Некорректные данные";
        var pattern = /\S*/;
        var min = 1;
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
            case "subjectName":
                message = "Некорректное название предмета";
                break;
            case "sheetName":
                message = "Некорректное название расписания";
                break;
            case "sheetCabinet":
                message = "Некорректный кабинет";
                break;
            case "sheetTeacher":
                message = "Некорректное имя педагога";
                break;
            case "sheetPlace":
                message = "Некорректное название места";
                break;
                /*{
                    "start": 978328800000,
                    "end": 978334500000,
                    "name": "Aboba",
                    "cabinet": "500",
                    "teacher": "Fdaf",
                    "id": 0,
                    "place": "7 корпус(Союзная 144)"
                }*/
        }
        
        if(typeof str != 'string') {
            if(tr)
                throw ApiError.BadRequest(message);
            return false;
        }
        str = str.trim();
        if(str === "" && canbeEmpty) {
            if(tr)
                return str;
            return true;
        }

        if(!str || !(str.length >= min && str.length <= max && pattern.test(str))) {
            if(tr)
                throw ApiError.BadRequest(message);
            return false;
        }
        if(tr)
            return str;
        return true;
    }

    checkSchedule(table) {
        const toStore = {
            name: '',
            creator: -1,
            members: [],
            groups: [],
            info: [],
            created: Date.now(),
            tables: []
          };
          toStore.name = this.checkField("sheetName", table.name, true);
          toStore.public = (table.public == true);
          if(!table.tables)
            throw ApiError.BadRequest("Некорректный запрос");
          [...Array(7)].forEach((e, ind) => {
            if(table.tables[ind] == undefined || !Array.isArray(table.tables[ind]))
                throw ApiError.BadRequest("Недостаточно дней в расписании");
            toStore.tables[ind] = [];
            table.tables[ind].forEach(el => {
                if(!el.start || !el.end || !el.name || el.cabinet == undefined || el.teacher == undefined || el.place == undefined)
                  throw ApiError.BadRequest(`Неполные данные`);
                const tab = {
                  "start": dayjs().hour(dayjs(el.start).hour()).minute(dayjs(el.start).minute()).valueOf(),
                  "end": dayjs().hour(dayjs(el.end).hour()).minute(dayjs(el.end).minute()).valueOf(),
                  "name": "",
                  "cabinet": "",
                  "teacher": "",
                  "place": ""
                };
                if(isNaN(tab.start) || isNaN(tab.end) || dayjs(tab.start) >= dayjs(tab.end))
                  throw ApiError.BadRequest("Некорректное время начала");
                tab['name'] = this.checkField("subjectName", el.name, true);
                tab['cabinet'] = this.checkField("sheetCabinet", el.cabinet, true, true);
                tab['teacher'] = this.checkField("sheetTeacher", el.teacher, true, true);
                tab['place'] = this.checkField("sheetPlace", el.place, true, true);
                
                toStore.tables[ind].push(tab);
              })
              if(toStore.tables[ind].length > 10)
                throw ApiError.BadRequest("Должно быть не более 10 событий в день");
              
          });
          return toStore;
    }

    error(msg) {
        return {status: this.HttpCodes.badRequest, message: msg};
    }
    success(props) {
        return {status: this.HttpCodes.success, ...props};
    }

    atCurWeek (day, today = dayjs()) {
        if(today.day() == 0)
            today = today.day(-7)
        return today.day(day);
    }
    
    atNextWeek (day, today = dayjs()) {
        if(today.day() == 0)
            today = today.day(-7);
        return today.day(7+day);
    }
    atPrevWeek (day, today = dayjs()) {
        if(today.day() == 0)
            today = today.day(-7);
        return today.day(day-7);
    }
    nextDay (day, today = dayjs()) {
        var dayToday = today.day() == 0 ? 7 : today.day();
        if(dayToday >= Math.abs(day))
            return atNextWeek(day, today)
        return atCurWeek(day, today)
    }
    closestDay (day, today = dayjs()) {
        var dayToday = today.day() == 0 ? 7 : today.day();
        if(dayToday > Math.abs(day))
            return atNextWeek(day, today)
        return atCurWeek(day, today)
    }
}

module.exports = {dayjs, utils: new utils()};