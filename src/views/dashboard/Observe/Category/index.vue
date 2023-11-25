<template>
  <el-card>
    <div slot="header" class="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div>
      <div class="charts" ref="charts"></div>
    </div>

    <!-- card body -->
  </el-card>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      value: "全部渠道",
    };
  },
  mounted() {
    // 饼图
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      tooltip: {
        trigger: "item",
      },
      title: {
        text: "视频",
        subtext: 1048,
        left: "center",
        top: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            // position: "outsize",
            position: "outside",
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: 40,
          //     fontWeight: "bold",
          //   },
          // },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "视频" },
            { value: 735, name: "游戏" },
            { value: 580, name: "电子邮箱" },
            { value: 484, name: "书籍" },
            { value: 300, name: "零食" },
          ],
        },
      ],
    });
    mychart.on("mouseover", function (params) {
      const { name, value } = params.data;
      // 重新设置标题
      mychart.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
      // console.log(params);
    });
  },
};
</script>
<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  border-bottom: 1px solid #eee;
  padding: 0 0 10px 0;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>