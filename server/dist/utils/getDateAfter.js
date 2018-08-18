"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 计算n天后的日期
 * initDate：开始日期，默认为当天日期， 格式：yyyymmdd/yyyy-mm-dd
 * days:天数
 * flag：返回值， 年与日之间的分隔符， 默认为xxxx年xx月xx日格式
 */
exports.default = (initDate, days, flag) => {
    if (!days) {
        return initDate;
    }
    initDate = initDate.replace(/-/g, '');
    flag = flag.trim();
    var date;
    // 是否设置了起始日期
    if (!initDate.trim()) {
        // 没有设置初始化日期，就默认为当前日期
        date = new Date();
    }
    else {
        var year = initDate.substring(0, 4);
        var month = initDate.substring(4, 6);
        var day = initDate.substring(6, 8);
        date = new Date(Number(year), Number(month) - 1, Number(day)); // 月份是从0开始的
    }
    date.setDate(date.getDate() + days);
    var yearStr = date.getFullYear();
    var monthStr = ('0' + (date.getMonth() + 1)).slice(-2, 8); // 拼接2位数月份
    var dayStr = ('0' + date.getDate()).slice(-2, 8); // 拼接2位数日期
    var result = '';
    if (!flag) {
        result = yearStr + '年' + monthStr + '月' + dayStr + '日';
    }
    else {
        result = yearStr + flag + monthStr + flag + dayStr + flag;
    }
    return result;
};
//# sourceMappingURL=getDateAfter.js.map