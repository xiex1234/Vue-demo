<template>
  <div>
    <!-- {{unSelectSaleAttr}} -->
    <!-- 添加或者修改SPU -->
    <el-form label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradMarkList"
            :key="tm.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <!-- <el-input type="textarea" rows="4" placeholder="描述"></el-input> -->
        <el-upload
          action="/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="unselect.name"
            :value="`${unselect.id}:${unselect.name}`"
            v-for="(unselect, index) in unSelectSaleAttr"
            :key="unselect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >

        <el-table border stripe style="width: 100%" :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
                <!--  @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
              <!-- 
                @click="showInput"
               -->
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addOrupdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        // 三级分类的id
        category3Id: 0,
        // 描述
        description: "",
        // 图片信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        // spu名称
        spuName: "",
        // 品牌id
        tmId: "",
        // 平台属性与属性值搜集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      }, //存储SPU信息属性
      tradMarkList: [], //存储品牌信息
      spuImageList: [], //存储SPU图片的数据
      saleAttrList: [], //销售属性的数据
      attrIdAndAttrName: "", //搜集未选择的销售属性的id
    };
  },
  methods: {
    // 删除一张照片的回调
    handleRemove(file, fileList) {
      // 搜集照片墙图片的数据
      this.spuImageList = fileList;
      // console.log(file, fileList);
    },
    // 照片墙预览的回调
    handlePictureCardPreview(file) {
      // console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 初始化SpuForm数据
    async initSpuDate(spu) {
      // console.log(spu);
      // 获取SPU信息
      let SpuResult = await this.$API.spu.reqSpu(spu.id);
      if (SpuResult.code === 200) {
        this.spu = SpuResult.data;
      }
      // 获取品牌的信息
      let tradmarkResult = await this.$API.spu.reqTradMarkList();
      if (tradmarkResult.code === 200) {
        this.tradMarkList = tradmarkResult.data;
      }
      // 获取spu图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        // this.spuImageList = spuImageResult.data;
        let listArr = spuImageResult.data;
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        // console.log(listArr);
        this.spuImageList = listArr;
      }
      // 获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
      // console.log(saleResult);
    },
    // 照片墙上传成功的回调
    handlerSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      this.spuImageList = fileList;
    },
    // 添加新的销售属性
    addSaleAttr() {
      // 已经搜集需要添加的销售属性的信息
      // 把搜集到的销售属性进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      // console.log(baseSaleAttrId, saleAttrName);
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      // 清除数据
      this.attrIdAndAttrName = "";
    },
    // 添加按钮的回调
    addSaleAttrValue(row) {
      // console.log(row);
      this.$set(row, "inputVisible", true);
      // row.inputVisible
      this.$set(row, "inputValue", "");
    },
    // el-input失去焦点事件
    handleInputConfirm(row) {
      row.inputVisible = false;
      // console.log(row);
      let { baseSaleAttrId, inputValue } = row;
      // 不能为空
      if (inputValue.trim() == "") {
        this.$message.info("属性值不能为空");
        return;
      }
      // 不能重复
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      // console.log(result);
      if (!result) {
        return;
      }
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      // 新增
      row.spuSaleAttrValueList.push(newSaleAttrValue);
    },
    // 保存按钮的回调
    async addOrupdateSpu() {
      // 携带参数：对于图片，需要携带imageName与imageUrl字段
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url,
        };
      });
      // 发请求
      // let result = await this.$API.spu.reqAddorUpdateSpu(this.spu);
      // console.log(result);
      try {
        await this.$API.spu.reqAddorUpdateSpu(this.spu);
        this.$message.success("保存成功");
        // 通知父组件回到场景0
        this.$emit("changeScene", {
          scene: 0,
          flag: this.spu.id ? "修改" : "添加",
        });
      } catch (error) {
        this.$message.error("保存失败");
      }
      Object.assign(this._data, this.$options.data());
    },
    // 点击添加SPU按钮的时候，发请求的函数
    async addSpuData(category3Id) {
      // 添加SPU的时候搜集三级分类的id
      this.spu.category3Id = category3Id;
      // 获取品牌的信息
      let tradmarkResult = await this.$API.spu.reqTradMarkList();
      if (tradmarkResult.code === 200) {
        this.tradMarkList = tradmarkResult.data;
      }

      // 获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 取消按钮
    cancel() {
      // 取消按钮
      this.$emit("changeScene", { scene: 0, flag: "" });
      // 清除数据
      console.log(this);
      Object.assign(this._data, this.$options.data());
    },
  },
  mounted() {},
  computed: {
    // 计算出还未选择的销售属性
    unSelectSaleAttr() {
      let a = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      // console.log(a);
      return a;
    },
  },
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>