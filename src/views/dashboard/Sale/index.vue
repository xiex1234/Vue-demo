<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix">
      <!-- 左 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 右 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMouth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="date"
          class="data"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="charts" ref="charts"></div>
      </el-col>
      <el-col :span="6" class="right">
        <h3>门店{{ title }}排名</h3>
        <ul>
          <li>
            <span class="index">1</span>
            <span>麦当劳</span>
            <span class="rvalue">211,335</span>
          </li>
          <li>
            <span class="index">2</span>
            <span>肯德基</span>
            <span class="rvalue">210,597</span>
          </li>
          <li>
            <span class="index">3</span>
            <span>必胜客</span>
            <span class="rvalue">200,998</span>
          </li>
          <li>
            <span class="index">4</span>
            <span>海底捞</span>
            <span class="rvalue">199,220</span>
          </li>
          <li>
            <span class="span-right">5</span>
            <span class="span-right2">西贝筛面村</span>
            <span class="rvalue">195,444</span>
          </li>
          <li>
            <span class="span-right">6</span>
            <span class="span-right2">汉堡王</span>
            <span class="rvalue">180,161</span>
          </li>
          <li>
            <span class="span-right">7</span>
            <span class="span-right2">真功夫</span>
            <span class="rvalue">172,995</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import {mapState} from "vuex"
export default {
  data() {
    return {
      activeName: "sale",
      mycharts: null,
      // 搜集日历信息
      date: [],
    };
  },
  mounted() {
    // 初始化echarts实例
    this.mycharts = echarts.init(this.$refs.charts);
    // 配置数据
    this.mycharts.setOption({
      title: {
        // text: "销售额趋势",
        // text: `${this.title}趋势`,
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
        },
      ],
    });
  },
  computed: {
    title() {
      // console.log();
      return this.activeName === "sale" ? "销售额" : "访问量";
    },
    ...mapState({listState:(state)=>state.home.list})
  },
  watch: {
    title() {
      // 重新修改图标的配置数据
      this.mycharts.setOption({
        title: {
          text: this.title + "趋势",
        },
        xAxis:{
          data:this.title == '销售额'?this.listState.orderFullYearAxis:this.listState.userFullYearAxis
        },
        series:[
          {
            name:'Direct',
            type:"bar",
            barWidth:"60%",
            data:this.title=="销售额"?this.listState.orderFullYear:this.listState.userFullYear
          }
        ]
      });
    },
    listState(){
       this.mycharts.setOption({
      title: {
        // text: "销售额趋势",
        // text: `${this.title}趋势`,
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.listState.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.listState.orderFullYear,
        },
      ],
    });
    }
  },
  methods: {
    // 本天
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day,day]
    },
    // 本周
    setWeek(){
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start,end]
    },
    // 本月
    setMouth(){
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start,end]
    },
    // 本年
    setYear(){
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start,end]
    },
  },
};
</script>
<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0px 20px;
}
.data {
  width: 300px;
  margin: 0 20px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px 0;
}
.index {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  float: left;
  line-height: 25px;
  background: black;
  display: inline-block;
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
}
.span-right {
  margin-left: 28px !important;
}
.span-right2 {
  margin-left: 28px !important;
}
</style>