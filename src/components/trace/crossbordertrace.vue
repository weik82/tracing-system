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
  import vOverall from './crossbordertrace/overall.vue';
  import vEnterprise from './crossbordertrace/enterprise.vue'
  import vProduct from './crossbordertrace/product.vue'
  import vInspect from './crossbordertrace/inspect.vue'
  import vScan from './crossbordertrace/scan.vue'
  import vWarning from './crossbordertrace/warning.vue'
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
    created(){
      let _query = this.$route.query;
      console.log(this.$route);
      if (_query.isActive) {
        this.isActive = _query.isActive;
      }
    },
 /*   watch: {
      '$route' (to, from) {
        let _platformId = to.params.id;
        console.log(_platformId+'router');
        this.$router.replace({path: '/home/crossborder/' + _platformId});
        /!*this.platformId = to.params.id;
         this.getCountData();
         this.getProvinceData();
         this.getGeoData();*!/
      }
    },*/
    mounted(){
    }
  }
</script>
<style scoped>

  .outer-content-wrap {
    width: 100%;
    /*min-height: 100%;*/
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
