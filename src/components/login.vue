<template>
  <div class="ms-login-wrap">
    <div class="title"></div>
    <div class="login-form">
      <div class="wrap">
        <div class="username login-item">
          <input class="form-input" v-model="form.username" type="text" placeholder="请输入用户名">
        </div>
        <div class="password login-item">
          <input class="form-input" v-model="form.password" type="password" placeholder="请输入密码">
        </div>
        <div class="login-check login-item">
          <input type="checkbox" id="auto-login" v-model="autoLogin">
          <label for="auto-login">下次自动登录</label>
        </div>
        <div class="login-btn login-item">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>用户名或密码错误!</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as types from '../store/types'
  export default {
    data(){
      return {
        autoLogin: false,
        dialogVisible: false,
        form: {
          username: '',
          password: ''
        }
      }
    },
    created(){
      if (window.localStorage.getItem('auto_login')) {
        this.autoLogin = true;
        this.form.username = window.localStorage.getItem('ts_username');
        this.form.password = window.localStorage.getItem('ts_password');
      }
    },
    methods: {
      submitForm() {
        console.log('submit');
        if (this.form.username != 'admin' || this.form.password != 'admin') {
          this.dialogVisible = true;
          return false;
        }
        this.$store.commit(types.USER_LOGIN, {token: 'true'});
        window.localStorage.setItem('ts_token', 'true');
        window.localStorage.setItem('ts_login_status', 1);
        if (this.autoLogin == true) {
          window.localStorage.setItem('ts_username', this.form.username);
          window.localStorage.setItem('ts_password', this.form.password);
          window.localStorage.setItem('auto_login', true);
        } else {
          window.localStorage.removeItem('auto_login');
          window.localStorage.removeItem('ts_username');
          window.localStorage.removeItem('ts_password');
        }
        let redirect = decodeURIComponent(this.$route.query.redirect || '/home');
        this.$router.push({path: redirect});
      }
    },
    mounted(){
      if (this.autoLogin && window.localStorage.getItem('ts_login_status') == 1) {
        this.submitForm();
      }
    }
  }
</script>
<style scoped>
  .ms-login-wrap {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: url("../../static/image/login-bg.png") center/cover no-repeat;
  }

  .ms-login-wrap > .title {
    margin-top: 50px;
    padding-top: 6%;
    background: url("../../static/image/title.png") center/60% auto no-repeat;
  }

  .ms-login-wrap > .login-form {
    background: url("../../static/image/form.png") center/100% no-repeat;
    position: absolute;
    width: 420px;
    height: 400px;
    right: 10%;
    bottom: 10%;
  }

  .ms-login-wrap > .login-form > .wrap {
    position: absolute;
    width: 274px;
    height: auto;
    left: 50%;
    margin-left: -137px;
    top: 120px;
  }

  .username, .password {
    padding-left: 65px;
  }

  .login-item {
    height: 36px;
    line-height: 36px;
  }

  .login-check {
    color: #fff;
    display: flex;
    align-items: center;
    margin-top: 10px;
    padding-left: 15px;
  }

  .username {
    margin: 16px 0 0;
  }

  .password {
    margin: 25px 0 0
  }

  .form-input {
    width: 100%;
    height: 36px;
    line-height: 36px;
    border: none;
    outline: none;
  }

  .login-btn {
    margin-top: 10px;
    text-align: center;
  }

  .login-btn > button {
    width: 100%
  }
</style>
