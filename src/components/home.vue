<template>
  <div class="home">
    <div class="ms-header"></div>
    <div class="ms-sidebar">
      <p>
        <router-link to="/home/all">/home/all</router-link>
      </p>
      <p>
        <router-link to="/home/sub">/home/sub</router-link>
      </p>
      <p>
        <router-link to="/home/other1">/home/other1</router-link>
      </p>
      <p>
        <router-link to="/home/other2">/home/other2</router-link>
      </p>
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
      console.log(this.axios)
    }
  }
</script>
<style scoped>
  .ms-header, .ms-sidebar, .ms-content, .ms-footer {
    position: absolute;
  }

  .ms-sidebar, .ms-content {
    top: 70px;
    bottom: 24px;
  }

  .ms-header {
    left: 0;
    right: 0;
    top: 0;
    height: 70px;
    background-color: #242f42;
  }

  .ms-sidebar {
    color: #ffffff;
    width: 200px;
    left: 0;
    background: #2E363F;
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
</style>
