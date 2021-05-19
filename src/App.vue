<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
    data(){
        return{
            tagpx: 0,//导航标签
            formInline: {
                user: "",
                password: "",
            },//账号登录
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
            },//字段验证
        }
    },
    provide(){
        return{
            tag_go:this.tag_go,
            formInline:this.formInline,
            ruleInline:this.ruleInline
        }
    },
    methods: {
    //导航tag标签
    tag_go(id) {
      let tags = document.getElementsByClassName("tges")[0];
      switch (id) {
        case 1:
          if (this.tagpx == 0) return;
          this.tagpx +=43.26;
          tags.style.left = this.tagpx + "px";
          break;
        case 2:
          if (tags.clientWidth + this.tagpx < 86.52) {
            this.$Message.warning("已经到标签最后了");
            return;
          }
          this.tagpx -= 43.26;
          tags.style.left = this.tagpx + "px";
          break;
      }
    },
  },
  computed: {},
};
</script>
<style lang="less">
@import url("./assets/less/commo.less");
</style>
