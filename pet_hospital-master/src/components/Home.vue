<template>
  <el-container class="container_home">
    <!-- 头部 -->
    <el-header>
      <div class="logo">
        <img src="../assets/cat.png" alt="" />
        <span>新时代宠物服务系统</span>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar size="large" :src="userInfo.user_pic" class="avatar"></el-avatar>
          <i class="el-icon-arrow-down el-icon--right" style="vertical-align: middle"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button icon=" el-icon-house " class="button_out">个人信息</el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button icon="el-icon-switch-button" class="button_out" @click="logout">退出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '65px' : '200px'">
        <div class="collapse" @click="collapse">| | |</div>
        <el-menu :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" :router="true"
          :default-active="activePath" class="el-menu-vertical-demo" background-color="#8cc5ff" text-color="#fff"
          active-text-color="#ffd04b">
          <!-- 一级菜单宠物知识 -->
          <el-submenu index="1">
            <template slot="title">
              <!-- 图标 -->
              <!-- <i :class="iconlist[item.id]"></i> -->
              <!-- 文字 -->
              <span>宠物咨询</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/forum'" @click="savaNevStatus('/forum')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文字 -->
                <span>宠物知识</span>
              </template>
            </el-menu-item>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/data'" @click="savaNevStatus('/data')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文字 -->
                <span>宠物数据</span>
              </template>
            </el-menu-item>

          </el-submenu>
          <!-- 一级菜单个人信息 -->
          <el-submenu index="2">
            <template slot="title">
              <!-- 图标 -->
              <!-- <i :class="iconlist[item.id]"></i> -->
              <!-- 文字 -->
              <span>个人信息</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/basicinfor'" @click="savaNevStatus('/basicinfor')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文字 -->
                <span>基本信息</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="'/Dynamic'" @click="savaNevStatus('/Dynamic')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文字 -->
                <span>个人动态</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :index="'/member'" @click="savaNevStatus('/member')">
            <template slot="title">
              <!-- 图标 -->
              <!-- <i class="el-icon-menu"></i> -->
              <!-- 文字 -->
              <span>成员信息</span>
            </template>
          </el-menu-item>
          <!-- 一级菜单 -->
          <el-submenu index="4">
            <template slot="title">
              <!-- 图标 -->
              <!-- <i :class="iconlist[item.id]"></i> -->
              <!-- 文字 -->
              <span>宠物服务</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/hairdressing'"
              @click="savaNevStatus('/hairdressing')"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文字 -->
                <span>美容美发</span>
              </template>
            </el-menu-item>
            <el-menu-item
              :index="'/martyrdom'"
              @click="savaNevStatus('/martyrdom')"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文字 -->
                <span>宠物殡葬</span>
              </template>
            </el-menu-item>
            <el-menu-item
              :index="'/adopt'"
              @click="savaNevStatus('/adopt')"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文字 -->
                <span>宠物领养</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主题 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      menulist: {},
      iconlist: {
        125: "iconfont icon-quanxianguanli",
        103: "iconfont icon-shangpinguanli",
        101: "iconfont icon-dingdanguanli",
        102: "iconfont icon-shujutongji",
        145: "iconfont icon-a-icon-person-nan2",
      },
      isCollapse: false,
      activePath: "",
      userInfo: {
        email: "",
        nickname: "",
        user_pic: "",
        username: "",
      },
      id: "",
    };
  },
  created() {
    this.id = window.sessionStorage.getItem("id");
    this.activePath = window.sessionStorage.getItem("activePath");
    // 获取用户基本信息
    let data = qs.stringify({
      id: this.id,
    });
    console.log(this.id);
    this.$http({
      method: "post",
      url: "http://127.0.0.1:3007/my/userinfo",
      data,
    }).then((res) => {
      const results = res.data;
      console.log(results.data);
      this.userInfo = results.data;
      if (res.data.user_pic == null) {
        this.userInfo.user_pic =
          "http://127.0.0.1:3007/uploads/1-210RR1320c52-lp.jpg";
      } else {
        this.userInfo.user_pic = res.data.user_pic;
      }
    });
  },
  methods: {
    // 退出登录
    logout() {
      console.log("logout");
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    // 控制折叠
    collapse() {
      this.isCollapse = !this.isCollapse;
    },
    //点击二级菜单 保存的激活状态
    savaNevStatus(activePath) {
      window.sessionStorage.setItem("activePath", activePath),
        (this.activePath = activePath);
    },
  },
};
</script>
<style lang="less" scoped>
.container_home {
  height: 100%;
  width: 100%;
  // position: fixed;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #66b1ff;
  color: #fff;
  font-size: 20px;

  >div {
    display: flex;
    align-items: center;
  }

  .el-dropdown {
    position: absolute;
    right: 80px;
  }
}

.el-aside {
  background-color: #8cc5ff;

  .el-menu {
    border-right: 0;
  }
}

.el-main {
  background-color: #d9ecff;
}

.logo img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.iconfont {
  margin-right: 10px;
}

.collapse {
  color: #fff;
  text-align: center;
  padding: 5px;
  background-color: #7cbbff;
  cursor: pointer; //鼠标变小手
}

.el-aside,
.el-main {
  overflow: auto;
}

.el-dropdown-menu__item {
  padding: 0;
}

.button_out {
  border: 0;
}
</style>
