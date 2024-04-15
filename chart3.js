//chart3.js  散点图

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
        function getLocation(result) {
            // 创建存储设备经纬度的数组
            var locArray = [];

            for (var i = 0; i < result.length; i++) {
                const latitude = result[i].Location.Latitude;
                const longitude = result[i].Location.Longitude;

                locArray.push({ latitude, longitude });
            }

            return locArray;
        }

        // 基于准备好的 DOM，初始化 echarts 实例
        var chart_three = echarts.init(document.getElementById("chart3"));
        var pstArray = getLocation(result);
        var axisData = [];

        for (var i = 0; i < pstArray.length; i++) {
            var latitude = pstArray[i].latitude;
            var longitude = pstArray[i].longitude; // 修改为正确的属性名
            var newdata = [latitude, longitude];
            axisData.push(newdata);
        }

        var option = {
            title: {
                text: '设备经纬度分布图',
                subtext: '',
                left: 'center',
                textStyle: {
                    textAlign: 'center',
                    fontSize: 16
                }
            },
            tooltip: {   //提示框组件
                trigger: 'item',
                formatter: "{a}<br/>{b} : {c} ({d}%)"
            },
            toolbox: {       //配置工具箱组件
                show: true, // 修正拼写错误
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
            xAxis: {
                name: '纬度',
                type: 'value',
                scale: true,
                min: -90,
                max: 90,
                interval: 20
            },
            yAxis: { // 修正属性名
                name: '经度',
                type: 'value',
                scale: true,
                min: -180,
                max: 180,
                interval: 30
            },
            series: [
                {
                    type: 'scatter',   // 表示类型为散点型  
                    data: axisData,
                    symbolSize: 10
                }
            ]
        };

        chart_three.setOption(option);

    })
    .catch(error => console.log('error', error));
