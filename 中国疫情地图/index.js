(async function () {
    const echarts = require('echarts');
    const myChart = echarts.init(document.getElementById('main'));
    let mapData;
    echarts.registerMap('china', await get('./assets/js/map/json/china.json'));

    get('./data/data.json').then(data => {
        mapData = data;
        setChartsOption(myChart, {
            series: {
                data: data.map(item => ({
                    name: item.provinceShortName,
                    value: [
                        item.currentConfirmedCount, // 当日确诊人数
                        item.confirmedCount, // 确诊累计人数
                        item.suspectedCount, // 疑似累计人数
                        item.curedCount, // 治愈累计人数
                        item.deadCount, // 死亡累计人数
                    ],
                })),
            },
        });

        myChart.on('click', async ({ name }) => {
            if (name.includes('市')) return;

            await registerProvinceMap(echarts, name);
            setChartsOption(myChart, {
                title: {
                    text: `${name}疫情地图`,
                },
                series: {
                    map: name,
                    data: data.find(item => item.provinceShortName === name).cities.map(item => ({
                        name: item.cityName + '市',
                        value: [
                            item.currentConfirmedCount, // 当日确诊人数
                            item.confirmedCount, // 确诊累计人数
                            item.suspectedCount, // 疑似累计人数
                            item.curedCount, // 治愈累计人数
                            item.deadCount, // 死亡累计人数
                        ],
                    })),
                },
            });
        });
    });

    function get(url) {
        return fetch(url).then(res => res.json());
    }

    async function registerProvinceMap(echarts, name) {
        echarts.registerMap(name, await get(`./assets/js/map/json/province/${getProvincePinYin(name || '')}.json`));
    }

    function getProvincePinYin(name) {
        const pinYin = require('./utils/pinyin').getPinYin(name);
        switch (name) {
            case '陕西':
                return 'shanxi1';
            default:
                return pinYin;
        }
    }

    function setChartsOption(echartsInstance, {
        title={},
        series={},
    }) {
        const [{ text = void 0 }, { map = void 0, data = [] }] = [title, series];

        echartsInstance.setOption({
            title: {
                text: text || '中国疫情地图',
                left: 'center',
            },
            tooltip: {
                formatter({
                    data = {},
                    marker = '',
                }) {
                    const { name, value } = data;
                    const getMarker = color => marker.replace(/background-color:(.+);/g,
                        'background-color:' + color + ';');

                    return name ? `${name}<br />
                  ${getMarker('red')}当日确诊人数：${value[0]}<br />
                  ${getMarker('orange')}确诊累计人数：${value[1]}<br />
                  ${getMarker('yellow')}疑似累计人数：${value[2]}<br />
                  ${getMarker('green')}治愈累计人数：${value[3]}<br />
                  ${getMarker('black')}死亡累计人数：${value[4]}` : '该区域地图名称与数据名称不一致';
                }
            },
            series: [{
                type: 'map',
                roam:true,
                scaleLimit: {
                    min: 0.5,
                    max: 5,
                },
                label: {
                    show: true,
                },
                map: map || 'china',
                data,
            }],
            visualMap: {
                dimension: 0,
                itemWidth: 12,
                itemHeight: 13,
                itemGap: 8,
                pieces: [{
                    min: 10001,
                    color: 'red',
                },
                {
                    min: 1001,
                    max: 10000,
                    color: 'orange',
                },
                {
                    min: 101,
                    max: 1000,
                    color: 'yellow',
                },
                {
                    min: 11,
                    max: 100,
                    color: 'green',
                },
                {
                    min: 1,
                    max: 10,
                    color: 'cyan'
                },
                {
                    value: 0,
                    color: 'blue',
                }
                ]
            },
            toolbox: {
                feature: {
                    myTool1: {
                        show: true,
                        title: '显示全中国',
                        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                        onclick: () => {
                            setChartsOption(myChart, {
                                series: {
                                    data: mapData.map(item => ({
                                        name: item.provinceShortName,
                                        value: [
                                            item.currentConfirmedCount, // 当日确诊人数
                                            item.confirmedCount, // 确诊累计人数
                                            item.suspectedCount, // 疑似累计人数
                                            item.curedCount, // 治愈累计人数
                                            item.deadCount, // 死亡累计人数
                                        ],
                                    })),
                                },
                            });
                        }
                    },
                }
            }
        });
    }
})();