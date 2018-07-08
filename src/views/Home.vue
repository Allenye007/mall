<template>
  <!-- 定义组件  在 路由导入  并设置 -->
<el-container id="container">
  <!-- 头部 -->
  <el-header class="header">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple"><img id="logo" src="../assets/img/mall_logo_0.png" alt=""></div></el-col>
        <!-- 电商管理 -->
        <el-col :span="18"><div class="grid-content bg-purple-light mid">
          <h2>博真优选</h2>
          </div></el-col>
          <!-- 推出功能 -->
        <el-col :span="2"><div class="grid-content logout-button bg-purple">
          <a href="#" @click.prevent="handelLogout">退出</a>
          </div></el-col>
      </el-row>
  </el-header>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px" class="aside">
      <!-- router 表示是否一=以index作为路由 -->
      <!-- unique-opened  表示是否只显示一个子菜单 -->
        <el-menu
          :router="true"
          :unique-opened="true"
          class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>

              <el-menu-item index="/user">
                <i class="el-icon-loading"></i>
                用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/roles"><i class="el-icon-loading"></i>角色列表</el-menu-item>
                <el-menu-item index="/rights"><i class="el-icon-loading"></i>权限列表</el-menu-item>
              </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1"><i class="el-icon-loading"></i>商品列表</el-menu-item>
                <el-menu-item index="3-2"><i class="el-icon-loading"></i>分类参数</el-menu-item>
                <el-menu-item index="3-3"><i class="el-icon-loading"></i>商品分类</el-menu-item>
              </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1"><i class="el-icon-loading"></i>订单列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1"><i class="el-icon-loading"></i>数据列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
    </el-aside>
    <!-- main -->
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    // 验证是否登录
    const token = sessionStorage.getItem('token');
    // if()
    console.log(token);
    if (!token) {
      // 如果没有token  提示信息  跳转页面
      this.$message.error('请登录！');
      this.$router.push({name: 'login'});
    }
  },
  methods: {
    handelLogout() {
      // alert(1)
      // 清除token  跳转页面
      // const token = sessionStorage.getItem('token');
      sessionStorage.clear();
      this.$router.push({name: 'login'});
    }
  }
};
</script>

<style>
#container {
  height: 100%;
}

.header {
  height: 100%;
  background-color: #b3c0d1;
}
#logo {
  display: inline-block;
  height: 60px;
}
.header .mid {
  line-height: 60px;
  text-align: center;
}
.header h2 {
  margin: 0;
}
.header .logout-button a {
  line-height: 60px;
  text-decoration: none;
  color: rgb(22, 51, 51);
}
.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  /* height: 100%; */
}
/* 搜索框 */
.el-input {
  width: 300px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
