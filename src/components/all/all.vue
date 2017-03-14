<template>
  <div>
    <router-link to="/home/all/tab1">/home/all/tab1</router-link>
    <router-link to="/home/all/tab2">/home/all/tab2</router-link>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
  export default {
    mounted(){
      console.log(this.$route)
    }
  }
</script>
