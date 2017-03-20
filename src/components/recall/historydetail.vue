<template>
  <div class="ms-main">
    <div class="main-header">
      <span class="content-header-title">1000000001召回详情12</span>
    </div>
    <div class="ms-half-table content-wrap">
      <div class="content-header">
        <span class="content-header-title">召回商品列表</span>
      </div>
      <div style="width: 100%;height: calc(100% - 80px)">
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
    <div class=" content-wrap">
      <div class="content-header">
        <span class="content-header-title">召回原因及公告</span>
      </div>
      <div class="detail-wrap">
        <el-row>
          <el-col :span="8">
            <span class="info">召回原因</span>不合格
          </el-col>
          <el-col :span="8">
            <span class="info">召回公告</span>不合格
          </el-col>
          <el-col :span="8">
            <span class="info">附件</span>1.png
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="ms-pagination" style="padding-top: 4px;">
      <el-button type="primary" @click="toToggle('list')">返回</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
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
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .ms-main > .ms-half-table {
    height: calc(100% - 150px);
    margin-bottom: 10px;
  }
.detail-wrap{
  padding: 1% 20px;
}
  .detail-wrap .info{
    padding:0 15px;
    font-weight: bold;
  }
</style>
