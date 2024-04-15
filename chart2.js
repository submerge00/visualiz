//chart2.js 柱状图

var myHeaders = new Headers();
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

        let kind_one = 0;
        let kind_two = 0;
        let kind_three = 0;
        let kind_four = 0;
        let kind_five = 0;
        for (var i = 0; i < result.length; i++) {
            var Name = result[i].Name;
            if (Name.includes("冲压机")) {
                kind_one++;
            }
            else if (Name.includes("装配线")) {
                kind_two++;
            }
            else if (Name.includes("传送带")) {
                kind_three++;
            }
            else if (Name.includes("变压器")) {
                kind_four++;
            }
            else if (Name.includes("叉车")) {
                kind_five++;
            }
        }

        //基于准备好的DOM，初始化ECharts图表
        var chart_two = echarts.init(document.getElementById("chart2"));
        //指定图表的配置项和数据
        var option = {
            title: {
                text: '设备分布状况',
                subtext: '',
                left: 'center'
            },
            grid: {
                left: '10%',
                top: '25%',
                right: '10%',
                bottom: '10%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {  //设置坐标轴指示器，坐标轴触发有效
                    type: 'shadow'  //设置坐标轴默认为直线，可选为：'line'| 'shadow'
                }
            },
            legend: {
                top: 28,
                left: 'center',
                data: ['冲压机', '装配线', '传送带', '变压器', '叉车']
            },
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
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['冲压机', '装配线', '传送带', '变压器', '叉车']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '冲压机',
                    type: 'bar',
                    data: [kind_one, 0, 0, 0, 0]
                },
                {
                    name: '装配线',
                    type: 'bar',
                    data: [0, kind_two, 0, 0, 0],
                },
                {
                    name: '传送带',
                    type: 'bar',
                    data: [0, 0, kind_three, 0, 0],
                },
                {
                    name: '变压器',
                    type: 'bar',
                    data: [0, 0, 0, kind_four, 0],
                },
                {
                    name: '叉车',
                    type: 'bar',
                    data: [0, 0, 0, 0, kind_five],
                },
            ]
        };

        chart_two.setOption(option);

    })
    .catch(error => console.log('error', error));
