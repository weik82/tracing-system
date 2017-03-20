<template>
  <div class="ms-main">
    <div class="main-header">已选13件商品</div>
    <div class="content-wrap">
      <div class="content-header">
        <span class="content-header-title">召回原因</span>
      </div>
      <div class="form-wrap">
        <el-form ref="form" :model="form" label-width="80px" label-position="top">
          <el-form-item label="召回原因" class="el-form-item-textarea">
            <el-input type="textarea" v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content-wrap">
      <div class="content-header">
        <span class="content-header-title">召回公告12123</span>
      </div>
      <div class="form-wrap">
        <el-form ref="form" :model="form" label-width="40px" label-position="left">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="规格问题" name="type"></el-checkbox>
            <el-checkbox label="品质问题" name="type"></el-checkbox>
            <el-checkbox label="重量短缺" name="type"></el-checkbox>
            <el-checkbox label="标志标签问题" name="type"></el-checkbox>
            <el-checkbox label="包装问题" name="type"></el-checkbox>
          </el-checkbox-group>
          <el-form-item label="其他">
            <el-input v-model="form.name" size="mini"  placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="ms-pagination" style="padding-top: 4px;">
      <el-button type="primary" @click="toToggle('list')">返回重选商品</el-button>
      <el-button type="primary" @click="toToggle('form')">发布召回</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        form: {
          name: '',
          pdata: '',
          producer: '',
          origin: '',
          code: '',
          country: '',
          type:[]
        }
      }
    },
    methods: {
      toToggle(flag){
        this.$emit('toggleItem', flag);
      },
    },
    mounted(){
      this.$nextTick(function () {

      })
    }
  }
</script>
<style scoped>
  .ms-main {
    min-height: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .form-wrap {
    background-color: #F8F8F8;
    border-radius: 4px;
    padding: 5px 2%;
    background-clip: content-box;
  }

  .el-form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row wrap;
    padding: 20px 1% 0;
  }
  .el-form .el-checkbox-group{
    flex: 0 0 100%;
  }
  .el-form .el-form-item {
    flex: 0 0 30%;
  }
  .el-form .el-form-item-textarea{
    flex: 0 0 100%;
  }
</style>
