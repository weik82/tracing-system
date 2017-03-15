<template>
  <div class="ms-login-wrap">
    <div class="title"></div>
    <div class="login-form">
      <div class="wrap">
        <div class="username login-item">
          <input class="form-input" v-model="form.username" type="text" placeholder="请输入用户名">
        </div>
        <div class="password login-item">
          <input class="form-input" v-model="form.password" type="text" placeholder="请输入密码">
        </div>
        <div class="login-check login-item">
          <input type="checkbox" id="auto-login">
          <label for="auto-login">下次自动登录</label>
        </div>
        <div class="login-btn login-item">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      submitForm() {
        console.log(this.form);
        this.$router.push('/home');
        /* const self = this;
         self.$refs[formName].validate((valid) => {
         if (valid) {
         localStorage.setItem('ms_username', self.ruleForm.username);
         self.$router.push('/readme');
         } else {
         console.log('error submit!!');
         return false;
         }
         });*/
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
