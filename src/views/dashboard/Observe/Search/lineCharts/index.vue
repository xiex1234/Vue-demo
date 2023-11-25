<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg t="1673930575579" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2684" width="16" height="16"><path d="M512 65.984C266.048 65.984 65.984 266.048 65.984 512S266.048 958.016 512 958.016 958.016 757.952 958.016 512 757.952 65.984 512 65.984zM544 736c0 17.696-14.304 32-32 32s-32-14.304-32-32l0-288c0-17.696 14.304-32 32-32s32 14.304 32 32L544 736zM512 352c-26.496 0-48-21.536-48-48C464 277.472 485.504 256 512 256s48 21.472 48 48C560 330.464 538.496 352 512 352z" p-id="2685" fill="#cdcdcd"></path></svg>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">12321</span>
      <span class="main-content">17.1</span>
      <svg
                  t="1674039748975"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="12758"
                  width="16"
                  height="16"
                >
                  <path
                    d="M242.176 442.368L460.8 221.184v703.488a51.2 51.2 0 0 0 102.4 0V221.184l218.624 220.672a51.2 51.2 0 0 0 72.192 0 46.592 46.592 0 0 0 0-68.096l-307.2-310.272a55.296 55.296 0 0 0-74.752 0l-307.2 310.272a46.592 46.592 0 0 0 0 68.096 51.2 51.2 0 0 0 77.312 0.512z"
                    fill="#1afa29"
                    p-id="12759"
                  ></path>
                </svg>
      <svg
        t="1674039870318"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="15303"
                  width="16"
                  height="16"
                >
                  <path
                    d="M462 881V81c0-27.6 22.4-50 50-50s50 22.4 50 50v800c0 27.6-22.4 50-50 50s-50-22.4-50-50z"
                    p-id="15304"
                    fill="#d81e06"
                  ></path>
                  <path
                    d="M483.3 907.6l212.1-212.1c19.5-19.5 51.2-19.5 70.7 0s19.5 51.2 0 70.7L554 978.4c-19.5 19.5-51.2 19.5-70.7 0-19.6-19.6-19.6-51.2 0-70.8z"
                    p-id="15305"
                    fill="#d81e06"
                  ></path>
                  <path
                    d="M328.6 695.5l212.1 212.1c19.5 19.5 19.5 51.2 0 70.7s-51.2 19.5-70.7 0L257.9 766.2c-19.5-19.5-19.5-51.2 0-70.7s51.2-19.5 70.7 0z"
                    p-id="15306"
                    fill="#d81e06"
                  ></path></svg
              >
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
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
            color: "skyblue",
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
                  color: "skyblue", //0%处的颜色
                },
                {
                  offset:1,
                  color:"#fff" //100%处的颜色
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
.header {
  display: flex;
  align-items: center;
}
.search-header {
  margin-right: 20px;
}
.main{
margin-top: 10px 0;
}
.main-title{
  margin-right: 30px;
}
.main-content{
  margin-right: 30px;
}
.charts{
  width: 100%;
  height: 50px;
}
</style>