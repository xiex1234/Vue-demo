<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CaregorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CaregorySelect>
    </el-card>
    <el-card>
      <!-- 底部 -->
      <div v-show="scene == 0">
        <el-button
          :disabled="!category3Id"
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width"
          ></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                size="mini"
                icon="el-icon-plus"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                size="mini"
                title="修改spu"
                icon="el-icon-edit"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                size="mini"
                title="查看当前spu全部sku列表"
                icon="el-icon-info"
                @click="handler(row)"
              ></hint-button>

              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <!-- <el-button slot="reference">删除</el-button> -->
                <hint-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
                <!-- 
                  @click="deleteSpu(row)"
                 -->
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- @size-change="sizeChange"
          @current-change="currentChange" -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          background
          :pager-count="7"
          @current-change="getSpuList"
          @size-change="sizeChange"
        >
        </el-pagination>
      </div>
      <!-- <div v-show="scene == 1">添加SPU|修改SPU</div> -->
      <!-- <div v-show="scene == 2">添加SKU</div> -->
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>

      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>
    </el-card>

    <el-dialog
      v-loading="loading"
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" style="width: 100%" border>
        <el-table-column
          prop="skuName"
          label="名称"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="weight"
          label="重量"
          width="200"
        ></el-table-column>
        <el-table-column label="默认图片" width="319">
          <template slot-scope="{ row, $index }">
            <!-- {{ row }} -->
            <img :src="row.skuDefaultImg" alt="" width="190" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  components: {
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      // 分别是分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 控制三级联动的可操作性
      // show: true,
      page: 1, //分页器当前第几页
      limit: 3, //每一页需要展示几条数据
      records: [], //存储spu列表的数据
      total: 0, //数据总条数
      scene: 0, //0表示展示SPU列表数据   1添加SPU|修改SPU  2添加SKU
      // 控制对话框的显示与隐藏
      dialogTableVisible: false,
      spu: {},
      skuList: [], //存储的是SKU列表的数据
      loading: true,
    };
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      // 区分是几级分类
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    // 获取SPU列表数据的方法
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;

      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
      // console.log(result);
    },
    // // 点击分页器按钮的回调
    // currentChange(page){
    //   console.log(page);
    //   this.page = page
    //   this.getSpuList()
    // }
    // 当分页器的某一个展示数据条数发生变化的回调
    sizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    // 添加spu按钮
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 修改spu
    updateSpu(row) {
      this.scene = 1;
      // 获取子组件方法
      this.$refs.spu.initSpuDate(row);
    },
    // 自定义事件的回调 (SpuFrom)
    changeScene({ scene, flag }) {
      // console.log(scene, flag);
      this.scene = scene;

      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
      // console.log(0);
    },
    // 自定义事件的回调 (SkuFrom)
    changeScenes(scene) {
      this.scene = scene;
    },
    // 删除
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      // console.log(result);
      if (result.code == 200) {
        this.$message.success("删除成功");
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
      // console.log(row);
    },
    addSku(row) {
      // console.log(row);
      this.scene = 2;
      // 父组件调用子组件的方法，让子组件发请求-----三个请求
      this.$refs.sku.getDate(row, this.category1Id, this.category2Id);
    },
    // 查看SKU的按钮的回调
    async handler(spu) {
      this.dialogTableVisible = true;
      this.spu = spu;
      // 获取sku列表的数据进行展示
      let result = await this.$API.sku.reqSkuList(spu.id);
      // console.log(result);
      if (result.code == 200) {
        this.skuList = result.data;
        this.loading = false;
      }
    },
    // 关闭对话框的回调
    close(done) {
      this.loading = true;
      // 清除sku列表的数据
      this.skuList = []
      done()
    },
  },
};
</script>
<style lang="">
</style>