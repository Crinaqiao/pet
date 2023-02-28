<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体卡片区域 -->
    <el-card>
      <!-- 用户信息列表 -->
      <el-table :data="userlist" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="昵称" prop="nickname"></el-table-column>
        <el-table-column label="电子邮箱" prop="email"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改用户信息按钮 -->
            <el-tooltip :enterable="true" content="修改" placement="top">
              <el-button
                icon="el-icon-edit"
                type="primary"
                @click="showeditdialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 删除用户信息按钮 -->
            <el-tooltip content="删除" placement="top" :enterable="true">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="removeUser(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改用户弹框界面 -->
      <el-dialog
        title="修改用户信息"
        :visible.sync="editdialogVisible"
        width="50%"
      >
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editFormRef"
          label-width="70px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="editForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
  <script>
import qs from "qs";
export default {
  data() {
    return {
      userlist: [],
      editdialogVisible: false,
      editForm: {},
      //修改用户信息检验规则
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur",
          },
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getuserlist();
  },
  methods: {
    //获取用户信息列表
    getuserlist() {
      this.$http({
        method: "get",
        url: "http://127.0.0.1:3007/my/userinfo",
      }).then((res) => {
        this.userlist = res.data.data;
      });
    },
    //显示修改用户弹窗
    showeditdialog(id) {
      this.editdialogVisible = true;
      this.editForm.id = id;
      this.$http({
        method: "post",
        url: "http://127.0.0.1:3007/my/userinfo",
        data: qs.stringify({
          id: id,
        }),
      }).then((res) => {
        this.editForm = res.data.data;
      });
    },
    //修改用户信息
    editUserInfo() {
      console.log(this.editForm);
      this.$http({
        method: "post",
        url: "http://127.0.0.1:3007/my/upuserinfo",
        data: qs.stringify(this.editForm),
      }).then((res) => {
        this.editdialogVisible = false;
        this.getuserlist();
        if (res.data.status == 0)
          return this.$message.success(res.data.message);
      });
    },
    //删除用户
    async removeUser(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((error) => error);
      if (confirmResult != "confirm")
        return this.$message.info("已取消删除操作");

      console.log(id);
      this.$http({
        method: "post",
        url: "http://127.0.0.1:3007/my/deleteuser",
        data: qs.stringify({ id: id }),
      }).then((res) => {
        // console.log(res);
          if (res.data.status != 0)
            return this.$message.error("删除用户信息失败");
          this.$message.success("删除用户信息成功！");
          this.getuserlist();
      });
    },
  },
};
</script>
  <style lang="less" scoped>
</style>
  