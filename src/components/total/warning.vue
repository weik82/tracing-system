<template>
  <div class="warn-wrap">
    <v-warningchart @toggleItem="toggleItem" v-if="warningType=='chart'"></v-warningchart>
    <v-warninglist @toggleItem="toggleItem" v-if="warningType=='list'"></v-warninglist>
  </div>
</template>

<script>
  import vWarningchart from './warningchart.vue';
  import vWarninglist from './warninglist.vue'
  export default {
    components: {
      vWarningchart,
      vWarninglist
    },
    data(){
      return {
        warningType: 'chart'
      }
    },
    methods: {
      toggleItem(index){
        this.warningType = index == 1 ? 'chart' : 'list';
      }
    },
    mounted(){
    }
  }
</script>
<style scoped>
  .warn-wrap {
    height: calc(100% - 40px);
    min-height: calc(100% - 40px);
    width: 100%;
    overflow: hidden
  }
</style>
