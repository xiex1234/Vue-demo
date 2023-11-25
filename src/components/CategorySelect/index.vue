<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <!-- :disabled="cForm.category1Id ? false : true || show" -->
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          :disabled="show"
          @change="handler2"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <!-- :disabled="cForm.category2Id ? false : true || show" -->
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          :disabled="show"
          @change="handler3"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "CaregorySelect",
  props: ["show"],
  data() {
    return {
      // 一级分类
      list1: [],
      // 二级分类
      list2: [],
      // 三级分类
      list3: [],
      // 搜集相应的一级二级三级分类的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      // 控制选项卡的禁用和启用
      select2: true,
    };
  },
  methods: {
    async getCaregory1List() {
      let data = await this.$API.attr.reqCategory1List();
      if (data.code == 200) {
        this.list1 = data.data;
      }
      // console.log(data);
    },
    // 1级分类的select事件的回调（当一级分类的option发生变化的时候获取相应二级分类的数据）
    async handler1() {
      // 清除数据
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      // console.log(1);
      const { category1Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category1Id, level: 1 });
      let data = await this.$API.attr.reqCategory2List(category1Id);
      if (data.code === 200) {
        this.list2 = data.data;
      }
      // console.log(data);
    },
    // 2级分类的select事件的回调（当二级分类的option发生变化的时候获取相应三级分类的数据）
    async handler2() {
      this.list3 = [];
      this.cForm.category3Id = "";
      // console.log(1);
      const { category2Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category2Id, level: 2 });
      let data = await this.$API.attr.reqCategory3List(category2Id);
      if (data.code === 200) {
        this.list3 = data.data;
      }
      // console.log(data);
    },
    handler3() {
      const { category3Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category3Id, level: 3 });
    },
  },
  mounted() {
    this.getCaregory1List();
  },
  watch: {
    // "cForm.category1Id": {
    //   async handler(newvalue) {
    //     // console.log(newvalue);
    //     if (newvalue) {
    //       const { category1Id } = this.cForm;
    //       let data = await this.$API.attr.reqCategory2List(category1Id);
    //       console.log(data);
    //     }
    //   },
    // },
    // "cForm.category1Id"(newValue, oldValue) {
    //   // console.log(newValue, oldValue);
    // },
  },
};
</script>
<style lang="">
</style>