//chart4.js 环状图

// var myHeaders = new Headers();
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("http://halfmaple.vip:8001/device", requestOptions)
    .then(response => response.json())
    .then(result => {
        result = result.data;
        let device1 = 0;
        let device2 = 0;
        let device3 = 0;
        let device4 = 0;
        let device5 = 0;
        for (var i = 0; i < result.length; i++) {
            var Name = result[i].ModelData;
            if (Name.includes("制造设备")) {
                device1++;
            }
            else if (Name.includes("装配设备")) {
                device2++;
            }
            else if (Name.includes("输送设备")) {
                device3++;
            }
            else if (Name.includes("电力设备")) {
                device4++;
            }
            else if (Name.includes("起重设备")) {
                device5++;
            }
        }
        var sum = device1 + device2 + device3 + device4 + device5;
        console.log(device1);
        console.log(device2);
        console.log(device3);
        console.log(device4);
        console.log(device5);
        var chart_four = echarts.init(document.getElementById("chart4"));

        var i = 0;
        var colors = ['#AB82FF', '#FFBBFF', '#D2B48C', '#48D1CC', '#B3EE3A'];
        var option = {
            title: {
                text: '设备类型统计表',
                subtext: '',
                left: 'center',
                textStyle: {
                    textAlign: 'center',
                    fontSize: 18
                }
            },
            graphic:
                [{
                    type: 'text',
                    left: 'center',
                    top: '52%',
                    style: {
                        text: sum,
                        fill: '#000',
                        width: 30,
                        height: 30,
                        fontSize: 26,
                    }
                },
                {
                    type: 'text',
                    left: 'center',
                    top: '62%',
                    style: {
                        text: '设备',
                        fill: '#363636',
                        width: 30,
                        height: 30,
                        fontSize: 22,
                    }
                }
                ],
            legend: {
                top: 35,
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 10
            },
            calculable: true,
            toolbox: {
                show: true,
                orient: 'vertical',
                x: 'right',
                y: 'center',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            tooltip:
            {
                tigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [
                {
                    type: 'pie',
                    center: ['50%', '60%'],
                    radius: ['38%', '60%'],
                    avoidLabelOverlap: true,
                    label: {
                        position: "outside",
                        formatter: "{b}\n{d} %",
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: "12",
                            fontWeight: "bold",
                        },
                    },
                    labelLine: {
                        show: true,
                    },
                    itemStyle: {
                        normal: {
                            color: function () {
                                return colors[i++]
                            },
                            // 白色间距
                            borderWidth: 5,
                            borderColor: '#ffffff',
                        }
                    },

                    data: [
                        { value: device1, name: '制造设备' },
                        { value: device2, name: '装配设备' },
                        { value: device3, name: '输送设备' },
                        { value: device4, name: '电力设备' },
                        { value: device5, name: '起重设备' },
                    ]
                }
            ]
        }
        chart_four.setOption(option);
    })
    .catch(error => console.log('error', error));