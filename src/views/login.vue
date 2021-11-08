<template>
  <div class="login">
    <!-- 登录 -->
    <Logins v-show="passShow"></Logins>
    <!-- 忘记密码 -->
    <Find v-show="!passShow"></Find>
  </div>
</template>

<script>
import Logins from "@/components/logins";
import Find from "@/components/find";
export default {
  data() {
    return {
      passShow:true,
    };
  },
  components: {
    Logins,
    Find
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: space-between;
  background:url("../assets/images/login_img.png") no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}
</style>
