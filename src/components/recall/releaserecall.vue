<template>
  <div class="recall-wrap">
    <vr-form @toggleItem="toggleItem" v-if="recallType=='form'"></vr-form>
    <vr-list @toggleItem="toggleItem" v-if="recallType=='list'"></vr-list>
    <vr-submit @toggleItem="toggleItem" v-if="recallType=='submit'"></vr-submit>
  </div>
</template>

<script>
  import vrForm from './releaseform.vue';
  import vrList from './releaselist.vue'
  import vrSubmit from './releasesubmit.vue'
  export default {
    components: {
      vrForm,
      vrList,
      vrSubmit
    },
    data(){
      return {
        recallType: 'form'
      }
    },
    methods: {
      toggleItem(index){
        this.recallType = index;
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
    min-height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
