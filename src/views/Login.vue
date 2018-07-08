<template>
<div class="login-wrap">
  <el-form class="login-form" :model="formData" label-width="100px">
    <el-form-item label="账号" prop="pass">
      <el-input type="text" v-model="formData.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="checkPass">
      <el-input type="password" v-model="formData.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button  type="primary" @click.prevent="handelLogin()" id="login-btn">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm2: '',
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    handelLogin () {
      this.$http
        .post('login', this.formData)
        .then((res) => {
          const data = res.data;
          const {meta: {status, msg}} = data;
          if (status === 200) {
            // 登录成功  提示信息  设置token 跳转页面
            // alert(msg);
            this.$message.success(msg);
            // 记录takoen
            const {data: {token}} = res.data;
            // 需要查看返回的数据结构
            // console.log(token);
            sessionStorage.setItem('token', token);
            // 登录成功跳转到主页
            this.$router.push({name: 'home'});
            this.$message.success(msg);
          } else {
            this.$message.error(msg);
          }
        });
    }
  }
};

</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-from {
  width: 100%;
}
#login-btn {
  width: 100%;
}
</style>
