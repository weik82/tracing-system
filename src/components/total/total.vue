<template>
  <div class="outer-content-wrap">
    <div class="ms-toggle">
      <span class="ms-toggle-item" :class="{ 'is-active': isActive == 1}" @click="toggleItem(1)">总体情况</span>
      <span class="ms-toggle-item" :class="{ 'is-active': isActive == 2}" @click="toggleItem(2)">企业信息</span>
      <span class="ms-toggle-item" :class="{ 'is-active': isActive == 3}" @click="toggleItem(3)">产品信息</span>
      <span class="ms-toggle-item" :class="{ 'is-active': isActive == 4}" @click="toggleItem(4)">报检信息</span>
      <span class="ms-toggle-item" :class="{ 'is-active': isActive == 5}" @click="toggleItem(5)">扫描统计</span>
      <span class="ms-toggle-item" :class="{ 'is-active': isActive == 6}" @click="toggleItem(6)">异常预警</span>
    </div>
    <v-overall v-if="isActive == 1"></v-overall>
    <v-enterprise v-if="isActive == 2"></v-enterprise>
    <v-product v-if="isActive == 3"></v-product>
    <v-inspect v-if="isActive == 4"></v-inspect>
    <v-scan v-if="isActive == 5"></v-scan>
    <v-warning v-if="isActive == 6"></v-warning>
  </div>
</template>

<script>
  import vOverall from './overall.vue';
  import vEnterprise from './enterprise.vue'
  import vProduct from './product.vue'
  import vInspect from './inspect.vue'
  import vScan from './scan.vue'
  import vWarning from './warning.vue'
  export default {
    components: {
      vOverall,
      vEnterprise,
      vProduct,
      vInspect,
      vScan,
      vWarning
    },
    data(){
      return {
        isActive: 1,
      }
    },
    methods: {
      toggleItem(index){
        this.isActive = index;
      }
    },
    mounted(){
    }
  }
</script>
<style scoped>
  @import "../../assets/app.css";

  .outer-content-wrap {
    width: 100%;
    min-height: 100%;
    height: 100%;
    overflow: hidden;
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
