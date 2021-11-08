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
        }
    },
    provide(){
        return{
            tag_go:this.tag_go,
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

</style>
