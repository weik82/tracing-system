<template>
  <div class="feedback-wrap">
    <transition name="move" mode="out-in">
      <v-chart @toggleItem="toggleItem" v-if="feedbackType=='chart'"></v-chart>
    </transition>
    <transition name="move" mode="out-in">
      <v-list :options="option" @toggleItem="toggleItem" v-if="feedbackType=='list'"></v-list>
    </transition>
    <transition name="move" mode="out-in">
      <v-detail :options="option" @toggleItem="toggleItem" v-if="feedbackType=='detail'"></v-detail>
    </transition>
  </div>
</template>
<script>
  import vChart from './feedbackcrossborder/feedback-crossborder-chart.vue';
  import vList from './feedbackcrossborder/feedback-crossborder-list.vue'
  import vDetail from './feedbackcrossborder/feedback-crossborder-detail-list.vue'
  export default {
    components: {
      vChart,
      vList,
      vDetail
    },
    data(){
      return {
        feedbackType: 'chart',
        option: {
          trade: '',
          tag: 0
        }
      }
    },
    methods: {
      toggleItem(type){
        this.feedbackType = type;
      }
    },
    created(){
      let _route = this.$route.query;
      console.log(this.$route);
      if (_route.trade) {
        this.option.trade = _route.trade;
        this.feedbackType = 'detail';
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
