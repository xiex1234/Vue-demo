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
        // 最小值和最大值的设置
        min:0,
        max:100
      },
      yAxis: {
        show: false,
        type: "category",
      },
      // 类型
      series: [
        {
          type: "bar",
          data: [78],
          color:"cyan",
          barWidth:10,
          color:"yellowgreen",
          // 背景颜色
          showBackground:true,

          backgroundStyle:{
            color:"#eee"
          },
          // 文本
          label:{
            show:true,
            formatter:'|',
            position:'right'
          }

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