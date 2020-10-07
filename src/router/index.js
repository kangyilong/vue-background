import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { isLogin } from 'common/js/util'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const { fullPath } = to
  if (fullPath !== '/login' && !isLogin()) {
    next({ name: 'Login' })
  }
  next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
