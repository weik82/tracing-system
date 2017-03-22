<template>
  <div class="ms-main">
    <div class="ms-all-table content-wrap">
      <div class="content-header">
        <span class="content-header-title">商品信息列表</span>
      </div>
      <div style="width: 100%;height: calc(100% - 80px)">
        <el-table class="space-nowrap" ref="tables" @selection-change="handleSelectionChange" :data="tableData"
                  style="height: 100%;width: 100%" height="'100%'">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="vendor"
            label="所属企业"
            width="150">
          </el-table-column>
          <el-table-column
            prop="system"
            label="所属系统"
            width="150">
          </el-table-column>
          <el-table-column
            prop="organization"
            label="所属机构"
            width="150">
          </el-table-column>
          <el-table-column
            prop="port"
            label="报关口岸/所在省份"
            width="160">
          </el-table-column>
          <el-table-column
            prop="count"
            label="报检次数/报检商品数"
            width="170">
          </el-table-column>
          <el-table-column
            prop="pdate"
            label="生产日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="idate"
            label="报检日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="producer"
            label="生产商"
            width="150">
          </el-table-column>
          <el-table-column
            prop="origin"
            label="产地"
            width="90">
          </el-table-column>
          <el-table-column
            prop="country"
            label="原产国"
            width="90">
          </el-table-column>
          <el-table-column
            prop="code"
            label="商品条码"
            width="110">
          </el-table-column>
          <el-table-column
            prop="ciqcode"
            label="CIQ编码"
            width="110">
          </el-table-column>
          <el-table-column
            prop="indate"
            label="入境日期"
            width="120">
          </el-table-column>
        </el-table>
      </div>
      <div class="ms-pagination" style="background-color: #eef1f6;padding-top: 4px">
        <el-pagination
          @current-change=""
          :current-page="config.currentPage"
          :page-size="config.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="config.total">
        </el-pagination>
      </div>
    </div>
    <div class="ms-pagination" style="padding-top: 4px;">
      <el-button type="primary" @click="toToggle('form')">返回</el-button>
      <el-button type="primary" @click="toToggle('submit')">下一步</el-button>
    </div>
  </div>
</template>

<script>
  import {recallDetail} from '../../../config/config'
  export default {
    props: {
      forms: {
        type: Object,
        required: true
      },
      selectedList: {
        type: Object,
        required: true
      }
    },
    data(){
      return {
        config: {
          currentPage: 1,
          pageSize: 10,
          total: 3
        },
        multipleSelection: this.selectedList,
        tableData: recallDetail.list
      }
    },
    methods: {
      toToggle(type){
        if (type == 'submit') {
          if (Object.keys(this.multipleSelection).length == 0) {
            this.$message({
              message: '请选择召回商品',
              type: 'error'
            });
            return false;
          }
        }
        this.$emit('toggleItem', type);
      },
      handleSelectionChange(val) {
        if (val.length == 0) {
          delete this.multipleSelection[this.config.currentPage];
        } else {
          this.multipleSelection[this.config.currentPage] = val;
        }
        console.log(this.multipleSelection);
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
        let vm = this;
        this.selectedCount.forEach((item) => {
          this.$refs['tables'].toggleRowSelection(item);
        })
      })
    }
  }
</script>
<style scoped>
  .ms-main {
    height: 100%;
    min-height: 100%;
    min-width: 1100px;
  }

  .ms-main > .ms-all-table {
    height: calc(100% - 40px);
  }

</style>
