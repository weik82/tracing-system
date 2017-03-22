<template>
  <div class="recall-wrap">
    <v-form :forms="form" @toggleItem="toggleItem" v-if="recallType=='form'"></v-form>
    <v-list :forms="form" :selectedList="selectedList" @toggleItem="toggleItem" v-if="recallType=='list'"></v-list>
    <v-submit @initDate="initDate" :selectedList="selectedList" @toggleItem="toggleItem" v-if="recallType=='submit'"></v-submit>
  </div>
</template>

<script>
  import vForm from './releaserecall/releaseform.vue';
  import vList from './releaserecall/releaselist.vue'
  import vSubmit from './releaserecall/releasesubmit.vue'
  export default {
    components: {
      vForm,
      vList,
      vSubmit
    },
    data(){
      return {
        form: {
          name: '12',
          pdate: '',
          producer: '',
          origin: '',
          code: '',
          country: '',
          indate: '',
          idate: '',
          port: '',
          icode: ''
        },
        selectedList: {},
        recallType: 'form'
      }
    },
    methods: {
      toggleItem(type){
        console.log(type);
        this.recallType = type;
      },
      initDate(){
        console.log('init');
        this.selectedList = {};
        for (let key in this.form) {
          this.form[key] = '';
        }
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
