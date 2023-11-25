<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥ 126560">
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;56.67%<svg
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
              </span>
              <span
                >日同比&nbsp;&nbsp; 19.96%<svg
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
              ></span>
            </template>
            <template slot="footer"> 日销售额￥ 12423 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <lineCharts></lineCharts>
            </template>
            <template slot="footer"> 日访问量 1242 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts"> <barCharts></barCharts> </template>
            <template slot="footer"> 转化率65% </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
                <progressCharts></progressCharts>
            </template>
            <template slot="footer"
              ><span
                >周同比&nbsp;&nbsp;12%<svg
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
              </span>
              <span
                >日同比&nbsp;&nbsp; 11%<svg
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
              ></span> </template
          ></Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Detail from "./Detail/index.vue";
import lineCharts from "./lineChart";
import barCharts from "./barCharts";
import progressCharts from "./progressCharts"
export default {
  name: "Card",
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts
  },
};
</script>
<style lang="">
</style>