<template>
  <div>
    <!-- Attr -->
    <el-card style="margin: 20px 0px">
      <CaregorySelect
        @getCategoryId="getCategoryId"
        :show="!isShowTable"
      ></CaregorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table style="width: 100%" border :data="attrList">
          <!-- 表格 -->
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <div>
                <el-tag
                  style="margin: 0px 20px"
                  type="success"
                  v-for="(attrValue, index) in row.attrValueList"
                  :key="attrValue.id"
                  >{{ attrValue.valueName }}</el-tag
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <!-- <div>{{ row }}{{ $index }}</div> -->
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteAttr(row)"
              ></el-button> </template></el-table-column
        ></el-table>
      </div>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button size="default" @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>

          <el-table-column
            type="index"
            label="属性值名称"
            prop="prop"
            width="700px"
          >
            <template slot-scope="{ row, $index }">
              <el-input
                :ref="$index"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>

          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addOrUpdateAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
// 按需引入lodash深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 平台属性
      attrList: [],
      // 控制table表格显示和隐藏
      isShowTable: true,
      // 搜集新增属性|修改属性使用的
      attrInfo: {
        attrName: "",
        attrValueList: [
          // {
          //   attrId: 0,
          //   valueName: "",
          // },
        ],
        categoryId: 0,
        categoryLevel: 3,
      },
      // flag:true
    };
  },
  methods: {
    // 自定义事件
    getCategoryId({ categoryId, level }) {
      // console.log(categoryId,level);
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 发请求获取平台的属性数据
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值
    addAttrValue() {
      // alert(11)
      // 向属性值的数组里面添加元素
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性的回调
    addAttr() {
      // alert(1)
      this.isShowTable = false;
      // 清除数据
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    // 修改某一个属性
    updateAttr(row) {
      // console.log(row);
      this.isShowTable = false;
      this.attrInfo = cloneDeep(row);
      // this.attrInfo = {...row}
      this.attrInfo.attrValueList.forEach((item) => {
        // item.flag = false
        // console.log(item);
        this.$set(item, "flag", false);
      });
      // this.$set(this.attrInfo.attrValueList,'flag',false)
    },
    // 失去焦点的事件---切换为查看模式，展示span
    toLook(row) {
      if (row.valueName.trim() == "") {
        this.$message("请你输入一个正常的值");
        return;
      }
      // 新增的属性值不能与已有的属性值重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        // console.log(item);
        if (row !== item) {
          return row.valueName === item.valueName;
        }
      });
      // console.log(isRepat);
      if (isRepat) return;
      row.flag = false;
    },
    // 点击span的回调
    toEdit(row, index) {
      row.flag = true;
      // setTimeout(() => {
      //   console.log(this.$refs[index]);
      // }, 1000);
      this.$nextTick(() => {
        // console.log(this.$refs[index]);
        this.$refs[index].focus();
      });
    },
    // 气泡确认框的回调  (element-ui版本问题)
    deleteAttrValue(index) {
      // console.log(index);
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存按钮
    async addOrUpdateAttr() {
      // alert(111)
      // 整理参数
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName !== "") {
            delete item.flag;
            return true;
          }
        }
      );
      // 发请求
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        // 展示平台属性的信号量进行切换
        this.isShowTable = true;
        this.$message.success("保存成功");
        // 保存成功重新获取平台属性展示
        this.getAttrList();
      } catch (error) {
        this.$message.error("保存失败");
      }
      // let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
      // console.log(result);
    },
    deleteAttr(row) {
      // console.log(row);
      this.$confirm(`此操作将删除${row.attrName}列表`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$API.attr.deleteAttr(row.id);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getAttrList()
          } catch (error) {
            this.$message({
              type: "error",
              message: "删除失败!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="">
</style>