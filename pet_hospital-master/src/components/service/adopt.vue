<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>宠物服务</el-breadcrumb-item>
      <el-breadcrumb-item>宠物寄养</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 添加按钮 -->
      <el-row>
        <el-col :span="2">
          <el-button
            type="primary"
            style="margin-bottom: 10px"
            @click="showArticleAdd = true"
            >发布领养信息</el-button
          >
        </el-col>
      </el-row>
      <div class="card" v-for="(item, i) in petList" :key="i">
        <el-card>
          <div class="cover_img">
            <img :src="item.img" alt="" />
          </div>
          <div>
            <i class="el-icon-lollipop"></i>宠物名字：{{ item.pet_name }}
          </div>
          <div>
            <i class="el-icon-star-on"></i>宠物品种：{{ item.pet_type }}
          </div>
          <div><i class="el-icon-location"></i>所在城市：{{ item.city }}</div>
          <div><i class="el-icon-date"></i>发布时间：{{ item.date }}</div>
          <div>
            <i class="el-icon-user-solid"></i>联系人：{{ item.contact }}
          </div>
          <div><i class="el-icon-phone"></i>联系方式：{{ item.phone }}</div>
        </el-card>
      </div>
      <!-- 添加文章 -->
      <el-dialog
        title="发布领养信息"
        :visible.sync="showArticleAdd"
        width="30%"
      >
        <!-- 表单 -->
        <el-form
          :model="addpetList"
          :rules="addpetListRules"
          ref="addpetListRef"
          label-width="100px"
        >
          <!-- 标题 -->
          <el-form-item label="宠物名字" prop="pet_name">
            <el-input v-model="addpetList.pet_name"></el-input>
          </el-form-item>
          <el-form-item label="宠物品种" prop="pet_type">
            <el-input v-model="addpetList.pet_type"></el-input>
          </el-form-item>
          <el-form-item label="所在城市" prop="city">
            <el-input v-model="addpetList.city"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contact">
            <el-input v-model="addpetList.contact"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="addpetList.phone"></el-input>
          </el-form-item>
          <el-form-item label="宠物图片" prop="cover_img">
            <!-- //action指上传到后台的API地址 -->
            <el-upload
              action="http://127.0.0.1:3007/czj-server/upload/v1"
              :on-success="handleAvatarSuccessLicenseUrl"
              :before-upload="beforeAvatarUpload"
              list-type="picture"
              :limit="1"
            >
              <el-button size="mini" icon="el-icon-upload2" type="primary"
                >点击上传</el-button
              >
              <div slot="tip" class="el-upload__tip">
                只能上传一张jpg/png文件
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showArticleAdd = false">取 消</el-button>
          <el-button type="primary" @click="submitAddForm">确 定</el-button>
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
      // 添加框的显示与隐藏
      showArticleAdd: false,
      petList: [],
      addpetList: {},
      // 表单验证
      addpetListRules: {
        pet_name: [{ required: true, message: "请输入宠物名字", trigger: "blur" }],
        pet_type: [{ required: true, message: "请输入宠物品种", trigger: "blur" }],
        city: [{ required: true, message: "请输入所在城市", trigger: "blur" }],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getpetinfo();
  },
  methods: {
    // 获取宠物信息
    getpetinfo() {
      this.$http({
        method: "get",
        url: "http://127.0.0.1:3007/pet/getinfo",
      }).then((res) => {
        this.petList = res.data.data;
        console.log(this.petList);
      });
    },
    //  宠物图片上传成功后
    handleAvatarSuccessLicenseUrl(res, file) {
      
      this.addpetList.img = res.url;
      console.log(this.addpetList.img);
    },
    // 宠物图片上传之前
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (
        !(
          file.type === "image/png" ||
          file.type === "image/gif" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        )
      ) {
        this.$message.error(
          "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片"
        );
        return;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      return isLt2M;
    },
    // 提交发布宠物领养信息
    submitAddForm() {
      this.$refs.addpetListRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请完善必填项！");
        }
        //TODO
        let data = qs.stringify({
          img: this.addpetList.img,
          pet_name:this.addpetList.pet_name,
          pet_type:this.addpetList.pet_type,
          city:this.addpetList.city,
          contact:this.addpetList.contact,
          phone:this.addpetList.phone,
          pub_id: window.sessionStorage.getItem("id"),
        });
        this.$http({
          method: "post",
          data,
          url: "http://127.0.0.1:3007/pet/addinfo",
        }).then((res) => {
          console.log(res);
          if (res.data.status == 0) {
            this.$message.success(res.data.message);
            this.showArticleAdd = false;
            this.getpetinfo();
          }
        });
      });
    },
  },
};
</script>

<style>
.card {
  width: 30%;
  float: left;
  margin-right: 30px;
}
.card div {
  font-size: 14px;
}
.cover_img {
  transform: translateX(-50%);
  margin-left: 50%;
  height: 100%;
  width: 100%;
}

.cover_img img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.cover_img {
  width: 390px;
  height: 260px;
}

.cover_img img {
  width: 100%;
  height: 100%;
}
</style>