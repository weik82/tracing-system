<template>
  <div class="recall-wrap">
    <transition name="move" mode="out-in">
      <v-list @toggleItem="toggleItem" v-if="historyType=='list'"></v-list>
    </transition>
    <transition name="move" mode="out-in">
      <v-detail :option="option" @toggleItem="toggleItem" v-if="historyType=='detail'"></v-detail>
    </transition>
  </div>
</template>

<script>
  import vList from './recallhistory/historylist.vue'
  import vDetail from './recallhistory/historydetail.vue'
  export default {
    components: {
      vList,
      vDetail
    },
    data(){
      return {
        option: null,
        historyType: 'list'
      }
    },
    methods: {
      toggleItem(option){
        this.option = option.config || {};
        this.historyType = option.type;
      }
    },
    mounted(){
      this.$nextTick(function () {
      })
    }
  }
</script>
<style scoped>
  .recall-wrap {
    height: 100%;
    /*min-height: 100%;*/
    width: 100%;
    overflow: auto;
  }
</style>
