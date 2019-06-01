
import wxF2                     from 'utils/wx-f2.min'

export const F2 = wxF2;

export const getRingChart = (data = []) => {
    let chart = null;
    return {
        init (canvas, width, height) {
            let map = {};
            data.map((obj) => {
                map[obj.name] = obj.percent;
            });
            chart = new F2.Chart({
                el: canvas,
                width,
                height,
                padding: [0, 100, 0, 0]
            });
            chart.source(data, {
                percent: {
                    formatter: (val) => {
                        return val + '%';
                    }
                }
            });
            chart.tooltip(false);
            chart.legend({
                position: 'right',
                itemFormatter: (val) => {
                    return val + '    ' + map[val];
                }
            });
            chart.coord('polar', {
                transposed: true,
                innerRadius: 0.7,
                radius: 0.85
            });
            chart.axis(false);
            chart
                .interval()
                .position('a*percent')
                .color('name', [
                    '#158be1',
                    '#6dcff6',
                    '#bff0ab',
                    '#98ead0',
                    '#54d6d1',
                ])
                .adjust('stack');
            chart.render();
            return chart;
        },
        update (data) {
            let map = {};
            data.map((obj) => {
                map[obj.name] = obj.percent;
            });
            chart.legend({
                position: 'right',
                itemFormatter: (val) => {
                    return val + '    ' + map[val];
                }
            });
            chart.changeData(data);
        }
    }
};

export const getBarChart = (data = []) => {
    let chart = null;
    return {
        init (canvas, width, height) {
            chart = new F2.Chart({
                el: canvas,
                width,
                height,
                padding: [20, 50, 0, 50]
            });
            let Global = F2.Global;
            chart.source(data, {
                'Num': {
                    tickCount: 5
                }
            });
            chart.coord({
                transposed: true
            });
            chart.axis('State', {
                line: Global._defaultAxis.line,
                grid: null
            });
            chart.axis('Num', {
                line: null,
                grid: Global._defaultAxis.grid,
                label: function label(text, index, total) {
                    var textCfg = {
                        text: text / 1000 + ' k'
                    };
                    if (index === 0) {
                        textCfg.textAlign = 'left';
                    } else if (index === total - 1) {
                        textCfg.textAlign = 'right';
                    }
                    return textCfg;
                }
            });
            chart.legend(false);
            // barChart
            //     .interval()
            //     .position('country*population')
            //     .color('country', [
            //         '#158be1',
            //         '#6dcff6',
            //         '#bff0ab',
            //         '#98ead0',
            //         '#54d6d1',
            //     ]).adjust('stack');
            chart.interval().position('State*Num').color('Label');
            chart.render();
            return chart;
        },
        update (data) {
            chart.changeData(data);
        }
    }
};

export const getLineChart = (data = [], ticks = []) => {
    let chart = null;
    return {
        init (canvas, width, height) {
            chart = new F2.Chart({
                el: canvas,
                width,
                height,
                padding: ['auto', 50],
            });
            chart.source(data, {
                year: {
                    tickCount: 6,
                    range: [0, 1],
                    ticks,
                },
                // value: {
                //     tickCount: 10,
                //     formatter(val) {
                //         return val;
                //     }
                // }
            });
            chart.tooltip({
                custom: true, // 自定义 tooltip 内容框
                showXTip: true,
                onChange(obj) {
                    const legend = chart.get('legendController').legends.top[0];
                    const tooltipItems = obj.items;
                    const legendItems = legend.items;
                    const map = {};
                    legendItems.map(item => {
                        map[item.name] = Object.assign({}, item);
                    });
                    tooltipItems.map(item => {
                        const { name, value } = item;
                        if (map[name]) {
                            map[name].value = value;
                        }
                    });
                    legend.setItems(Object.values(map));
                },
                onHide() {
                    const legend = chart.get('legendController').legends.top[0];
                    legend.setItems(chart.getLegendItems().country);
                }
            });
            chart.line().position('year*value').color('type');
            chart.point().position('year*value').color('type');
            chart.render();
            return chart;
        },
        update (data) {
            chart.changeData(data);
        }
    }
};
