<template>
  <div class="pageBox">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'right', }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'roles' }">角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-row class="addBtn">
      <el-button type="primary" plain>添加角色</el-button>
    </el-row>
    <!-- 表格 -->
    <template>
      <el-table
        stipe
        border
        :data="tableData"
        style="width: 100%">
        <!-- 开启展开行  设置type="expand"   -->
        <el-table-column
          type="expand"
          label=""
          width="50">
          <!-- 标签 -->
          <!-- closable  关闭标签      @close  关闭标签的事件 -->
          <template slot-scope="scope">
            <el-row
              v-for="item in scope.row.children"
              :key="item.id">
              <!-- 一级权限 -->
              <el-col :span="4">
                <el-tag closable @close="handelClose(scope.row,item.id)">{{item.authName}}</el-tag>
              </el-col>
              <!-- 二级权限和三级权限 -->
              <el-col :span="20">
                <el-row
                    v-for="item2 in item.children"
                    :key="item2.id">
                  <!-- 二级分类 -->
                  <el-col :span="4">
                    <el-tag closable @close="handelClose(scope.row,item2.id)">{{item2.authName}}</el-tag>
                  </el-col>
                  <!-- 三级分类 -->
                  <el-col :span="20">
                    <el-tag
                      closable
                      @close="handelClose(scope.row,item3.id)"
                      v-for="item3 in item2.children"
                      :key="item3.id">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 判断是否有数据 -->
            <el-row v-if="scope.row.children.length === 0">
              <div>不好意思,暂 无 数 据</div>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column
          prop="id"
          label="#"
          type="index"
          width="170">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="角色描述"
          width="300">
        </el-table-column>
        <el-table-column
          width="300"
          prop="address"
          label="操作">

        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
            <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
            <el-button type="info" icon="el-icon-message" plain size="mini"></el-button>
            <el-button type="warning" icon="el-icon-star-off" plain size="mini"></el-button>
            <!-- 点击按钮  把当前角色的ID传过去 -->
            <el-button type="danger" @click="handelShowRightsDialog(scope.row)" icon="el-icon-delete" plain size="mini"></el-button>
            <!-- 权限分配 -->
            <template>
              <el-dialog
                title="权限分配"
                :visible.sync="RightsDialogVisible">
                <!-- 树 -->
                <!-- default-checked-keys默认勾选的节点的 key 的数组 -->
                <!-- node-key每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 -->
                <el-tree
                  ref="tree"
                  default-expand-all
                  node-key="id"
                  :default-checked-keys="checkList"
                  :data="rightsData"
                  :props="defaultProps"
                  show-checkbox
                  v-loading="loading"
                  >
                </el-tree>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="RightsDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handelSetRoleRight">确 定</el-button>
                </span>
              </el-dialog>
            </template>
          </el-row>
        </template>
        <!-- 权限分配 -->
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      RightsDialogVisible: false,

      rightsData: [],
      // 配置选中属性
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      // 获取默认节点的ID
      checkList: [],
      loading: true,
      // 保存当前的角色ID
      currentRoleId: -1,
      tags: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 加载数据
    async loadData() {
      const res = await this.$http.get('roles');
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data;
        // console.log(this.tableData);
      }
    },
    // 显示权力分配弹出框  加载权力列表
    async handelShowRightsDialog(role) {
      console.log(role);
      this.loading = true;
      this.RightsDialogVisible = true;
      const res = await this.$http.get('rights/tree');
      this.loading = false;
      // console.log(res.data);
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg);
        this.rightsData = res.data.data;
        this.currentRoleId = role.id;
      };
      // 获取当前角色所拥有的权限ID
      var arr = [];
      role.children.forEach((element1) => {
        element1.children.forEach((element2) => {
          element2.children.forEach((element3) => {
            arr.push(element3.id);
          });
        });
      });
      console.log(arr);
      this.checkList = arr;
    },
    // 点击按钮分配权限
    async handelSetRoleRight() {
      this.RightsDialogVisible = false;
      // 获取全选的ID
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      // 获取半选的ID
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      // 拼成一个数组   concat
      var arrId = [...checkedKeys, ...halfCheckedKeys];
      // console.log(arrId.join(','))
      // 发送请求
      this.$http.post(`roles/${this.currentRoleId}/rights`, {rids: arrId.join(',')})
        .then((res) => {
          if (res.data.meta.status === 200) {
            // 成功  提示信息 加载数据
            this.loadData();
            this.$message.success(res.data.meta.msg);
          };
        });
    },
    // 关闭标签  删除角色授权  roles/:roleId/rights/:rightId   参数 当前角色ID(30)  权限ID
    async handelClose(role, rightId) {
      console.log(role);
      console.log(rightId);
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      if (res.data.meta.status === 200) {
        this.$message.error(res.data.meta.msg);
        // 重新加载数据
        role.children = res.data.data;
      }
    }
  }
};
</script>

<style>
.addBtn {
  margin: 10px 0;
}
.pageBox {
  height: 100%;
  overflow: auto;
}
</style>
