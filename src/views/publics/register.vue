<template>
  <div class="register">
    <main class="mian">
      <div class="content">
        <Tabs :value="Tabsname">
          <TabPane label="微信快速注册" icon="ios-chatbubbles" name="name1">
            <div
              class="content_class"
              style="height:400px;"
            >
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
            <div
              class="content_class"
              style="height:400px;"
              v-show="status == 2"
            >
              <div class="class_from">
                <Form
                  ref="wxformCustom"
                  :model="wxformCustom"
                  :rules="wxruleCustom"
                >
                  <FormItem prop="phoneNumber">
                    <Input
                      v-model="wxformCustom.phoneNumber"
                      type="tel"
                      placeholder="请输入手机号"
                    >
                      <span slot="prepend">+86</span>
                      <Button
                        slot="append"
                        @click="wxauthcode"
                        :disabled="wxsmsShow"
                        >{{
                          wxsmsShow == false ? wxsmsnum : wxsmsnum + "秒"
                        }}</Button
                      >
                    </Input>
                  </FormItem>
                  <FormItem prop="cation">
                    <Input
                      v-model="wxformCustom.cation"
                      placeholder="请输入验证码"
                    ></Input>
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      style="width:100%"
                      @click="handleSubmit('wxformCustom', 2)"
                      >同意条款并注册</Button
                    >
                  </FormItem>
                </Form>
                <Radio v-model="single"
                  ><a @click="protocol = true">《塘塘云用户注册协议》</a></Radio
                >
              </div>
            </div>
            <div class="class_footer">
              <router-link to="/ttclinic/login"
                ><span>快速登录</span></router-link
              >
            </div>
          </TabPane>
          <TabPane label="账号密码注册" icon="ios-contact" name="name2">
            <div class="content_class" style="height:400px;">
              <div class="class_from">
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
                  <FormItem prop="name">
                    <Input
                      v-model="formCustom.name"
                      placeholder="请输入账号"
                    ></Input>
                  </FormItem>
                  <FormItem prop="passwd">
                    <Input
                      type="password"
                      v-model="formCustom.passwd"
                      placeholder="请输入密码"
                    ></Input>
                  </FormItem>
                  <FormItem prop="passwdCheck">
                    <Input
                      type="password"
                      v-model="formCustom.passwdCheck"
                      placeholder="请确认密码"
                    ></Input>
                  </FormItem>
                  <FormItem prop="phoneNumber">
                    <Input
                      v-model="formCustom.phoneNumber"
                      type="tel"
                      placeholder="请输入手机号"
                    >
                      <span slot="prepend">+86</span>
                      <Button
                        slot="append"
                        @click="authcode"
                        :disabled="smsShow"
                        >{{ smsShow == false ? smsnum : smsnum + "秒" }}</Button
                      >
                    </Input>
                  </FormItem>
                  <FormItem prop="cation">
                    <Input
                      v-model="formCustom.cation"
                      placeholder="请输入验证码"
                    ></Input>
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      style="width:100%"
                      @click="handleSubmit('formCustom', 1)"
                      >同意条款并注册</Button
                    >
                  </FormItem>
                </Form>
                <Radio v-model="single"
                  ><a @click="protocol = true">《xxxxx注册协议》</a></Radio
                >
              </div>
            </div>
            <div class="class_footer">
              <router-link to="/"
                ><span>快速登录</span></router-link
              >
            </div>
          </TabPane>
        </Tabs>
      </div>
      <!-- 注册协议 -->
      <Modal
        v-model="protocol"
        width="360"
        @on-ok="protocolok"
        @on-cancel="protocolcancel"
        :closable="false"
        :mask-closable="false"
      >
        <p slot="header" style="color:#2d8cf0;text-align:center">
          <span>xxxxx用户协议</span>
        </p>
        <p style="height:400px;overflow: hidden;overflow-y: scroll;">
         xxxxxxxx
        </p>
      </Modal>
    </main>
  </div>
</template>

