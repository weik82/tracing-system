<template>
  <a class="download"></a>
</template>

<script>
  export default {
    props: {
      contentType: {
        type: String,
        required: true
      },
      fileName: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }

    },
    data(){
      return {}
    },
    methods: {
      downloadFile(){
        this.axios.get(this.url).then((res) => {
          let _blob = new Blob([JSON.stringify(res.data)], {type: this.contentType});
          if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(_blob, this.fileName);
            return false;
          }
          this.$el.download = this.fileName;
          this.$el.href = URL.createObjectURL(_blob);
          this.$el.click();
        })
      }
    },
    mounted(){
      this.$nextTick(function () {
        console.log(this.$el);
      })
    }
  }
</script>
<style scoped>
  .download {
    opacity: 0;
  }
</style>
