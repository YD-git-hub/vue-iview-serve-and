<template>
  <div class="index">
    <Layout>
      <Header>
        <Menu
          mode="horizontal"
          theme="light"
          :active-name="topactive"
          class="meum"
        >
          <h3>xxxx平台管理</h3>
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            type="md-menu"
            size="24"
            style="margin: 0rem 1.875rem 0rem 3.125rem"
          ></Icon>
          <div class="layout-nav">
            <MenuItem
              :name="item.label"
              v-for="(item, index) in toplist"
              :key="index"
            >
              <span @click="topclick(item)" class="block">{{
                item.label
              }}</span>
            </MenuItem>
          </div>
          <div class="imy">
            <div style="cursor: pointer">HOME3</div>
          </div>
          <Dropdown @on-click="quit" trigger="click">
            <Avatar :src="avatar_img" />
            <DropdownMenu slot="list">
              <DropdownItem name="1">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Menu>
      </Header>
      <Layout>
        <Sider
          ref="side1"
          hide-trigger
          collapsible
          :collapsed-width="78"
          v-model="isCollapsed"
        >
          <Menu
            :active-name="leftactive"
            theme="light"
            width="auto"
            :class="menuitemClasses"
          >
            <MenuItem
              :name="item.name"
              v-for="(item, index) in leftlist"
              :key="index"
              @click.native="leftclick(item)"
              v-show="item.id == activeid ? 'show' : ''"
            >
              <Icon :type="item.icon" />
              <span>{{ item.label }}</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout>
          <div class="layout-header-bar">
            <Icon
              type="ios-arrow-back"
              size="30"
              @click="tag_go(2)"
              style="cursor: pointer"
            />
            <div class="layout-header-bar-tag">
              <div class="tges">
                <Tag
                  v-for="(item, index) in count"
                  :key="index"
                  :name="item.name"
                  color="primary"
                  closable
                  @on-close="handleClose2(index)"
                >
                  <router-link :to="item.path"
                    ><span @click="bread(item)">{{
                      item.name
                    }}</span></router-link
                  >
                </Tag>
              </div>
            </div>
            <Icon
              type="ios-arrow-forward"
              size="30"
              @click="tag_go(1)"
              style="cursor: pointer"
            />
          </div>
          <Content class="content">
            <div class="crumb">
              <Breadcrumb>
                <BreadcrumbItem
                  :to="item.path"
                  v-for="(item, index) in breadnav"
                  :key="index"
                >
                  <Icon type="ios-home-outline"></Icon>
                  <span @click="bread(item)">{{ item.name }}</span>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div class="setting">
              <router-view></router-view>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  // inject: ["tag_go"],
  data() {
    return {
      avatar_img: require("@/assets/images/avatar.jpg"),
      isCollapsed: false,
      count: [{ name: "HOME1", path: "/Home/index" }],
      activeid: 1,
      toplist: [
        {
          label: "HOME1",
          name: "HOME1",
          id: "1",
          to: "/Home/index",
        },
        {
          label: "HOME2",
          name: "HOME2",
          id: "2",
          to: "/Home/cliniclist",
        },
      ],
      topactive: "HOME1",
      leftactive: "HOME1",
      leftlist: [
        {
          label: "首页",
          name: "HOME1",
          icon: "md-home",
          id: "1",
          to: "/Home/index",
        },
        {
          label: "预约控件",
          name: "HOME11",
          icon: "ios-paper",
          id: "1",
          to: "/Home/business",
        },
        {
          label: "日历",
          name: "HOME2",
          icon: "ios-paper",
          id: "2",
          to: "/Home/cliniclist",
        },
      ],
      breadnav: [],
      tagpx: 0,//导航标签
    };
  },
  created() {
    if (JSON.parse(sessionStorage.getItem("count"))) {
      this.count = JSON.parse(sessionStorage.getItem("count"));
    }
    this.breadnav = this.$route.meta.breadnav;
    if (JSON.parse(sessionStorage.getItem("routername"))) {
      this.topactive = JSON.parse(
        sessionStorage.getItem("routername")
      ).topactive;
      this.leftactive = JSON.parse(
        sessionStorage.getItem("routername")
      ).leftactive;
      this.activeid = JSON.parse(sessionStorage.getItem("routername")).activeid;
    }
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  methods: {
    bread(bre) {
        if (bre.path) {
          let toparr = this.toplist.filter((item) => item.id == bre.id)[0];
          let leftarr = this.leftlist.filter((item) => item.to == bre.path)[0];
          if (toparr) {
            this.$nextTick(() => {
              this.topactive = toparr.label;
              this.activeid = toparr.id;
            });
          } else {
            let toparr = this.admin;
            this.$nextTick(() => {
              this.topactive = toparr.label;
              this.activeid = toparr.id;
            });
          }
          this.$nextTick(() => {
            this.leftactive = leftarr.name;
          })
        }
    },
    leftclick(item) {
      this.leftactive = item.name;
      this.$router.push({ path: item.to });
      sessionStorage.setItem(
        "routername",
        JSON.stringify({
          topactive: item.label,
          leftactive: item.name,
          activeid: item.id,
        })
      );
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
      this.layout_active ? this.layout_active = false : this.layout_active = true;
    },
    // tag标签
    handleClose2(index) {
      this.count.splice(index, 1);
    },
    //顶部导航
    topclick(item) {
      this.activeid = item.id;
      this.leftactive = item.name;
      this.topactive = item.label;
      this.$router.push({ path: item.to });
      sessionStorage.setItem(
        "routername",
        JSON.stringify({
          topactive: item.label,
          leftactive: item.name,
          activeid: item.id,
        })
      );
    },
    tag_go(id) {
      let tags = document.getElementsByClassName("tges")[0];
      switch (id) {
        case 1:
          if (this.tagpx == 0) return;
          this.tagpx += 44;
          tags.style.left = this.tagpx + "px";
          break;
        case 2:
          if (tags.clientWidth + this.tagpx < 78) {
            this.$Message.warning("已经到标签最后了");
            return;
          }
          this.tagpx -= 44;
          tags.style.left = this.tagpx + "px";
          break;
      }
    },
    //退出登录
    quit(name) {
      if (name == 1) {
        sessionStorage.clear();
        this.$router.push("/");
      }
    },
  },
  components: {
    // navTop,
  },
  watch: {
    $route(to) {
      this.breadnav = to.meta.breadnav;
      if (to.meta.name != undefined)
        this.count.unshift({
          name: to.meta.name,
          path: to.path,
          id: to.meta.id,
        });
      let hash = {};
      this.count = this.count.reduce((item, next) => {
        hash[next.name] ? "" : (hash[next.name] = true && item.push(next));
        return item;
      }, []);
      sessionStorage.setItem("count", JSON.stringify(this.count));
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/less/Home.less");
</style>