<script>
import wxlogin from "vue-wxlogin";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码!"));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次确认密码!"));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error("二次输入密码不匹配!"));
      } else {
        callback();
      }
    };
    const validatephoneNumber = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入手机号!"));
      else callback();
    };
    const validatename = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入账号!"));
      else callback();
    };
    const validatecation = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入验证码!"));
      else callback();
    };
    const wxvalidatecation = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入验证码!"));
      else callback();
    };
    const wxvalidatephoneNumber = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入手机号!"));
      else callback();
    };
    return {
      formCustom: {
        passwd: "",
        passwdCheck: "",
        name: "",
        phoneNumber: "", //手机号
        cation: "", //验证码
      },
      ruleCustom: {
        name: [{ validator: validatename, trigger: "blur" }],
        phoneNumber: [{ validator: validatephoneNumber, trigger: "blur" }],
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        cation: [{ validator: validatecation, trigger: "blur" }],
      },
      //微信绑定手机号
      wxformCustom: {
        phoneNumber: "", //手机号
        cation: "", //验证码
      },
      wxruleCustom: {
        phoneNumber: [{ validator: wxvalidatephoneNumber, trigger: "blur" }],
        cation: [{ validator: wxvalidatecation, trigger: "blur" }],
      },
      single: false,
      smsnum: "发送验证码",
      wxsmsnum: "发送验证码",
      smsShow: false,
      wxsmsShow: false,
      Tabsname: "name2",
      protocol: false,
    };
  },
  created() {
  },
  methods: {
    //注册
    handleSubmit(name, id) {
      switch (id) {
        case 1:
          this.$refs[name].validate((valid) => {
            if (valid) {
              if (this.single) {
                this.$Message.success('注册成功');
                setTimeout(() => {
                  this.$router.push({
                    path: "/login",
                  });
                }, 1000);
              } else {
                this.$Message.warning("请勾选注册协议!");
              }
            } else {
              this.$Message.warning("请检查内容是否齐全!");
            }
          });
          break;
        //微信注册
        case 2:
          this.$refs[name].validate((valid) => {
            if (valid) {
              if (this.single) {
                 this.$Message.success('注册成功');
                setTimeout(() => {
                  this.$router.push({
                    path: "/login",
                  });
                }, 1000);
              } else {
                this.$Message.warning("请勾选注册协议!");
              }
            } else {
              this.$Message.warning("请检查内容是否齐全!");
            }
          });
          break;
      }
    },
    //清空
    // handleReset(name) {
    //   this.$refs[name].resetFields();
    // },
    //验证码
    authcode() {
      let data = {
        tel: this.formCustom.phoneNumber,
      };
      if (data.tel != "") {
        this.$Message.success('验证码为123456');
      } else {
        this.$Message.warning("电话号码为空!");
      }
    },
    //微信验证码
    wxauthcode() {
      let data = {
        tel: this.wxformCustom.phoneNumber,
      };
      if (data.tel != "") {
        this.$Message.success('验证码为123456');
      } else {
        this.$Message.warning("电话号码为空!");
      } 
    },
    //协议
    protocolok() {
      this.single = true;
    },
    protocolcancel() {
      this.single = false;
    },
  },
  components: {
    wxlogin,
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin.less");
.register{
  height: 100%;
  background:url("../../assets/images/login_img.png") no-repeat;
  background-size: 100% 100%;
}
.mian {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center
}
.content {
  .bgcolor();
  width: 34%;
  padding-top: 30px;
  border-radius: 6px;
  .content_class {
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .wxlong {
      display: flex;
    }
    // .class_img {
    //   width: 80px;
    //   height: 80px;
    //   display: flex;
    //   flex-direction: column;
    //   align-items: center;
    //   font-weight: bold;
    //   img {
    //     width: 50px;
    //     height: 50px;
    //   }
    // }
    .class_from {
      width: 50%;
      text-align: center;
    }
  }
  .class_footer {
    text-align: center;
    line-height: 50px;
    font-weight: bold;
    .color();
  }
}
/deep/ .ivu-tabs-nav {
  width: 100%;
  text-align: center;
  color: #fff;
  .ivu-tabs-tab {
    width: 50%;
  }
}
.impowerBox .title {
  display: none;
}

.impowerBox .status.status_browser {
  display: none;
}

.impowerBox .qrcode {
  border: none;
  margin-top: 100px;
  width: 200px;
  height: 200px;
}

.impowerBox .status {
  display: none;
}
</style>
