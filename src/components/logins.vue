<template>
  <div class="login_gight">
    <div class="title">
      <h2>欢迎登录</h2>
      <span></span>
    </div>
    <div class="form">
      <div class="content_class" style="height: 320px">
        <div class="class_from">
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
              <Input
                type="text"
                v-model="formInline.user"
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
                v-model="formInline.password"
                placeholder="请输入密码"
              >
                <Icon
                  type="ios-lock-outline"
                  slot="prepend"
                  color="#2b85e4"
                ></Icon>
              </Input>
            </FormItem>
            <FormItem prop="code">
              <Input
                type="text"
                v-model="formInline.code"
                placeholder="请输入密码"
              >
                <Icon
                  type="ios-lock-outline"
                  slot="prepend"
                  color="#2b85e4"
                ></Icon>
                <Button
                  slot="append"
                  style="width: 100px"
                >{{1111}}</Button>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')"
                >登录</Button
              >
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>没有账号?去<router-link to="/register">注册</router-link></div>
      <a @click="clickpass">忘记密码?</a>
    </div>
    <div class="goto">
      <span>账号:admin,密码:123456</span>
    </div>
  </div>
</template>

<script>
import { Login } from "@/axios/publics";
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: "",
      }, //账号登录
      ruleInline: {
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
      }, //字段验证
    };
  },
  methods: {
    //登录
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = {
            password: this.formInline.password,
            user: this.formInline.user,
          };
          Login(data).then((res) => {
            if (res.code == 1) {
              this.$Message.success(res.msg);
              sessionStorage.setItem("userid", res.data.userid);
              setTimeout(() => {
                this.$router.push({ path: "/Home/index" });
              }, 1500);
            } else this.$Message.error(res.msg);
          });
        } else {
          this.$Message.warning("请检查内容是否齐全!");
        }
      });
    },
    clickpass() {
      this.formInline = {
        user: "",
        password: "",
      };
      this.$parent.passShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/less/login.less");
</style>