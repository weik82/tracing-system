<template>
  <div class="ms-main">
    <div class="main-header">
      <span class="content-header-title">商品召回历史1</span>
      <div class="content-header-form">
        <el-form ref="form" :model="form" :inline="true" label-width="80px" label-position="left">
          <el-form-item label="">
            <el-input placeholder="请输入报检单号" v-model="form.name" style="width: 240px;">
              <el-button slot="append" icon="search" @click="">搜索</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="生产日期">
            <el-date-picker
              v-model="form.pdata"
              type="daterange"
              placeholder="请选择生产日期范围">
            </el-date-picker>
          </el-form-item>
        </el-form>

      </div>
    </div>
    <div class="ms-all-table content-wrap">
      <div style="width: 100%;height: calc(100% - 40px)">
        <el-table :data="tableData" style="height: 100%;width: 100%" height="'100%'">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
            <template scope="scope">
              <a @click="cellClick(scope.$index,scope.row)" href="javascript:;" style="cursor: pointer;">{{scope.row.date}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180" style="cursor: pointer">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
      <div class="ms-pagination" style="background-color: #eef1f6;padding-top: 4px">
        <el-pagination
          @current-change=""
          :current-page="3"
          :page-size="100"
          layout="jumper, prev, pager, next, total"
          :total="400">
        </el-pagination>
      </div>
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
        },
        input5: '',
        value2: '全部行业',
        options: [
          {label: '全部行业', value: '全部行业'},
          {label: '酒类', value: '酒类'}
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    },
    methods: {
      toToggle(flag){
        this.$emit('toggleItem', flag);
      },
      cellClick(index, row){
        this.toToggle('detail');
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
  .el-form-item{
    margin: 0;
  }
</style>
