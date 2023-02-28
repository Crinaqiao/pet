<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>宠物咨询</el-breadcrumb-item>
      <el-breadcrumb-item>宠物数据</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 第一模块 -->
      <div class="content1">
        <!-- 中国地图 -->
        <div id="data3"></div>
        <!-- 养宠物省份排名情况 -->
        <div id="data2"></div>
      </div>
      <!-- 第二模块 -->
      <div class="content2">
        <div id="data1"></div>
        <div id="data4"></div>
      </div>

    </el-card>
  </div>
</template>

<script src="">
import * as echarts from 'echarts'
// import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)

export default {
  data() {
    return {
    };
  },
  mounted() {
    // 猫咪受欢迎榜
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('data1'))
    // 指定图表的配置项和数据
    var option1 = {
      title: {
        text: '猫咪受欢迎排行榜'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: ['狸花猫', '英短', '布偶猫', '金吉拉', '曼基康矮脚猫', '波斯猫', '美短', '孟买猫', '挪威森林猫', '加拿大无毛猫']
      },
      series: [
        {
          name: '',
          type: 'bar',
          // width: '10',
          data: [409, 438, 506, 694, 729, 955, 959, 1954, 2107, 3002],
        },
      ]
    };    //展示数据
    myChart1.setOption(option1)
    //全国宠物排行
    var myChart2 = echarts.init(document.getElementById('data2'))
    var option2 = {
      title: {
        text: '2021年中国城镇养宠物类型占比',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '国内宠物类型占百分比',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 59.5, name: '猫咪' },
            { value: 51.7, name: '狗狗' },
            { value: 8.3, name: '水族' },
            { value: 5.8, name: '爬行类' },
            { value: 3.6, name: '鸟类' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart2.setOption(option2)
    //中国地图
    var myChart3 = echarts.init(document.getElementById('data3'))
    var data = [
      {
        name: "北京市",
        value: 5.3,
      },
      {
        name: "上海",
        value: 4.8,
      },
      {
        name: "广东",
        value: 4.5,
      },
      {
        name: "重庆",
        value: 3.6,
      },
      {
        name: "香港",
        value: 3.5,
      },
      {
        name: "湖南",
        value: 3.4,
      },
      {
        name: "江苏省",
        value: 2.4,
      },
      {
        name: "河北",
        value: 1.4,
      },
      {
        name: "河南",
        value: 3.2,
      },
      {
        name: "云南",
        value: 1.6,
      },
      {
        name: "辽宁",
        value: 4.3,
      },
      {
        name: "黑龙江",
        value: 4.1,
      },

      {
        name: "安徽",
        value: 3.3,
      },
      {
        name: "山东",
        value: 3.0,
      },
      {
        name: "新疆",
        value: 1,
      },
      {
        name: "江苏",
        value: 3.9,
      },
      {
        name: "浙江",
        value: 3.5,
      },
      {
        name: "江西",
        value: 2.0,
      },
      {
        name: "湖北",
        value: 2.1,
      },
      {
        name: "广西",
        value: 3.0,
      },
      {
        name: "甘肃",
        value: 1.2,
      },
      {
        name: "山西",
        value: 3.2,
      },
      {
        name: "内蒙古",
        value: 3.5,
      },
      {
        name: "陕西",
        value: 2.5,
      },
      {
        name: "吉林",
        value: 4.5,
      },
      {
        name: "福建",
        value: 1.8,
      },
      {
        name: "贵州",
        value: 0.8,
      },
      {
        name: "青海",
        value: 0.6,
      },
      {
        name: "西藏",
        value: 0.4,
      },
      {
        name: "四川",
        value: 3.3,
      },
      {
        name: "宁夏",
        value: 0.8,
      },
      {
        name: "海南",
        value: 0.9,
      },
      {
        name: "台湾",
        value: 0.1,
      },
      {
        name: "澳门",
        value: 1.1,
      },
    ];
    var yData = [];
    var barData = [];
    for (var i = 0; i < 5; i++) {
      barData.push(data[i]);
      yData.push(i + data[i].name);
    }
    var option3 = {
      title: [
        {
          show: true,
          text: "养宠物省份排名情况",
          textStyle: {
            color: "#2D3E53",
            fontSize: 18,
          },
          left: 'center',
          top: 10,
        },
      ],
      tooltip: {
        show: true,
        formatter: function (params) {
          return params.name + "：" + params.data["value"] + "%";
        },
      },
      visualMap: {
        type: "continuous",
        orient: "horizontal",
        itemWidth: 10,
        itemHeight: 80,
        text: ["高", "低"],
        showLabel: true,
        seriesIndex: [0],
        min: 0,
        max: 2,
        inRange: {
          color: ["#6FCF6A", "#FFFD64", "#FF5000"],
        },
        textStyle: {
          color: "#7B93A7",
        },
        bottom: 30,
        left: "left",
      },
      grid: {
        right: 10,
        top: 135,
        bottom: 100,
        width: "20%",
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        type: "category",
        inverse: true,
        nameGap: 16,
        axisLine: {
          show: false,
          lineStyle: {
            color: "#ddd",
          },
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: "#ddd",
          },
        },
        axisLabel: {
          interval: 0,
          margin: 85,
          textStyle: {
            color: "#455A74",
            align: "left",
            fontSize: 14,
          },
          rich: {
            a: {
              color: "#fff",
              backgroundColor: "#FAAA39",
              width: 20,
              height: 20,
              align: "center",
              borderRadius: 2,
            },
            b: {
              color: "#fff",
              backgroundColor: "#4197FD",
              width: 20,
              height: 20,
              align: "center",
              borderRadius: 2,
            },
          },
          formatter: function (params) {
            if (parseInt(params.slice(0, 1)) < 3) {
              return [
                "{a|" +
                (parseInt(params.slice(0, 1)) + 1) +
                "}" +
                "  " +
                params.slice(1),
              ].join("\n");
            } else {
              return [
                "{b|" +
                (parseInt(params.slice(0, 1)) + 1) +
                "}" +
                "  " +
                params.slice(1),
              ].join("\n");
            }
          },
        },
        data: yData,
      },
      geo: {
        // roam: true,
        map: "china",
        left: "left",
        right: "300",
        // layoutSize: '80%',
        label: {
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          emphasis: {
            areaColor: "#fff464",
          },
        },
      },
      series: [
        {
          name: "mapSer",
          type: "map",
          roam: false,
          geoIndex: 0,
          label: {
            show: false,
          },
          data: data,
        },
        {
          name: "barSer",
          type: "bar",
          roam: false,
          visualMap: false,
          zlevel: 2,
          barMaxWidth: 8,
          barGap: 0,
          itemStyle: {
            normal: {
              color: function (params) {
                // build a color map as your need.
                var colorList = [
                  {
                    colorStops: [
                      {
                        offset: 0,
                        color: "#FFD119", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#FFAC4C", // 100% 处的颜色
                      },
                    ],
                  },
                  {
                    colorStops: [
                      {
                        offset: 0,
                        color: "#00C0FA", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#2F95FA", // 100% 处的颜色
                      },
                    ],
                  },
                ];
                if (params.dataIndex < 3) {
                  return colorList[0];
                } else {
                  return colorList[1];
                }
              },
              barBorderRadius: 15,
            },
          },
          data: barData,
        },
      ],
    };
    myChart3.setOption(option3)
    //狗狗排行
    var myChart4 = echarts.init(document.getElementById('data4'))
    var myColor = [
      "#eb2100",
      "#eb3600",
      "#d0570e",
      "#d0a00e",
      "#34da62",
      "#00e9db",
      "#00c0e9",
      "#0096f3",
      "#33CCFF",
      "#33FFCC",
    ];
    var option4 = {
      title: {
        text: '狗狗受欢迎排行榜'
      },

      grid: {
        left: "11%",
        top: "12%",
        right: "0%",
        bottom: "8%",
        containLabel: true,
      },
      xAxis: [
        {
          show: false,
        },
      ],
      yAxis: [
        {
          axisTick: "none",
          axisLine: "none",
          offset: "27",
          axisLabel: {
            textStyle: {
              color: "#000",
              fontSize: "16",
            },
          },
          data: [
            "泰迪",
            "比熊犬",
            "博美犬",
            "边牧",
            "金毛",
            "柯基",
            "拉布拉多",
            "法斗",
            "哈士奇",
            "萨摩耶犬",
          ],
        },
        {
          axisTick: "none",
          axisLine: "none",
          axisLabel: {
            textStyle: {
              color: "#000",
              fontSize: "16",
            },
          },
          data: ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
        },
        {
          name: "",
          nameGap: "50",
          // top:'50',
          nameTextStyle: {
            color: "#000",
            fontSize: "16",
          },
          axisLine: {
            lineStyle: {
              color: "rgba(0,0,0,0)",
            },
          },
          data: [],
        },
      ],
      series: [
        {
          name: "条",
          type: "bar",
          yAxisIndex: 0,
          data: [409, 438, 506, 694, 729, 955, 959, 1954, 2107, 3002],
          label: {
            normal: {
              show: true,
              position: "right",
              textStyle: {
                color: "#000",
                fontSize: "15",
              },
            },
          },
          barWidth: 12,
          itemStyle: {
            normal: {
              color: function (params) {
                var num = myColor.length;
                return myColor[params.dataIndex % num];
              },
            },
          },
          z: 2,
        },
        {
          name: "白框",
          type: "bar",
          yAxisIndex: 1,
          barGap: "-100%",
          data: [99, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
          barWidth: 20,
          itemStyle: {
            normal: {
              color: "#0e2147",
              barBorderRadius: 5,
            },
          },
          z: 1,
        },
        {
          name: "外框",
          type: "bar",
          yAxisIndex: 2,
          barGap: "-100%",
          data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          barWidth: 24,
          itemStyle: {
            normal: {
              color: function (params) {
                var num = myColor.length;
                return myColor[params.dataIndex % num];
              },
              barBorderRadius: 5,
            },
          },
          z: 0,
        },
        {
          name: "外圆",
          type: "scatter",
          hoverAnimation: false,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          yAxisIndex: 2,
          symbolSize: 28,
          itemStyle: {
            normal: {
              color: function (params) {
                var num = myColor.length;
                return myColor[params.dataIndex % num];
              },
              opacity: 1,
            },
          },
          z: 2,
        },
      ],
    };
    myChart4.setOption(option4)

  },
  //狗狗排行
}
</script>
<style lang="less" scoped>
.content1,
.content2 {
  display: flex;
}

#data1 {
  // float: right;
  width: 40%;
  height: 560px;
  margin-right: 20%;
}

#data2 {
  // float: left;
  width: 40%;
  height: 500px;
}

#data3 {
  flex: 1;
  width: 40%;
  height: 580px;
  margin-right: 50px;

}

#data4 {
  flex: 1;
  width: 40%;
  height: 580px;
}
</style>
