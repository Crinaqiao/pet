<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>宠物论坛</el-breadcrumb-item>
      <el-breadcrumb-item>宠物咨询</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 添加按钮 -->
      <el-row>
        <el-col :span="2">
          <el-button
            type="primary"
            style="margin-bottom: 10px"
            @click="showArticleAdd = true"
            >添加按钮</el-button
          >
        </el-col>
      </el-row>
      <!-- 图文区 -->
      <el-row>
        <el-col :span="8" v-for="(item, i) in aticlesList" :key="i">
          <el-card
            :body-style="{ padding: '0px' }"
            style="margin: 0 20px 20px 0"
          >
            <!-- <img class="image"> -->
            <!-- 文章封面 -->
            <div class="cover_img">
              <img :src="item.cover_img" alt="" />
            </div>
            <!-- 文章内容 -->
            <div style="padding: 14px" class="article_text">
              <!-- 发布文章的时间 -->
              <div class="time">
                <i class="el-icon-timer"></i>
                <span>{{ item.pub_date }}</span>
              </div>
              <!-- 文章标题 -->
              <div class="title">
                {{ item.title }}
              </div>
              <!-- 文章内容 -->
              <div class="content">{{ item.content }}</div>
              <div class="bottom clearfix">
                <!-- 阅读按钮 -->
                <el-popover
                  placement="bottom"
                  width="400"
                  trigger="hover"
                  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                  
                >
                  <el-button type="text" class="button" slot="reference">阅读</el-button>
                  <slot>{{item.content}}</slot>
                </el-popover>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 添加文章 -->
      <el-dialog title="提示" :visible.sync="showArticleAdd" width="30%">
        <!-- 表单 -->
        <el-form
          :model="addAricleList"
          :rules="addAricleListRules"
          ref="addAricleListRef"
          label-width="100px"
        >
          <!-- 标题 -->
          <el-form-item label="标题" prop="title">
            <el-input v-model="addAricleList.title"></el-input>
          </el-form-item>
          <!-- 内容 -->
          <el-form-item label="内容" prop="content">
            <el-input
              type="textarea"
              v-model="addAricleList.content"
            ></el-input>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态" prop="state">
            <el-radio-group v-model="addAricleList.state">
              <el-radio label="0">草稿</el-radio>
              <el-radio label="1">发布</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 封面 -->
          <el-form-item label="封面" prop="cover_img">
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
      visible: false,
      // 获取数据的存储位置
      aticlesList: [],
      // 添加框的显示与隐藏
      showArticleAdd: false,
      // 添加文章的参数
      addAricleList: {
        cover_img: "",
        title: "",
        content: "",
        state: "1",
      },
      // 表单验证
      addAricleListRules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 25,
            message: "长度在 3 到 25 个字符",
            trigger: "blur",
          },
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 20,
            max: 800,
            message: "长度在 20 到 800 个字符",
            trigger: "blur",
          },
        ],
        state: [{ required: true, message: "请选择状态", trigger: "change" }],
        // cover_img: [
        //   { required: true, message: '请选择封面', trigger: 'blur' }
        // ],
      },
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    // 获取文章信息
    getArticle() {
      this.$http({
        method: "get",
        url: "http://127.0.0.1:3007/my/article/articlesList",
      }).then((res) => {
        const result = res.data;
        this.aticlesList = result.data;
        console.log(res);
      });
    },
    //  文章封面上传成功后
    handleAvatarSuccessLicenseUrl(res, file) {
      console.log(res);
      this.addAricleList.cover_img = res.url;
      console.log(this.addAricleList.cover_img);
    },
    // 文章封面上传之前
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
    // 提交发布文章信息
    submitAddForm() {
      this.$refs.addAricleListRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请完善必填项！");
        }
        //TODO
        let data = qs.stringify({
          cover_img: this.addAricleList.cover_img,
          title: this.addAricleList.title,
          content: this.addAricleList.content,
          state: this.addAricleList.state,
          author_id: window.sessionStorage.getItem("id"),
        });
        this.$http({
          method: "post",
          data,
          url: "http://127.0.0.1:3007/my/article/add",
        }).then((res) => {
          console.log(res);
          if (res.data.status == 0) {
            this.$message.success(res.data.message);
            this.showArticleAdd = false;
            this.getArticle();
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
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

.article_text {
  float: left;
  text-align: left;
  // margin-top: 10px;
}

.time {
  font-size: 15px;
  color: rgb(150, 148, 148);
}

.title {
  margin: 10px 0;
  font-size: 20px;
}

.content {
  width: 100%; //（设置宽度）
  height: 40px;
  overflow: hidden; //（超出隐藏）
  text-overflow: ellipsis; //（显示省略号）
  display: -webkit-box;
  -webkit-line-clamp: 2; //（行数）
  -webkit-box-orient: vertical;
  color: rgb(150, 148, 148);
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
