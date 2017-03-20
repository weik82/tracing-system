<template>
  <div class="feedback-wrap">
    <v-chart @toggleItem="toggleItem" v-if="feedbackType=='chart'"></v-chart>
    <v-list @toggleItem="toggleItem" v-if="feedbackType=='list'"></v-list>
    <v-detail @toggleItem="toggleItem" v-if="feedbackType=='detail'"></v-detail>
  </div>
</template>

<script>
  import vChart from './fb_total-chart.vue';
  import vList from './fb-total-list.vue'
  import vDetail from './fb-total-detail-list.vue'
  export default {
    components: {
      vChart,
      vList,
      vDetail
    },
    data(){
      return {
        feedbackType: 'chart'
      }
    },
    methods: {
      toggleItem(index){
        this.feedbackType = index;
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
    min-height: 100%;
    width: 100%;
    overflow: hidden
  }
</style>
