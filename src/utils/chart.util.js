
import wxF2                     from 'utils/F2.util'

export const F2 = wxF2;

export const getLineChart = (data = [], ticks = []) => {
    let chart = null;
    function render (chart, data, ticks) {
        console.log('ticks1',ticks)
        chart.source(data, {
            year: {
                // type: 'timeCat',
                // type: 'cat',
                // mask: 'MM/DD',
                // tickCount: 2,
                range: [0, 1],
                ticks,
                formatter (val) {
                    val = val + '';
                    return `${val.substring(1,3)}-${val.substring(3,5)}`
                }
            },
            value: {
                tickCount: 5,
                min: 0,
                max: 20,
                formatter(val) {
                    return val;
                }
            }
        });
        // chart.area().position('year*value').color('type').shape('smooth');
        chart.line().position('year*value').color('type', function () {
            return '#dedede'
        }).shape('smooth');
        chart.point().position('year*value').color('value', function (val) {
            if (val > 10)
                return '#F95727';
            if (val < 4.4)
                return '#a2aabe';
            return '#2fb2e7';
        });
        chart.render();
    }
    return {
        init (canvas, width, height) {
            // if (chart) return chart;
            console.log('init')
            chart = new F2.Chart({
                el: canvas,
                width,
                height,
                padding: ['auto', 30],
            });
            render(chart, data, ticks);
            return chart;
        },
        update (data, ticks) {
            console.log('update')
            if (chart) {
                chart.clear();
                render(chart, data, ticks); // 加载新数据
                // chart.changeData(data);
            }
        }
    }
};

export const getWeekLineChart = (data = [], ticks = []) => {
    let chart = null;
    function render (chart, data, ticks) {
        console.log('ticks',ticks)
        chart.source(data, {
            year: {
                // type: 'timeCat',
                // type: 'cat',
                // mask: 'MM/DD',
                // tickCount: 2,
                range: [0, 1],
                ticks,
                formatter (val) {
                    val = val + '';
                    return `${val.substring(1,3)}-${val.substring(3,5)}`
                }
            },
            value: {
                tickCount: 5,
                min: 0,
                max: 20,
                formatter(val) {
                    return val;
                }
            }
        });
        // chart.area().position('year*value').color('type').shape('smooth');
        chart.line().position('year*value').color('type', function () {
            return '#dedede'
        }).shape('smooth');
        chart.point().position('year*value').color('value', function (val) {
            if (val > 10)
                return '#F95727';
            if (val < 4.4)
                return '#a2aabe';
            return '#2fb2e7';
        });
        chart.render();
    }
    return {
        init (canvas, width, height) {
            chart = new F2.Chart({
                el: canvas,
                width,
                height,
                padding: ['auto', 40],
            });
            render(chart, data, ticks);
            return chart;
        },
        update (data, ticks) {
            if (chart) {
                chart.clear();
                render(chart, data, ticks); // 加载新数据
                // chart.changeData(data);
            }
        }
    }
};
