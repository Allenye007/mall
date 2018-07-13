import Vue from 'vue';
import Router from 'vue-router';
// 思路：设置组件（并导出）  在路由文件导入，并在定义路由规则
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import User from '../views/users/User.vue';
import Right from '../views/roles/Rights.vue';
import Roles from '../views/roles/roles.vue';
import Category from '../views/goods/Category.vue';
// 引入全局的消息提示信息
import { Message } from 'element-ui';
Vue.use(Router);
// 设置路由对象
const router = new Router({
  // 设置路由   路由名字  路由地址  组件名字
  routes: [
    // 登录路由
    {name: 'login', path: '/login', component: Login},
    // 主页路由
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {name: 'user', path: '/users', component: User},
        // 权限列表
        {
          name: 'right',
          path: '/rights',
          component: Right
        },
        // 角色列表
        {
          name: 'roles',
          path: '/roles',
          component: Roles
        },
        // 商品分类
        {
          name: 'categories',
          path: '/categories',
          component: Category
        }
      ]
    }
  ]
});
// 设置路由前置守卫
router.beforeEach((to, from, next) => {
  // to 来时的路由   from 去哪里的路由
  // console.log(to, from);
  // 判断path  如果是登录就不验证token
  if (to.name === 'login') {
    next();// next  是向下执行
  } else {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // 如果没有携带token 返回登录页面
      router.push({name: 'login'});
      // 提示信息
      Message.warning('请登录');
      return;
    }
    // 继续向下执行
    next();
  }
});
export default router;
