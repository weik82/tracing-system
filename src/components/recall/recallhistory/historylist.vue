<template>
  <div class="ms-main">
    <div class="main-header">
      <span class="content-header-title">商品召回历史</span>
      <div class="content-header-form">
        <el-form ref="form" :model="form" :inline="true" label-width="0" label-position="left">
          <el-form-item label="">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              :editable="false"
              placeholder="请选择发布召回日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-input placeholder="请输入报检单号" v-model="form.code" style="width: 240px;">
              <el-button slot="append" type="primary" icon="search" @click="search">搜索</el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="ms-all-table content-wrap">
      <div style="width: 100%;height: calc(100% - 40px)">
        <el-table :data="tableData" style="height: 100%;width: 100%" height="'100%'">
          <el-table-column
            prop="id"
            label="召回编号"
            width="100">
            <template scope="scope">
              <a @click="toDetail(scope.$index,scope.row)" href="javascript:;"
                 style="cursor: pointer;">{{scope.row.id}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="发布召回日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="status"
            label="召回状态"
            width="110">
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
            prop="ciqcode"
            label="CIQ编码"
            width="110">
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
        </el-table>
      </div>
      <div class="ms-pagination" style="background-color: #eef1f6;padding-top: 4px">
        <el-pagination
          @current-change="search"
          :current-page="config.currentPage"
          :page-size="config.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="config.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {recallHistory} from '../../../config/config'
  export default {
    data(){
      return {
        config: {
          currentPage: 1,
          pageSize: 10,
          total: 3
        },
        form: {
          date: [],
          code: ''
        },
        tableData: recallHistory
      }
    },
    methods: {
      search(){
        console.log(this.form);
      },
      toDetail(index, item){
        console.log(index, item);
        let option = {
          type: 'detail',
          config: item
        };
        this.$emit('toggleItem', option);
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
    height: 100%;
    min-height: 100%;
    padding: 0 1% 1%;
  }

  .ms-main > .ms-all-table {
    height: calc(100% - 50px);
  }

  .el-form-item {
    margin: 0;
  }
</style>
