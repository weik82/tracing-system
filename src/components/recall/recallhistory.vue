<template>
  <div class="feedback-wrap">
    <v-list @toggleItem="toggleItem" v-if="historyType=='list'"></v-list>
    <v-detail @toggleItem="toggleItem" v-if="historyType=='detail'"></v-detail>
  </div>
</template>

<script>
  import vList from './historylist.vue'
  import vDetail from './historydetail.vue'
  export default {
    components: {
      vList,
      vDetail
    },
    data(){
      return {
        historyType: 'list'
      }
    },
    methods: {
      toggleItem(index){
        this.historyType = index;
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
