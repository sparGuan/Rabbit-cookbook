/**
 * 计算n天后的日期
 * initDate：开始日期，默认为当天日期， 格式：yyyymmdd/yyyy-mm-dd
 * days:天数
 * flag：返回值， 年与日之间的分隔符， 默认为xxxx年xx月xx日格式
 */
export default (initDate: string, days: number, flag: string) => {
    if (!days) {
        return initDate;
    }
    const initDateFormat = initDate.replace(/-/g, '');
    const f = flag.trim();
    let date;
    // 是否设置了起始日期
    if (!initDate.trim()) {
        // 没有设置初始化日期，就默认为当前日期
        date = new Date();
    } else {
        const year = initDateFormat.substring(0, 4);
        const month = initDateFormat.substring(4, 6);
        const day = initDateFormat.substring(6, 8);
        date = new Date(Number(year), Number(month) - 1, Number(day)); // 月份是从0开始的
    }
    date.setDate(date.getDate() + days);
    const yearStr = date.getFullYear();
    const monthStr = ('0' + (date.getMonth() + 1)).slice(-2, 8); // 拼接2位数月份
    const dayStr = ('0' + date.getDate()).slice(-2, 8); // 拼接2位数日期
    let result = '';
    if (!f) {
        result = yearStr + '年' + monthStr + '月' + dayStr + '日';
    } else {
        result = yearStr + f + monthStr + f + dayStr + f;
    }
    return result;
};
