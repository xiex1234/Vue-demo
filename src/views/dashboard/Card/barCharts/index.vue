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
          type: "bar",
          data: [10, 10, 40, 60, 22, 8,10,50,20,90],
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