<template>
  <div>
    <!-- 品牌管理 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >
    <el-table border stripe style="width: 100%" :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- 
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="currentPage"

     -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev,pager,next,jumper,->,sizes,total"
      :total="total"
      background
      :pager-count="7"
      :current-page="page"
      @size-change="sizeChange"
      @current-change="getPageList"
    >
    </el-pagination>

    <el-dialog
      :title="tmFrom.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="width: 80%" :model="tmFrom" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmFrom.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmFrom.logoUrl" :src="tmFrom.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "tradeMark",
  data() {
    // 自定义验证规则
    let validateTmName = (rule, value, cb) => {
      // console.log(rule,value);
      if (value.length < 2 || value.length > 10) {
        cb(new Error("品牌名称2-10位"));
      } else {
        cb();
      }
    };
    return {
      // 代表的分页器第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 列表展示的数据
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示和隐藏
      dialogFormVisible: false,
      // 收集品牌的信息
      tmFrom: {
        tmName: "",
        // 上传图片使用属性
        logoUrl: "",
      },
      // 表单验证规则
      rules: {
        // 品牌名称的验证规则
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          // { min: 2, max: 10, message: "长度在2到10个字符", trigger: "change" },
          { validator: validateTmName, trigger: "change" },
        ],
        logoUrl: [{ required: true, message: "请选择品牌的图片" }],
      },
    };
  },
  mounted() {
    // 获取数据列表
    this.getPageList();
  },
  methods: {
    // 获取数据
    async getPageList(pager = 1) {
      this.page = pager;
      // 解构参数
      const { page, limit } = this;
      // 获取品牌列表的接口
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 当分页器某一页需要展示数据条数
    sizeChange(limit) {
      // 整理参数
      this.limit = limit;
      this.getPageList();
    },
    // 点击添加品牌的按钮
    showDialog() {
      // 展示对话框
      this.dialogFormVisible = true;
      // 清空数据
      this.tmFrom = { tmName: "", logoUrl: "" };
    },
    // 修改某一品牌
    updateTradeMark(row) {
      console.log(row);
      // 展示对话框
      this.dialogFormVisible = true;
      this.tmFrom = { ...row };
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.tmFrom.logoUrl = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加按钮 (添加/修改)
    async addOrUpdateTradMark() {
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false;
          // 发请求
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmFrom
          );
          if (result.code == 200) {
            this.$message.success(
              this.tmFrom.id ? "修改品牌成功" : "添加品牌成功"
            );
            // 重新获取数据
            this.getPageList(this.tmFrom.id ? this.page : 1);
          }
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    // 删除品牌信息
    deleteTradeMark(row) {
      this.$confirm(`你确定删除${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.trademark.reqDeleteTradeMake(row.id);
          console.log(result);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getPageList(this.list.length>1?this.page:this.page-1)
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
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon[data-v-2cf02b4a] {
  border: 1px dashed #d9d9d9;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>