<template>
  <div class="charts" ref="charts"></div>
</template>
<script>
// import echarts from 'echarts'
import * as echarts from "echarts";
export default {
  name: "",
  mounted() {
    // console.log(echarts);
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        show: false,
        type:"category"
      },
      yAxis: {
        show: false,
      },
      // 类型
      series: [
        {
          type: "line",
          smooth:true,
          data: [0, 10, 33, 12, 22, 8,10,50,20,90],
          // 拐点的样式的设置
          itemStyle: {
            opacity: 0,
          },
          // 线条的样式
          lineStyle: {
            color: "purple",
          },
          // 填充颜色设置
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "red", //0%处的颜色
                },
                {
                  offset:1,
                  color:"purple" //100%处的颜色
                }
              ],
              global:false //缺省为false
            },
          },
        },
      ],

      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>
<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>