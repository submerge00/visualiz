//chart1.js 饼状图

var myHeaders = new Headers();
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

let enabledCount = 0;
let disabledCount = 0;

fetch("http://halfmaple.vip:8001/device", requestOptions)
    .then(response => response.json())
    .then(result => {
        result = result.data;

        for (var i = 0; i < result.length; i++) {
            var encryptionStatus = result[i].Security.EncryptionStatus;
            if (encryptionStatus === "Enabled") {
                enabledCount++;
                console.log(enabledCount);
            }
            else if (encryptionStatus === "Disabled") {
                disabledCount++;
                console.log(disabledCount);
            }
        }

        // 在获取到数据后设置图表的选项
        var chart_one = echarts.init(document.getElementById("chart1"));
        var option = {
            title: {
                text: '设备在线状态统计',
                subtext: '',
                left: 'center'
            },
            legend: {
                orient: 'vertical',
                left: 32,
                top: 22,
                data: ['Enabled', 'Disabled']
            },
            toolbox: {
                show: true,
                left: 364,
                top: 28,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            clockwise: true,
            tooltip:
            {
                tigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            series: [
                {
                    name: 'Device Status',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    clockwise: true,
                    avoidLabelOverlap: true,
                    label: {
                        position: "outside",
                        formatter: "{b}\n{d} %",
                    },
                    data: [
                        { value: enabledCount, name: 'Enabled' },
                        { value: disabledCount, name: 'Disabled' }
                    ]

                }
            ]
        };
        chart_one.setOption(option);
    })
    .catch(error => console.log('error', error));
