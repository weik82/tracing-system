<template>
  <div class="ms-pop" :class="className" :style="styleName">
    {{content}}
    <i class="el-icon-caret-bottom"></i>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: Number,
        required: true
      },
      position: {
        type: Array,
        required: true
      }
    },
    data(){
      return {}
    },
    methods: {},
    computed: {
      styleName(){
        console.log(this.position);
        return {
          'left': this.position[0] + 'px',
          'top': this.position[1] + 'px',
        }
      },
      className(){
        return {
          'ms-pop-enterprise': this.type == 1,
          'ms-pop-product': this.type == 2
        }
      },
      content(){
        return this.typeId == 1 ? '企业备案' : '商品备案';
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
  .ms-pop {
    position: absolute;
    transform: translate(-50%, -100%);
    width: 55px;
    height: 55px;
    border-radius: 50%;
    text-align: center;
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  .ms-pop-enterprise {
    background-color: #FFE000;
    filter: drop-shadow(0 0 4px rgba(255, 224, 0, .5));
  }

  .ms-pop-enterprise > .el-icon-caret-bottom {
    color: #FFE000;
  }

  .ms-pop-product {
    background-color: #00FF48;
    filter: drop-shadow(0 0 4px rgba(0, 255, 72, .5));
  }

  .ms-pop-product > .el-icon-caret-bottom {
    color: #00FF48;
  }

  .ms-pop .el-icon-caret-bottom {
    position: absolute;
    top: 100%;
    color: #FFE000;
    left: 50%;
    transform: translate(-50%, -30%);
  }
</style>
