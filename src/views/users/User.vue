<template>
  <div>
        <el-main class="main">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->

          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <!-- 按钮 -->
              <el-button type="success" plain>成功按钮</el-button>
          </div>

          <!-- 表格 -->

          <el-table
            class="tableHeader"
            :data="tableData"
            border
            style="width: 100%">

            <el-table-column
              prop="id"
              label="#"
              width="30">
            </el-table-column>
            <el-table-column
              prop="username"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="电话"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="用户状态"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
            </el-table-column>
          </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchValue: '',
      tableData: [
        {
          username: '',
          mobile: '',
          email: '',
          create_time: ''
        }
      ]
    };
  }
};
</script>

<style>
.tableHeader el-table-column {
  text-align: center;
}
</style>
