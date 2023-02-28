<!-- 商家分布图表 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import mapdata from "../../public/static/map/china.json"
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      mapData: {}, // 所获取的省份的地图矢量数据
    };
  },
  mounted() {
    this.initChart();
    // this.getData();
  },
  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, "chalk");
      var outname = [
        "南海诸岛",
        "北京",
        "天津",
        "上海",
        "重庆",
        "河北",
        "河南",
        "云南",
        "辽宁",
        "黑龙江",
        "湖南",
        "安徽",
        "山东",
        "新疆",
        "江苏",
        "浙江",
        "江西",
        "湖北",
        "广西",
        "甘肃",
        "山西",
        "内蒙古",
        "陕西",
        "吉林",
        "福建",
        "贵州",
        "广东",
        "青海",
        "西藏",
        "四川",
        "宁夏",
        "海南",
        "台湾",
        "香港",
        "澳门",
      ];
      var outvalue = [
        0, 58294, 7296, 95570, 4970, 28313, 21483, 5367, 14381, 4238, 14590,
        14359, 45086, 1622, 88404, 215367, 9159, 14987, 4535, 646, 3140, 1530,
        5597, 2781, 54452, 1075, 294308, 201, 290, 16557, 167, 832, 204, 1756,
        41,
      ];
      var outvalue2 = [
        0, 137710, 13844, 261397, 9748, 32093, 28588, 8068, 21129, 5099, 22230,
        18161, 60265, 2763, 133036, 218412, 13615, 20328, 7697, 662, 3996, 2580,
        8881, 3403, 95136, 2622, 427758, 352, 575, 28102, 160, 1702, 2464, 9860,
        271,
      ];
      var total = [
        0, 196004, 21140, 356967, 14718, 60406, 50071, 13435, 35510, 9337,
        36820, 32520, 105351, 4385, 221440, 433779, 22774, 35315, 12232, 1308,
        7136, 4110, 14478, 6184, 149588, 3697, 722066, 553, 865, 44659, 327,
        2534, 2668, 11616, 312,
      ];
      var outdata = [];
      for (var i = 0; i < outname.length; i++) {
        outdata.push({
          name: outname[i],
          value: total[i],
        });
      }
      // console.log(outdata);
      // const ret = await axios.get(
      //   "http://localhost:8999/static/map/china.json"
      // );
      var m=mapdata;
      this.$echarts.registerMap("china", m)
      const initOption = {
        title: {
          text: "▎ 异常商品商家省份分布",
          left: 20,
          top: 20,
          textStyle: {
            fontSize: 20,
          },
        },
        tooltip: {},
        visualMap: {
          type: "piecewise", // 定义为分段型 visualMap
          min: 0,
          max: 1000,
          itemWidth: 40,
          bottom: 20,
          left: 20,
          pieces: [
            // 自定义每一段的范围，以及每一段的文字
            { gte: 100000, label: "100000以上", color: "#035cf5" }, // 不指定 max，表示 max 为无限大（Infinity）。
            { gte: 50000, lte: 99999, label: "50000-99999", color: "#3375e4" },
            { gte: 10000, lte: 49999, label: "10000-49999", color: "#6797ef" },
            { gte: 1000, lte: 9999, label: "1000-9999", color: "#96b5ef" },
            { gte: 100, lte: 999, label: "100-999", color: "#bacae8" },
            { lte: 99, label: "1-99", color: "#d1d4da" }, // 不指定 min，表示 min 为无限大（-Infinity）。
          ],
          textStyle: {
            color: "#2d62be",
          },
        },
        geo: {
          map: "china",
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#000",
              },
            },
          },
          itemStyle: {
            normal: {
              borderColor: "#215495",
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(10,76,139,1)",
            },
          },
        },
        series: [
          {
            name: "异常商品量",
            type: "map",
            roam: true,
            coordinateSystem: "geo",
            geoIndex: 0,
            // tooltip: {show: false},
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "#F06C00",
              },
            },
            data: outdata,
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    // async getData() {
    //   // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
    //   const { data: ret } = await this.$http.get("map");
    //   this.allData = ret;
    //   console.log(this.allData);
    // },
  },
};
</script>

<style lang='less' scoped>
</style>
