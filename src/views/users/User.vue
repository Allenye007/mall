<template>
  <div>
        <el-main class="main">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->

          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handelSearch"></el-button>
            </el-input>
            <!-- 按钮 -->
              <el-button type="success" plain @click="dialogVisible=true">添加</el-button>
              <!-- <template>
                <el-button type="success" plain @click="dialogVisible=true">添加</el-button>
              </template> -->
      <!-- 添加用户 -->
              <el-dialog
                @closed="closeDialogBox"
                title="添加用户"
                :visible.sync="dialogVisible"
                width="45%"
                class="dialog-table">
                <el-form label-position="right" label-width="120px" :model="form" :rules="formRules">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username"  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码"  prop="password">
                        <el-input v-model="form.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email" ></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.mobile" ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="userFormVisible">确 定</el-button>
                </div>
              </el-dialog>

          </div>

          <!-- 表格 -->

          <el-table
            v-loading="loading"
            class="tableHeader"
            :data="tableData"
            border
            stripe
            highlight-current-row
            style="width: 100%">

            <el-table-column
              prop="id"
              label="#"
              width="80">
            </el-table-column>
            <el-table-column
              prop="username"
              label="姓名"
              width="160">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
               width="180">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="电话"
              width="160">
            </el-table-column>

            <el-table-column
              prop="create_time"
              label="日期"
              width="200">
              <template slot-scope="scope">
                <!-- 时间格式 -->
                {{scope.row.create_time | fmtdata('MMM Do YY')}}
              </template>
            </el-table-column>
      <!-- 用户状态 -->
      <!-- 把用户的ID 和状态传过去 -->
            <el-table-column
              label="用户状态"
              width="85">
              <template slot-scope="scope">
                <el-switch
                  @change="changeState(scope.row)"
                  v-model="scope.row.mg_state"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
      <!-- 编辑 -->
                <el-button size="mini" plain type="primary" icon="el-icon-edit" @click="handelEditId(scope.row.id)"></el-button>

                <el-dialog
                title="修改用户"
                :visible.sync="editVisible"
                width="45%"
                class="dialog-table">
                <el-form label-position="right" label-width="120px" :model="formEdit" :rules="formRules">
                  <!-- 表单验证 -->
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="formEdit.username"  :disabled="true" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="formEdit.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="formEdit.mobile" ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handelEdit(formEdit.id)">确 定</el-button>
                </div>
              </el-dialog>

      <!-- 分配角色 -->
                <el-button size="mini" plain type="success" @click="handelShowChangeRole(scope.row)" icon="el-icon-check"></el-button>

                <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="当前用户" >
                      <!-- <el-input v-model="form.username" auto-complete="off"></el-input> -->
                      {{currentUserName}}
                    </el-form-item>
                    <el-form-item label="选择角色" >
                      <el-select v-model="currentRoleId" placeholder="请选择角色">
                        <!-- currentRoleId  与  value的值一致时  显示该option -->
                        <el-option disabled label="请选择" :value="-1"></el-option>
                        <el-option
                          v-for="item in roles"
                          :key="item.id"
                          :label="item.roleName"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handelChangeRole">确 定</el-button>
                  </div>
                </el-dialog>

      <!-- 删除 -->
                <el-button size="mini" plain type="danger" icon="el-icon-delete" @click="handelDelete(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
    <!-- 分  页 -->
          <template>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagenum"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </template>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 添加绑定的数据
      form: {},
      // 编辑绑定的数据
      formEdit: {
        username: '',
        email: '',
        mobile: ''
      },
      editVisible: false,
      dialogVisible: false,
      // mg_state: true,
      searchValue: '',
      tableData: [],
      // 数据没有加载前true，加载完毕false
      loading: true,
      // 当前页------------分页--------------
      pagenum: 1,
      // 当前页码
      // currentPage: 2,
      // 每页显示条数
      pagesize: 5,
      // 总条数
      total: 50,
      // -----------------表单验证--------------------
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      // ------------------- 角色分配 --
      dialogFormVisible: false,
      currentUserName: '',
      currentRoleId: -1,
      // currentRoleId: -1,
      roles: []
      // dialogFormVisible: false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 获取数据信息  渲染列表
    async loadData() {
      // 发送请求时  显示加载样式， 发送请求后隐藏加载样式
      this.loading = true;
      // // 获取token
      // const token = sessionStorage.getItem('token');
      // // 在请求头中设置  token
      // this.$http.defaults.headers.common['Authorization'] = token;

      const params = {pagesize: this.pagesize, pagenum: this.pagenum, query: this.searchValue};
      // 发送请求
      const res = await this.$http.get('users', { params });
      // const res = await this.$http.get('users?pagenum=1&pagesize=10');
      this.loading = false;
      console.log(res.data);
      // data = res.data;
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        const { data: { users } } = res.data;
        console.log(users);
        // users是一个数组
        this.tableData = users;
        // 总页数
        this.total = res.data.data.total;
        // 当前页
        this.pagenum = res.data.data.pagenum;
        console.log(msg);
      }
    },
    // 添加操作
    userFormVisible() {
      // alert(1);
      // console.log(this.form);
      this.$http
        .post('users', this.form)
        .then((res) => {
          // console.log(res.data);
          if (res.data.meta.status === 201) {
            // 如果添加成功 => 提示信息  关闭弹出框
            this.$message.success(res.data.meta.msg);
            // 关闭弹出框
            this.dialogVisible = false;
            // 刷新页面  调用一下  this.loadData();   重新获取数据
            this.loadData();
            // 遍历对象  清空文本框
            // for (const k in this.searchValue) {
            //   this.searchValue[k] = '';
            // }
            // for (let key in this.formData) {
            //   this.formData[key] = '';
            // }
          }
        });
    },
    // 删除操作
    async handelDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定之后
        const res = await this.$http.delete(`users/${id}`);
        console.log(res);
        // const {data.status} = res.data;
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg);
          // 重新获取数据
          this.loadData();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      // alert(id);
    },
    // 编辑操作
    async handelEdit(id) {
      // 拿到渲染弹出框的ID
      // console.log(id);
      const params = this.formEdit;
      console.log(this.formEdit);
      const res = await this.$http.put(`users/${id}`, params);
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg);
        this.loadData();
        this.editVisible = false;
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },
    //  根据ID查询  并渲染编辑弹出框
    handelEditId(id) {
      // 点击跳出弹出框
      this.editVisible = true;
      this.$http.get(`users/${id}`)
        .then((res) => {
          if (res.data.meta.status === 200) {
            //  渲染弹出框
            // console.log(res.data.data);
            this.formEdit = res.data.data;
            // console.log(this.formEdit);
          } else {
            this.$message.error(res.data.meta.msg);
          }
        });
    },
    // 搜索功能
    async handelSearch() {
      // 需要传上查询参数 searchValue的值  （query）
      this.loadData();
    },
    // 修改用户状态
    async changeState(userState) {
      // console.log(userState)
      const res = await this.$http.put(`users/${userState.id}/state/${userState.mg_state}`);
      console.log(res);
      const data = res.data;
      const {meta: {msg, status}} = data;
      if (status === 200) {
        this.$message.success(msg);
      }
    },
    // 每页显示的条数
    handleSizeChange(val) {
      // alert(val+'handleSizeChange');
      // 每页显示的条数
      this.pagesize = val;
      this.loadData();
    },
    // 改变页码
    handleCurrentChange(val) {
      // alert(val+'handleCurrentChange');
      // 改变页码
      this.pagenum = val;
      this.loadData();
    },
    // 关闭弹出框
    closeDialogBox() {
      // alert(1)
      for (let key in this.form) {
        this.form[key] = '';
      };
    },
    // 分配角色    功能： 点击按钮 渲染弹出框（用户名，角色）， 并发送请求获取所有角色-------------------
    async handelShowChangeRole(user) {
      this.dialogFormVisible = true;
      this.currentUserName = user.username;
      const res = await this.$http.get('roles');
      // console.log(res.data);
      // const data = res.data;
      const {meta: {status}} = res.data;
      if (status === 200) {
        // alert(1)
        // 显示所有的校色
        this.roles = res.data.data;
        // 根据ID查询  改用户所对应的校色
        const response = await this.$http.get(`users/${user.id}`);
        // console.log(response);
        this.currentRoleId = response.data.data.rid;
        this.currentUserId = response.data.data.id;
        // console.log(this.currentRoleId);
      };
    },
    // 更改角色
    async handelChangeRole() {
      // alert(1)
      // console.log(this.currentUserId);
      const res = await this.$http.put(`users/${this.currentUserId}/role`, {rid: this.currentRoleId});
      if (res.data.meta.status === 200) {
        this.$message.success('修改成功');
        this.dialogFormVisible = false;
        // 重置弹出框内容
        this.currentRoleId = -1;
        this.currentUserName = '';
      } else {
        this.$message.success('修改失败');
      }
    }

  }
};
</script>

<style>
.tableHeader el-table-column {
  text-align: center;
}
.dialog-table {
  width: 100%;
}
</style>
