<template>
  <div>
    <div class="register_contain">
      <div class="register_box">
        <!-- logo区域 -->
        <div class="avatar">
          <img src="../../assets/cat.png" alt="" />
        </div>
        <!-- 注册表单区域 -->
        <el-form :model="registerForm" :rules="registerFormRules" ref="registerFormRef" class="register_form">

          <el-form-item label="" prop="username">
            <el-input v-model="registerForm.username" class="register_user" prefix-icon="iconfont icon-jurassic_user"
              placeholder="请输入账号">
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="registerForm.password" prefix-icon="iconfont icon-mima-on" type="password"
              placeholder="请输入密码"></el-input>
          </el-form-item>

        </el-form>

        <!-- 按钮 -->
        <div class="register_type">
          <el-button type="primary" round class="register_btn" @click="register">注册</el-button>
          <el-button type="info" round class="register_btn" @click="login">登录</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      // 绑定对象
      registerForm: {
        username: '',
        password: '',
        // account: '',
        // userType: 1,
      },

      // 对象的验证
      registerFormRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    register() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return;
        let data = qs.stringify({
          username: this.registerForm.username,
          password: this.registerForm.password
        })
        await this.$http({
          method: "post",
          data,
          url: "http://127.0.0.1:3007/api/reguser"
        }).then((res) => {
          console.log(res.data)
          if (res.data.status !== 0) { return this.$message.error(res.data.message) }
          this.$message.success(res.data.message)
          this.$router.push('/login')

        })
      })
    }
  }
};
</script>

<style lang="less" scoped>
.register_contain {
  height: 100%;
  width: 100%;
  background: url(../../assets/images/bg.jpg);
  margin: 0;
  padding: 0;
  // background-size: 100% 100%;
  position: fixed;
}

.register_box {
  position: relative;
  width: 450px;
  height: 300px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  background-color: #ada7e0;
  border-radius: 10%;
}

.avatar {
  text-align: center;
}

.avatar img {
  width: 100px;
  height: 100px;
  margin-top: -40px;
}

.register_form {
  margin-top: 20px;
  padding: 0 40px;
}

.register_user {
  margin-bottom: 10px;
}

.register_type {
  margin-top: 32px;
  text-align: center;
}

.register_btn {
  margin-right: 20px;
}

.foot_img {
  position: absolute;
  width: 800px;
  height: 300px;
  transform: translateX(-50%);
  left: 50%;
  bottom: 0;
}

.foot_img img {
  width: 100%;
  height: 100%;
}
</style>
