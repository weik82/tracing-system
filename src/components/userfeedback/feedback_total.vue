<template>
  <div class="feedback-wrap">
    <v-chart @toggleItem="toggleItem" v-if="feedbackType=='chart'"></v-chart>
    <v-list @toggleItem="toggleItem" v-if="feedbackType=='list'"></v-list>
  </div>
</template>
<script>
  import vChart from './feedbacktotal/feedback-total-chart.vue';
  import vList from './feedbacktotal/feedback-total-list.vue'
  export default {
    components: {
      vChart,
      vList
    },
    data(){
      return {
        feedbackType: 'chart'
      }
    },
    methods: {
      toggleItem(type){
        this.feedbackType = type;
      }
    },
    mounted(){
      this.$nextTick(function () {

      })
    }
  }
</script>
<style scoped>
  .feedback-wrap {
    height: 100%;
    /*min-height: 100%;*/
    width: 100%;
    overflow: auto;
  }
</style>
