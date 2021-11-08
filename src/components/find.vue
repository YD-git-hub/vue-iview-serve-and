<template>
    <div class="login_gight">
      <div class="title">
        <h2>忘记密码</h2>
        <span></span>
      </div>
      <div class="form">
        <div class="content_class" style="height: 320px">
          <div class="class_from">
            <Form ref="retrieve" :model="retrieve" :rules="retrieveline">
              <FormItem prop="user">
                <Input
                  type="text"
                  v-model="retrieve.user"
                  placeholder="请输入账号"
                >
                  <Icon
                    type="ios-person-outline"
                    slot="prepend"
                    color="#2b85e4"
                  ></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input
                  type="password"
                  v-model="retrieve.password"
                  placeholder="请输入新密码"
                >
                  <Icon
                    type="ios-lock-outline"
                    slot="prepend"
                    color="#2b85e4"
                  ></Icon>
                </Input>
              </FormItem>
              <FormItem prop="phoneNumber">
                <Input
                  v-model="retrieve.phoneNumber"
                  type="tel"
                  placeholder="请输入手机号"
                >
                  <span slot="prepend">+86</span>
                  <Button
                    slot="append"
                    @click="authcode"
                    :disabled="codeShow"
                    style="width: 100px"
                    >{{
                      codeShow == false ? codemsnum : codemsnum + "秒"
                    }}</Button
                  >
                </Input>
              </FormItem>
              <FormItem prop="cation">
                <Input
                  v-model="retrieve.cation"
                  placeholder="请输入验证码"
                ></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="retrieveSubmit('retrieve')"
                  >找回密码</Button
                >
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
      <div class="goto">
        <div>已有账号?去<a @click="clickpass">登录</a></div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      retrieve: {
        user: "",
        password: "",
        phoneNumber: "",
        cation: "",
      },
      retrieveline: {
        user: [
          {
            required: true,
            message: "请输入账号!",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码!",
            trigger: "blur",
          },
        ],
        phoneNumber: [
          {
            required: true,
            message: "请输入手机号!",
            trigger: "blur",
          },
        ],
        cation: [
          {
            required: true,
            message: "请输入验证码!",
            trigger: "blur",
          },
        ],
      },
      codemsnum: "发送验证码",
      codeShow: false,
      codedate: "",
    };
  },
  methods: {
    //忘记密码
    retrieveSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.retrieve.cation == "123456") {
            this.$Message.success("修改成功");
          } else this.$Message.error("验证码错误");
        } else {
          this.$Message.warning("请检查内容是否齐全!");
        }
      });
    },
    //发送验证码
    authcode() {
      let data = {
        tel: this.retrieve.phoneNumber,
      };
      if (data.tel != "") {
        this.$Message.success("验证码为123456");
      } else {
        this.$Message.warning("电话号码为空!");
      }
    },
    clickpass() {
      clearInterval(this.codedate);
      this.retrieve = {
        user: "",
        password: "",
        phoneNumber: "",
        cation: "",
      };
      this.codemsnum = "发送验证码";
      this.codeShow = false;
      this.$parent.passShow = true;
    },
  },
  beforeDestroy() {
    clearInterval(this.codedate);
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/less/login.less");
</style>