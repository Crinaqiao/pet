<template>
    <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>宠物服务</el-breadcrumb-item>
        <el-breadcrumb-item>宠物殡葬</el-breadcrumb-item>
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
          <el-collapse-item title="专车上门接宠" name="1">
            <div>
                在宠物去世的时候，宠主肯定是非常伤心难过的，可能很多宠主也没有什么精力和心思开车送宠物去门店了。当然了，现在的时代里，每一个行业都很注重服务，专业的宠物殡葬服务中心会提供专车上门接宠服务，宠物善终服务门店一旦接到了宠物殡葬预约，便会就近派出门店的工作人员前往接宠。
            </div>
          </el-collapse-item>
          <el-collapse-item title="全面消毒防疫" name="2">
            <div>
                宠物去世后可能会滋生细菌，有的因为生病不治愈而去世的宠物可能还会滋生病菌，这些对于人类以及其他生物的健康是有一定的威胁性的。因此，在接宠的时候，毛毛宠工作人员会为已逝宠物以及生前使用的物品进行全面的消毒，然后再送至门店。
            </div>
          </el-collapse-item>
          <el-collapse-item title="整理宠物仪容" name="3">
            <div>
                每一位宠主都会希望自己的爱宠可以漂漂亮亮的走最后一程，因此，毛毛宠的宠物殡葬师会在第一时间为宠物进行清洗毛发，并做好仪容的整理，还至生前漂亮整洁的模样，在此过程中，宠物殡葬师对待已逝宠物非常细心用心，是给予最高礼遇的尊重。
            </div>
          </el-collapse-item>
          <el-collapse-item title="临终告别" name="4">
            <div>
                紧接着，宠物殡葬师会将宠物放置动物灵堂处，会给宠物做相应的法事，并且引导宠主给宠物进行祷告祈福。在此过程中，相当于是给宠物举办一个简单的葬礼仪式，让宠主可以好好送别爱宠最后一程，在整个过程中，宠主也可以逐渐放下。
            </div>
          </el-collapse-item>
          <el-collapse-item title="宠物火化" name="5">
            <div>
                如今的宠物殡葬店都是采用火化的形式来处理已逝爱宠的后事，宠物店提供的是一宠一炉，而且宠主还可以在一旁进行观看，实现了真正全过程透明化的火化殡葬。
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
            <el-form-item label="殡葬师" prop="people">
              <el-select v-model="form.people" placeholder="请选择殡葬师">
                <el-option label="大Q" value="大Q"></el-option>
                <el-option label="小Q" value="小Q"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="殡葬类型" prop="package">
              <el-select v-model="form.package" placeholder="请选择殡葬套餐">
                <el-option
                  label="骨灰罐里封存"
                  value="骨灰罐里封存"
                ></el-option>
                <el-option
                  label="海葬"
                  value="海葬"
                ></el-option>
                <el-option
                  label="树葬"
                  value="树葬"
                ></el-option>
                <el-option
                  label="制作骨灰纪念饰品"
                  value="制作骨灰纪念饰品"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="殡葬时间" prop="date1">
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
          <div><i class="el-icon-dish"></i>殡葬套餐：{{ form.package }}</div>
          <div><i class="el-icon-s-check"></i>殡葬师：{{ form.people }}</div>
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
            <div>温馨提示：距服务开始24小时内取消订单会收取10%服务费，注意不要随太多物品进行火化，在上门接宠还没到之前注意先给宠物进行初步的消毒防疫。</div>
            
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
          package: [{ required: true, message: "请选择殡葬套餐", trigger: "change" }],
          people: [{ required: true, message: "请选择殡葬师", trigger: "change" }],
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