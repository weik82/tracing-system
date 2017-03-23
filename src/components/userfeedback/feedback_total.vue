<template>
  <div class="feedback-wrap">
    <transition name="move" mode="out-in">
      <v-chart @toggleItem="toggleItem" v-if="feedbackType=='chart'"></v-chart>
    </transition>
    <transition name="move" mode="out-in">
      <v-list @toggleItem="toggleItem" v-if="feedbackType=='list'"></v-list>
    </transition>
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
