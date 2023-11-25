<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="12" :offset="0">
          <Search></Search>
      </el-col>
      <el-col :span="12" :offset="0">

          <category></category>

      </el-col>
    </el-row>
  </div>
</template>
<script>
import Search from "./Search";
import category from "./Category";
export default {
  components: {
    Search,
    category,
  },
};
</script>
<style lang="">
</style>