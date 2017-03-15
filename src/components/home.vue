<template>
  <div class="home">
    <div class="ms-header">
      <div class="logo">国家跨境电子商务质量安全风险监测网</div>
      <div class="title">全国跨境电商追溯平台</div>
    </div>
    <div class="ms-sidebar">
      <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router @select="onSelect">
        <el-submenu index="1">
          <template slot="title"><span class="opened-title">全网跨境电商追溯系统</span></template>
          <el-menu-item index="/home/total">全网跨境电商追溯系统</el-menu-item>
          <el-menu-item index="/home/crossborder">跨境电商追溯系统</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><span class="opened-title">用户反馈情况</span></template>
          <el-menu-item index="/home/fb_total">全网跨境电商追溯系统</el-menu-item>
          <el-menu-item index="/home/fb_crossborder">跨境电商追溯系统</el-menu-item>
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
    <div class="ms-footer"></div>
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
      onSelect(index){
        console.log(index);
      }
    },
    computed: {
      onRoutes(){
        console.log(this.$route);
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
    background: #42b983;
  }

  .is-opened {
    background-color: #20AEFC
  }

  .is-opened .opened-title {
    color: white;
  }
  .el-submenu:not(.is-opened){
    background-color: #ffffff;
  }
</style>
