<template>
  <div class="ms-main">
    <div class="main-header">已选{{selectedCount.length}}件商品</div>
    <div class="content-wrap">
      <div class="content-header">
        <span class="content-header-title">召回原因</span>
      </div>
      <div class="form-wrap">
        <el-form ref="form" :model="form" label-width="80px" label-position="top">
          <el-form-item label="召回原因" class="el-form-item-textarea">
            <el-input type="textarea" v-model="form.reason"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" style="position: relative">
              <input class="upload-file" type="file" @change="uploadFile">添加附件
            </el-button>
            <span v-if="form.fileName">{{form.fileName}}<i @click="deleteFile" class="el-icon-delete"></i></span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content-wrap">
      <div class="content-header">
        <span class="content-header-title">召回公告</span>
      </div>
      <div class="form-wrap">
        <el-form ref="form" :model="form" label-width="40px" label-position="left">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="1" name="type">规格问题</el-checkbox>
            <el-checkbox label="2" name="type">品质问题</el-checkbox>
            <el-checkbox label="3" name="type">重量短缺</el-checkbox>
            <el-checkbox label="4" name="type">标志标签问题</el-checkbox>
            <el-checkbox label="5" name="type">包装问题</el-checkbox>
          </el-checkbox-group>
          <el-form-item label="其他">
            <el-input v-model="form.other" size="mini" placeholder="请输入其他原因"></el-input>
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
    props: {
      selectedList: {
        type: Object,
        required: true
      }
    },
    data(){
      return {
        form: {
          reason: '',
          file: null,
          fileName: '',
          type: [],
          other: ''
        }
      }
    },
    methods: {
      toToggle(type){
        if (type == 'form') {
          this.$emit('initDate');
        }
        this.$emit('toggleItem', type);
      },
      uploadFile(event){
        this.form.file = event.target.files[0];
        this.form.fileName = event.target.files[0].name;
      },
      deleteFile(){
        this.form.file = null;
        this.form.fileName = '';
      }
    },
    computed: {
      selectedCount(){
        let _arr = [];
        for (let key in this.selectedList) {
          _arr.push(...this.selectedList[key]);
        }
        return _arr;
      }
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
    padding: 0 1% 1%;
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

  .el-form .el-checkbox-group {
    flex: 0 0 100%;
  }

  .el-form .el-form-item {
    flex: 0 0 30%;
  }

  .el-form .el-form-item-textarea {
    flex: 0 0 100%;
  }

  .upload-file {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }

  .el-icon-delete {
    cursor: pointer
  }
</style>
