<template>
  <div class="home">
    <div class="ms-header">
      <div class="logo">国家跨境电子商务质量安全风险监测网</div>
      <div class="title">进出口追溯平台 <span class="exit" @click="exitLogin">退出</span></div>
    </div>
    <div class="ms-sidebar">
      <el-menu :default-active="onRoutes" @select="selectedItem" class="el-menu-vertical-demo" unique-opened>
        <!--router-->
        <el-submenu index="1">
          <template slot="title"><span class="opened-title">全网追溯系统</span></template>
          <el-menu-item index="/home/trace">全网追溯系统</el-menu-item>
          <el-menu-item index="/home/crossborder/1">进出口产品追溯监管系统</el-menu-item>
          <el-menu-item index="/home/progressing">宁波进口商品溯源系统</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><span class="opened-title">用户反馈情况</span></template>
          <el-menu-item index="/home/fb_total">全网追溯系统</el-menu-item>
          <el-menu-item index="/home/fb_crossborder/1">进出口产品追溯监管系统</el-menu-item>
          <el-menu-item index="/home/fb_crossborder/2">宁波进口商品溯源系统</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><span class="opened-title">商品召回系统</span></template>
          <el-menu-item index="/home/releaserecall">发布召回</el-menu-item>
          <el-menu-item index="/home/recallhistory">召回历史</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="ms-content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="ms-footer">
      国家跨境电子商务质量安全风险监测网
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
    mounted(){
    },
    methods: {
      selectedItem(index){
        console.log(index);
        if (index == this.$route.path) {
          this.$router.replace({path: index, reload: true, query: {reload: new Date().getTime()}});
        } else {
          this.$router.push({path: index})
        }
      },
      exitLogin(){
        window.localStorage.setItem('ts_login_status',0);
        this.$router.push({path: '/login'})
      }
    },
    computed: {
      onRoutes(){
        return this.$route.path;
      }
    }
  }
</script>
<style scoped>
  .home {
    background-color: #EAEAEA;
  }

  .ms-header, .ms-sidebar, .ms-content, .ms-footer {
    position: absolute;
  }

  .ms-sidebar, .ms-content {
    top: 90px;
    bottom: 24px;
  }

  .ms-header {
    color: #fff;
    left: 0;
    right: 0;
    top: 0;
    height: 90px;
    background: url("../../static/image/header-bg.png") center/100% auto no-repeat;
  }

  .ms-header > div {
    height: 45px;
    line-height: 45px;
    margin-left: 10px;
    letter-spacing: .2em;
  }

  .ms-header > .logo {
    font-size: 26px;
    font-weight: bold;
    padding-left: 45px;
    background: url("../../static/image/logo.png") left center/38px 38px no-repeat;
  }

  .ms-header > .title {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ms-header > .title > .exit {
    font-size: 15px;
    cursor: pointer;
    padding-right: 20px;
    text-decoration: underline;
  }

  .ms-sidebar {
    padding-top: 24px;
    color: #fff;
    width: 200px;
    left: 0;
    background: #fff;
  }

  .ms-content {
    left: 200px;
    right: 0;
  }

  .ms-footer {
    height: 24px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #444;
    color: #efefef;
    text-align: center;
    line-height: 24px;
    font-size: 14px;
  }

  .is-opened {
    background-color: #20AEFC
  }

  .is-opened .opened-title {
    color: white;
  }

  .el-submenu:not(.is-opened) {
    background-color: #ffffff;
  }
</style>
