<template>
  <div class="ms-main">
    <div class="main-header">
      <span class="content-header-title">设置召回目标商品信息</span>
    </div>
    <div class="content-wrap">
      <div class="content-header">
        <span class="content-header-title">基本信息</span>
      </div>
      <div class="form-wrap">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
          <el-form-item label="商品名*">
            <el-input v-model="form.name" placeholder="请输入商品名"></el-input>
          </el-form-item>
          <el-form-item label="生产日期">
            <el-date-picker
              v-model="form.pdata"
              type="daterange"
              placeholder="请选择生产日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="生产商">
            <el-input v-model="form.producer" placeholder="请输入生产商"></el-input>
          </el-form-item>
          <el-form-item label="产地">
            <el-input v-model="form.origin" placeholder="请输入产地"></el-input>
          </el-form-item>
          <el-form-item label="商品条码">
            <el-input v-model="form.code" placeholder="请输入商品条码"></el-input>
          </el-form-item>
          <el-form-item label="原产国">
            <el-input v-model="form.country" placeholder="请输入原产国"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="content-header">
        <span class="content-header-title">报检信息</span>
      </div>
      <div class="form-wrap">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
          <el-form-item label="入境日期">
            <el-date-picker
              v-model="form.pdata"
              type="daterange"
              placeholder="请选择入境日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报检日期">
            <el-date-picker
              v-model="form.pdata"
              type="daterange"
              placeholder="请选择报检日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报关口岸">
            <el-input v-model="form.producer" placeholder="请输入报关口岸"></el-input>
          </el-form-item>
          <el-form-item label="报检单号">
            <el-input v-model="form.origin" placeholder="请输入报检单号"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="ms-pagination" style="padding-top: 4px;">
      <el-button type="primary" @click="toToggle('list')">搜索商品12211</el-button>
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
          country: ''
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
    padding: 0 1% 1%;
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
    justify-content: space-around;
    flex-flow: row wrap;
    padding: 20px 1% 0;
  }

  .el-form .el-form-item {
    flex: 0 0 40%;
  }
</style>
