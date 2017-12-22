<template>
  <el-form :model="loginForm" :rules="loginFormRule" ref="loginForm" class="login-container">
    <h2 class="title">xxx后台管理系统</h2>

    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account"  placeholder="账号"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"  placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="width:100%;" @click.native="login" :loading="logining">登录</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import { auth } from '~/api'

let validateRules = {
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ]
}

export default {
  data() {
    return {
      logining: false,
      loginForm: {
        account: 'admin',
        password: '123456'
      },
      loginFormRule: validateRules
    }
  },
  methods: {

    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.logining = true
          var loginParams = Object.assign({}, this.loginForm)

          sessionStorage.setItem('user', JSON.stringify({}))
          this.$router.push({ path: '/user' })
          return

          auth.requestLogin(loginParams).then((res) => {
            this.logining = false
            let { msg, code, data } = res
            if (code === 0) {
              this.$message({
                message: '欢迎您登录，' + data.chinese_name,
                type: 'success'
              })
              sessionStorage.setItem('user', JSON.stringify(data))
              this.$router.push({ path: '/user' })
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
  .login-container {
    position: absolute;
    border-radius: 5px;
    width: 400px;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -35%);
    max-width: 90%;
    padding: 35px 35px 15px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0 0 40px 0;
      text-align: center;
      color: #505458;
    }
  }
</style>
