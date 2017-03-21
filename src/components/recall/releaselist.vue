<template>
  <div class="ms-main">
    <div class="ms-all-table content-wrap">
      <div class="content-header">
        <span class="content-header-title">商品信息列表</span>
      </div>
      <div style="width: 100%;height: calc(100% - 80px)">
        <el-table ref="table" :data="tableData" style="height: 100%;width: 100%" height="'100%'"  @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            :reserve-selection="true"
            width="55">
          </el-table-column>
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
    <div class="ms-pagination" style="padding-top: 4px;">
      <el-button type="primary" @click="toToggle('form')">返回1212</el-button>
      <el-button type="primary" @click="toToggle('submit')">下一步</el-button>
      <el-button type="primary" @click="test">111</el-button>
      <el-button type="primary" @click="test1">2221</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        multipleSelection:[],
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      cellClick(index, row){
//        console.log(index, row);
        this.toToggle('detail');
      },
      test(){
          this.$refs.table.clearSelection()
      },
      test1(){
        console.log(this.multipleSelection);
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
  }

  .ms-main > .ms-all-table {
    height: calc(100% - 40px);
  }

</style>
