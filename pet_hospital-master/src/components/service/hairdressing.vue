<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>宠物服务</el-breadcrumb-item>
      <el-breadcrumb-item>美容美发</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体卡片区域 -->
    <el-card>
      <el-steps
        :active="active"
        finish-status="success"
        align-center
        style="margin-bottom: 30px"
      >
        <el-step title="项目简介"></el-step>
        <el-step title="预约服务"></el-step>
        <el-step title="订单确认"></el-step>
        <el-step title="提交成功"></el-step>
      </el-steps>
      <!-- 项目简介  -->
      <el-collapse
        v-model="activeNames"
        @change="handleChange"
        v-show="active == 1"
      >
        <el-collapse-item title="梳毛" name="1">
          <div>
            用大针梳给爱犬刷梳理皮毛，可以刷去犬儿身上的死毛及毛结，令皮毛柔顺整洁有光泽感。
          </div>
        </el-collapse-item>
        <el-collapse-item title="开结" name="2">
          <div>
            梳理完毛发后，便可用钢梳再进行梳理，检查爱犬身上是否还有小毛结存在。如果在洗澡之前没把爱犬身上的毛结梳开，洗澡后更不易梳通也洗不透彻爱犬的毛发。
          </div>
        </el-collapse-item>
        <el-collapse-item title="清洗耳朵" name="3">
          <div>
            犬需要经常清洗耳朵，一般半个月清洗一次就可以。如果不经常给犬清洗耳朵，会生耳螨严重的会导致中耳炎。最容易得耳病的犬是可卡犬，因为可卡的耳朵很长很大不象哈士奇的耳朵是直立的。因为不透风，所以很容易滋生病菌。
          </div>
        </el-collapse-item>
        <el-collapse-item title="拔耳毛" name="4">
          <div>
            不是所有的犬都长耳毛的，一般常见的狗有贵宾、西施、比熊、马尔济斯、雪纳瑞等等。可跟清洗耳朵一样半个月做一次即可。如果不经常拔耳毛的话，耳毛会堵住耳朵不透气，也会导致耳螨的滋生。
          </div>
        </el-collapse-item>
        <el-collapse-item title="清洗眼睛" name="5">
          <div>
            眼睛是心灵之窗，如果护理不好的话，会导致例如白内障等很多眼部疾病。例如京叭的眼睛是凸出来的，很容易受到外界环境的侵害。
          </div>
        </el-collapse-item>
        <el-collapse-item title="牙齿管理" name="6">
          <div>
            诱发臭味的另一种就是口臭。口臭是因为肾脏等内脏器官的疾病来出现的，但大部分是因为牙齿管理不好而出现牙龈疾病或者齿垢来发生的。预防齿垢或者牙龈炎也很重要，可通过漱口刷牙或者咀嚼洁牙骨(N—bone的结牙效果相当显着且便捷)来预防牙垢。狗的牙膏是跟人的不同，没有泡末的转氨酶成分来做的吃下去也没问题的。牙刷是依照狗的牙齿大小适当的来选择，必须4个月之前教它刷牙的习惯。
          </div>
        </el-collapse-item>
        <el-collapse-item title="肛门腺护理" name="7">
          <div>
            很多人对这个问题比较陌生，什么是肛门腺呢?肛门腺是一个吸收直肠毒素的腺体，如果不定时清理，会导致狗的体臭和肛门腺发炎。不过肛门腺对犬来说是很重要的!一般犬在见面的时候都会先闻闻对方的屁股，这就是在闻肛门腺的气味，肛门腺就象犬的身份证一样，每条犬的气味都是不一样的，犬的这种行为跟人类的握手是一样的。一般挤肛门腺都是在洗澡的时候完成的，如果不经常挤肛门腺，就会造成肛门腺发炎，一般健康的狗狗肛门腺挤出来是液体状的，如果时间长不做美容的狗狗肛门腺堵塞一段时间后，液体就会变成牙膏状，如果分泌物中带脓血，说明已经被感染，要尽快就医，局部封闭治疗。有很多人应该见过自家的狗坐在地上蹭屁股的情景，那就是你家的狗狗肛门腺不舒服了，该带它到宠物美容店做美容了。
          </div>
        </el-collapse-item>
        <el-collapse-item title="剪指甲" name="8">
          <div>
            一般两周剪一次就可以，如果时间太长不剪趾甲会导致趾甲弯曲、变形最后长到肉里。爱犬的指甲过长会影响走路困难，也可以引起骨骼变形走起路来姿势不美观等一些问题。、剪指甲看起来很简单，其实内有文章修剪时不能剪得过深，以免造成出血。如果爱犬被剪过一次流血，下次一定不让碰脚，脾气也变得厉害
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 预约服务 -->
      <div v-show="active == 2" style="width: 400px; margin: 0 auto">
        <el-form
          :model="form"
          label-width="80px"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="宠物名称" label-width="80px" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="选择门店" prop="region">
            <el-select v-model="form.region" placeholder="请选择门店">
              <el-option label="浈江店" value="浈江店"></el-option>
              <el-option label="武江店" value="武江店"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="美容师" prop="people">
            <el-select v-model="form.people" placeholder="请选择美容师">
              <el-option label="大Q" value="大Q"></el-option>
              <el-option label="小Q" value="小Q"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="美容套餐" prop="package">
            <el-select v-model="form.package" placeholder="请选择美容套餐">
              <el-option
                label="健康护理洗套餐"
                value="健康护理洗套餐"
              ></el-option>
              <el-option
                label="美容健康护理套餐"
                value="美容健康护理套餐"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="美容时间" prop="date1">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                placeholder="选择时间"
                v-model="form.date2"
                style="width: 100%"
                value-format="HH:mm:ss"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="高级服务">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <!-- 订单确认 -->
      <el-card class="card" v-show="active == 3">
        <div>订单信息</div>
        <el-divider></el-divider>
        <div>
          <i class="el-icon-chat-line-round"></i>宠物名称：{{ form.name }}
        </div>
        <div>
          <i class="el-icon-time"></i>时间：{{ form.date1 }} {{ form.date2 }}
        </div>
        <div><i class="el-icon-takeaway-box"></i>门店：{{ form.region }}</div>
        <div><i class="el-icon-dish"></i>美容套餐：{{ form.package }}</div>
        <div><i class="el-icon-s-check"></i>美容师：{{ form.people }}</div>
      </el-card>
      <div v-show="active == 3" style="width: 400px; margin: 0 auto">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="联系人" label-width="80px" prop="contact">
            <el-input v-model="form.contact"></el-input>
          </el-form-item>
          <el-form-item label="手机号" label-width="80px" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="备注信息" label-width="80px">
            <el-input v-model="form.message"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="width: 400px; margin: 0 auto;font-size: 14px;" v-show="active == 4">
        <el-card class="successcard">
          <img class="img" src="../../assets/images/success.png">
          <div style="margin-bottom:20px">您已成功提交该订单</div>
          <div>温馨提示：距服务开始24小时内取消订单会收取10%服务费，请您确认爱宠是否有怀孕、发情、受伤、咬人等不适合服务等情况，来店前先与店内沟通。</div>
          
        </el-card>
      </div>
      <el-button style="margin-top: 12px" @click="retur" v-show="active >1&&active <4">上一步</el-button>
      <el-button style="margin-top: 12px" @click="next" v-show="active <4">下一步</el-button>
      <el-button style="margin-top: 12px" @click="index" v-show="active ==4">返回</el-button>
      
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      contact: "",
      phone: "",
      message: "",
      activeNames: ["1"],
      form: {
        people: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        package: "",
      },
      rules: {
        name: [{ required: true, message: "请输入宠物名称", trigger: "blur" }],
        region: [{ required: true, message: "请选择门店", trigger: "change" }],
        package: [{ required: true, message: "请选择美容套餐", trigger: "change" }],
        people: [{ required: true, message: "请选择美容师", trigger: "change" }],
        date1:[{ required: true, message: "请选择日期", trigger: "change" }],
        contact:[{ required: true, message: "请填写联系人", trigger: "change" }],
        phone:[{ required: true, message: "请填写手机号", trigger: "change" }],
        
      },
    };
  },

  methods: {
    retur(){
      this.active--
    },
    next() {
      if (this.active == 2) {
        this.$refs.ruleForm.validate((valid) => {
          if(!valid)  {
            return this.$message.error("请完善必填项") 
          }else{
            this.active++
          }
        });
        return 0
      }
      if (this.active == 3) {
        this.$refs.form.validate((valid) => {
          if(!valid)  {
            return this.$message.error("请完善必填项") 
          }else{
            this.$message.success("您已经成功提交订单")
            this.active++
          }
        });
        return 0
      }
      if (this.active++ > 4) this.active = 5;

    },
    index(){
      this.active = 1
      this.$refs.form.resetFields();
      this.$refs.ruleForm.resetFields();
    },
    handleChange(val) {
      console.log(val);
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style>
.class {
  text-align: left;
}
i {
  margin-right: 4px;
}
.card {
  text-align: left;
  width: 400px;
  margin: 0 auto;
  font-size: 15px;
  margin-bottom: 20px;
}
.card div {
  margin-bottom: 8px;
}
.img{
  width: 50px;
  height: 50px;
  margin: 20px 0;
}

</style>