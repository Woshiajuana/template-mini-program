
export default {

    formatData (fmt = 'yyyy-MM-dd hh:mm:ss', date = new Date()) {
        let o = {
            "M+" : date.getMonth()+1,
            "d+" : date.getDate(),
            "h+" : date.getHours(),
            "m+" : date.getMinutes(),
            "s+" : date.getSeconds(),
            "q+" : Math.floor((date.getMonth()+3)/3),
            "S"  : date.getMilliseconds()
        };
        if(/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    },

    getDate (count = 0, fmt = 'yyyy-MM-dd hh:mm:ss', cur = new Date()) {
        cur.setDate(cur.getDate() + count);
        return this.formatData(fmt, cur);
    },

    getDayTime (time = new Date()) {
        let cur = this.formatData('yyyy-MM-dd', time);
        let start = cur + ' 00:00:00';
        let end = cur + ' 23:59:59';
        return {
            start,
            end,
        }
    },

    getWeekTime (time = new Date()) {
        let day = time.getDay();
        let result = {};
        switch (day) {
            case 0:
                result = {
                    start: this.getDate(-6, 'yyyy-MM-dd', time),
                    end: this.getDate(0, 'yyyy-MM-dd', time),
                };
                break;
            case 1:
                result = {
                    start: this.getDate(0, 'yyyy-MM-dd', time),
                    end: this.getDate(6, 'yyyy-MM-dd', time),
                };
                break;
            case 2:
                result = {
                    start: this.getDate(-1, 'yyyy-MM-dd', time),
                    end: this.getDate(5, 'yyyy-MM-dd', time),
                };
                break;
            case 3:
                result = {
                    start: this.getDate(-2, 'yyyy-MM-dd', time),
                    end: this.getDate(4, 'yyyy-MM-dd', time),
                };
                break;
            case 4:
                result = {
                    start: this.getDate(-3, 'yyyy-MM-dd', time),
                    end: this.getDate(3, 'yyyy-MM-dd', time),
                };
                break;
            case 5:
                result = {
                    start: this.getDate(-4, 'yyyy-MM-dd', time),
                    end: this.getDate(2, 'yyyy-MM-dd', time),
                };
                break;
            case 6:
                result = {
                    start: this.getDate(-5, 'yyyy-MM-dd', time),
                    end: this.getDate(1, 'yyyy-MM-dd', time),
                };
                break;
        }
        return {
            start: result.start + ' 00:00:00',
            end: result.end + ' 23:59:59',
        };
    },

    getMonthTime (time = new Date()) {
        let y = time.getFullYear();
        let m = time.getMonth();
        let start = this.formatData('yyyy-MM-dd', new Date(y, m, 1)) + ' 00:00:00';
        let end = this.formatData('yyyy-MM-dd', new Date(y, m + 1, 0)) + ' 23:59:59';
        return {
            start,
            end,
        }
    },

    getSixMonth () {
        let time = new Date();
        let y = time.getFullYear();
        let m = time.getMonth();
        let BeginDate = this.formatData('yyyy-MM-dd', new Date(y, m - 5, 1));
        let EndDate = this.formatData('yyyy-MM-dd', new Date(y, m + 1, 0));
        let sixArr = [];
        for (let i = 5; i >= 0; i --) {
            sixArr.push(this.formatData('yyyy-MM', new Date(y, m - i, 1)))
        }
        return {
            sixArr,
            BeginDate,
            EndDate,
        }
    },

    formatTime (time) {
        time = time.replace(/[^0-9]/ig, '');
        return this.formatData('yyyy-MM-dd', new Date(+time))
    },
}
