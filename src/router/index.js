import Vue from 'vue'
import VueRouter from 'vue-router'
import publics from './publics'

Vue.use(VueRouter)
// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
const routes = [
  ...publics,
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, form, netx) => {
  let routs =to.path.split('/')
  console.log(routs)
  if(to.path=='/login') sessionStorage.clear()
  if (routs[1] == 'Home') {
    if(to.query.userid!=undefined){
      sessionStorage.setItem('userid',to.query.userid)
      netx()
    }else{
      let userid=sessionStorage.userid
      if (userid == null || userid == 'undefined') {
        netx('/')
      } else
        netx()
    }
  } else
    netx()
})
export default router
