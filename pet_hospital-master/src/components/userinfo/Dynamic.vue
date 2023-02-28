<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>动态信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体卡片区域 -->
    <el-card>
      <el-tabs type="card">
        <el-tab-pane label="已发布">
          <el-row>
            <el-col :span="8" v-for="(item, i) in PublishaticlesList" :key="i">
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
                      <el-button type="text" class="button" slot="reference"
                        >阅读</el-button
                      >
                      <slot>{{ item.content }}</slot>
                    </el-popover>
                  </div>
                  <el-button
                    type="danger"
                    slot="reference"
                    @click="removeUser(item.Id)"
                    >删除</el-button
                  >
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="草稿">
          <el-row>
            <el-col :span="8" v-for="(item, i) in DraftaticlesList" :key="i">
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
                      <el-button type="text" class="button" slot="reference"
                        >阅读</el-button
                      >
                      <slot>{{ item.content }}</slot>
                    </el-popover>
                  </div>
                  <el-button
                    type="primary"
                    slot="reference"
                    @click="pubarticle(item.Id)"
                    >发布</el-button
                  >
                  <el-button
                    type="danger"
                    slot="reference"
                    @click="removeUser(item.Id)"
                    >删除</el-button
                  >
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import qs from "qs";
// import { pubarticle } from "../../../../pet_hospital_sever-mybranch/router_handle/article";
export default {
  data() {
    return {
      PublishaticlesList: [],
      DraftaticlesList: [],
    };
  },
  created() {
    this.getArticlePublish();
    this.getArticleDraft();
    var id = window.sessionStorage.getItem("id");
    this.$http({
      method: "post",
      url: "http://127.0.0.1:3007/my/userinfo",
      data: qs.stringify({
        id: id,
      }),
    }).then((res) => {
      console.log(res);
    });
  },
  methods: {
    getArticlePublish() {
      var id = window.sessionStorage.getItem("id");

      this.$http({
        method: "post",
        url: "http://127.0.0.1:3007/my/article/articleid",
        data: qs.stringify({
          author_id: id,
          state: 1,
        }),
      }).then((res) => {
        this.PublishaticlesList = res.data.data;
      });
    },
    getArticleDraft() {
      var id = window.sessionStorage.getItem("id");
      this.$http({
        method: "post",
        url: "http://127.0.0.1:3007/my/article/articleid",
        data: qs.stringify({
          author_id: id,
          state: 0,
        }),
      }).then((res) => {
        this.DraftaticlesList = res.data.data;
      });
    },
    //删除文章
    async removeUser(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文章, 是否继续?",
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
        url: "http://127.0.0.1:3007/my/article/deletearticle",
        data: qs.stringify({ id: id }),
      }).then((res) => {
        // console.log(res);
        if (res.data.status != 0)
          return this.$message.error("删除文章信息失败");
        this.$message.success("删除文章信息成功！");
        this.getArticlePublish();
        this.getArticleDraft();
      });
    },
    //发布文章
    pubarticle(id){
      this.$http({
        method: "post",
        url: "http://127.0.0.1:3007/my/article/pubarticle",
        data: qs.stringify({ id: id }),
      }).then((res) => {
        // console.log(res);
        if (res.data.status != 0)
          return this.$message.error("发布文章信息失败");
        this.$message.success("发布文章信息成功！");
        this.getArticlePublish();
        this.getArticleDraft();
      });
    }
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
