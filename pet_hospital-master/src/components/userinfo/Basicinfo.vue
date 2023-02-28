<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>基本信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体卡片区域 -->
    <el-card>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="" prop="cover_img">
          <!-- //action指上传到后台的API地址 -->
          <el-upload
            action="http://127.0.0.1:3007/czj-server/upload/v1"
            :on-success="handleAvatarSuccessLicenseUrl"
            :before-upload="beforeAvatarUpload"
            list-type="picture-card"
            :limit="1"
            :class="listLength===1?'hide_box':''"
          >
            <el-button size="mini" icon="el-icon-upload2" type="primary"
              >上传头像</el-button
            >
            <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formLabelAlign.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formLabelAlign.nickname"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
        <el-button type="primary" @click.native="edituserinfo"
          >确认修改</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {},
      listLength:0
    };
  },
  created() {
    this.getuserinfo();
  },
  methods: {
    getuserinfo() {
      var id = window.sessionStorage.getItem("id");
      this.$http({
        method: "post",
        url: "http://127.0.0.1:3007/my/userinfo",
        data: qs.stringify({ id: id }),
      }).then((res) => {
        this.formLabelAlign = res.data.data;
      });
    },
    edituserinfo() {
      var id = window.sessionStorage.getItem("id");
      let data = qs.stringify({
        id,
        email: this.formLabelAlign.email,
        nickname: this.formLabelAlign.nickname,
        user_pic:this.formLabelAlign.user_pic
      });
      this.$http({
        method: "post",
        url: "http://127.0.0.1:3007/my/upuserinfo",
        data,
      }).then((res) => {
        if (res.data.status == 0) this.$message.success(res.data.message);
        this.getuserinfo();
      });
    },
    handleAvatarSuccessLicenseUrl(res,file, fileList){
      this.listLength = fileList.length
      this.formLabelAlign.user_pic=res.url
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$message.error('请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片');
        return;
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isLt2M;
    },
  },
};
</script>
<style scoped>
.hide_box >>> .el-upload--picture-card{
  display: none;
}
</style>
