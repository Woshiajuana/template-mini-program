

const fn = (options = {}) => {

    let curDate = options.curDate || new Date(); // 当前时间
    let year = curDate.getFullYear();
    let day = curDate.getDate();
    let month = curDate.getMonth() ;
    let months = curDate.getMonth() + 1;

    let lastDay = new Date(year, months, 0);
    let preLastDay = new Date(year, month, 0);

    lastDay = lastDay.getDate();
    preLastDay = preLastDay.getDate();

    //第一天星期几
    let firstDay = new Date(year, month, 1);
    firstDay = firstDay.getDay();

    months = months < 10 ? `0${months}` : months;
    day = day < 10 ? `0${day}` : day;

    let arr = [];
    for (let i = 1; i <= lastDay; i++) {
        let d = i < 10 ? `0${i}` : i;
        arr.push({
            text: i,
            value: '',
            date: `${year}-${months}-${d}`,
            disabled: false,
        });
    }
    for (let i = 0; i < firstDay; i++) {
        arr.unshift({
            text: preLastDay - i,
            value: '',
            disabled: true,
        });
    }
    let len = 42 - arr.length;
    for (let i = 0; i < len; i++) {
        arr.push({
            text: i + 1,
            value: '',
            disabled: true,
        });
    }
    let data = splitArray(arr, 7);
    return {
        date: `${year}-${months}-${day}`,
        preDay: firstDay,
        data,
        nextDay: len,
    }
};
export const getPreMonth = (date) => {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
};

export const getNextMonth = (date) => {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
};


fn.getPreMonth = getPreMonth;
fn.getNextMonth = getNextMonth;


export default fn;


function splitArray (arr,len) {
    let arr_length = arr.length;
    let newArr = [];
    for(let i=0;i<arr_length;i+=len){
        newArr.push(arr.slice(i,i+len));
    }
    return newArr;
}
