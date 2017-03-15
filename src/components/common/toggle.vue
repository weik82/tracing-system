<template>
  <div class="content-wrap">
    <div class="ms-toggle">
      <span class="ms-toggle-item" :class="{ 'is-active': isActive == 1}" @click="toggleItem(1)">总体情况</span>
      <span class="ms-toggle-item" :class="{ 'is-active': isActive == 2}" @click="toggleItem(2)">企业信息</span>
      <span class="ms-toggle-item" :class="{ 'is-active': isActive == 3}" @click="toggleItem(3)">产品信息</span>
      <span class="ms-toggle-item" :class="{ 'is-active': isActive == 4}" @click="toggleItem(4)">报检信息</span>
      <span class="ms-toggle-item" :class="{ 'is-active': isActive == 5}" @click="toggleItem(5)">扫描统计</span>
      <span class="ms-toggle-item" :class="{ 'is-active': isActive == 6}" @click="toggleItem(6)">异常预警</span>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        isActive: 1
      }
    },
    methods: {
      toggleItem(index){
        this.isActive = index;
      }
    },
    mounted(){
      console.log(this.$route)
    }
  }
</script>
<style scoped>
  .content-wrap {
    width: 100%;
    min-height: 100%;
  }

  .ms-toggle {
    height: 40px;
    padding: 0 50px;
    background-color: #E0E0E0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ms-toggle > .ms-toggle-item {
    flex: 1;
    height: 40px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }

  .ms-toggle > .ms-toggle-item.is-active {
    background-color: #fff;
  }
</style>
