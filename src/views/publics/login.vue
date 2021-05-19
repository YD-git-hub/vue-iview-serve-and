<template>
  <div class="login">
    <!-- 左边 -->
    <!-- <div class="login_left">
      <router-link to="/"><img src="xxxxx" /></router-link>
      <h3>XXXXXXXXXXX</h3>
      <Button type="primary">了解更多</Button>
      <div>
        <span>XXXXXXXX网络科技有限公司 2021 沪ICP备XXXXXXXX号-X</span>
      </div>
    </div> -->
    <!-- 右边 -->
    <div class="login_gight" v-show="passShow">
      <div class="title">
        <h2>欢迎登录</h2>
        <span></span>
      </div>
      <div class="form">
        <Tabs value="name2">
          <TabPane label="微信快速登录" icon="ios-chatbubbles" name="name1">
            <div class="content_class" style="height:320px;">
              <wxlogin
                :appid="'wxb0d5108b38499863'"
                :scope="'snsapi_login'"
                :theme="'black'"
                :redirect_uri="
                  encodeURIComponent(
                    `xxxxxx`
                  )
                "
                :href="
                  'data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlIHsKICBkaXNwbGF5OiBub25lOwp9CgouaW1wb3dlckJveCAuc3RhdHVzLnN0YXR1c19icm93c2VyIHsKICBkaXNwbGF5OiBub25lOwp9CgouaW1wb3dlckJveCAucXJjb2RlIHsKICBib3JkZXI6IG5vbmU7CiAgbWFyZ2luLXRvcDogMTAwcHg7CiAgd2lkdGg6IDIwMHB4OwogIGhlaWdodDogMjAwcHg7Cn0KCi5pbXBvd2VyQm94IC5zdGF0dXMgewogIGRpc3BsYXk6IG5vbmU7Cn0='
                "
                rel="external nofollow"
              >
              </wxlogin>
            </div>
          </TabPane>
          <TabPane label="账号密码登录" icon="ios-contact" name="name2">
            <div class="content_class" style="height:320px;">
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
                  <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')"
                      >登录</Button
                    >
                  </FormItem>
                </Form>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div class="footer">
        <div>没有账号?去<router-link to="/register">注册</router-link></div>
        <a @click="clickpass(1)">忘记密码?</a>
      </div>
      <div class="goto">
        <!-- <router-link to="/ttmanage/login">平台管理端</router-link> -->
        <span>账号:admin,密码:123456</span>
      </div>
    </div>
    <!-- 忘记密码 -->
    <div class="login_gight" v-show="!passShow">
      <div class="title">
        <h2>忘记密码</h2>
        <span></span>
      </div>
      <div class="form">
        <div class="content_class" style="height:320px;">
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
                        style="width:100px;"
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
        <div>已有账号?去<a @click="clickpass(2)">登录</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import wxlogin from "vue-wxlogin";
import {Login} from '@/axios/publics';
export default {
  inject:['formInline','ruleInline'],
  data() {
    return {
      formInline:this.formInline,
      ruleInline:this.ruleInline,
      retrieve:{
        user: "",
        password: "",
        phoneNumber:"",
        cation:'',
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
      codemsnum:"发送验证码",
      codeShow:false,
      passShow:true,
      codedate:''
    };
  },
  components: {
    wxlogin,
  },
  methods: {
    //登录
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data={
            password:this.formInline.password,
            user:this.formInline.user,
          }
          Login(data).then(res=>{
            if(res.code==1){
            this.$Message.success(res.msg);
            sessionStorage.setItem("userid",res.data.userid)
            setTimeout(() => {
               this.$router.push({ path: "/Home/index" });
            }, 1500);
            }else  this.$Message.error(res.msg);
          })
        } else {
          this.$Message.warning("请检查内容是否齐全!");
        }
      });
    },
    //忘记密码
    retrieveSubmit(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.retrieve.cation=='123456'){
            this.$Message.success("修改成功");
            this.passShow=true
          }else this.$Message.error("验证码错误");
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
        this.$Message.success('验证码为123456');
      } else {
        this.$Message.warning("电话号码为空!");
      }
    },
    clickpass(id){
      switch(id){
        case 1:
          this.passShow=false
          this.retrieve={
                user: "",
                password: "",
                phoneNumber:"",
                cation:'',
          }
          break;
        case 2:
          clearInterval(this.codedate)
          this.codemsnum = "发送验证码";
          this.codeShow = false;
          this.passShow=true
          break;
      }
    }
  },
  beforeDestroy(){
    clearInterval(this.codedate)
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/login.less");
</style>
