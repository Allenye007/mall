import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import User from '../views/users/User.vue';
Vue.use(Router);

export default new Router({
  // 设置路由   路由名字  路由地址  组件名字
  routes: [
    // 登录路由
    {name: 'login', path: '/login', component: Login},
    // 主页路由
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [
        {name: 'user', path: '/user', component: User}
      ]
    }

  ]
});
