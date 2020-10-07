export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    children: [{
      path: '/system/role',
      component: () => import('@/views/system/role/role')
    }, {
      path: '*',
      component: () => import('@/views/public/welcome')
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login')
  }
]
