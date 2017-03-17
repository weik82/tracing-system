<template>
  <div class="ms-main-enterprise">
    <div class="ms-table content-wrap">
      <div class="content-header">
        <span class="content-header-title" style="padding-left: 20px">商品信息列表</span>
        <div class="content-header-form">
          <el-input placeholder="请输入商品名称" v-model="input5" style="width: 240px;margin-right: 20px">
            <el-button slot="append" icon="search" @click="search">搜索</el-button>
          </el-input>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%;" height="400">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change=""
        :current-page="3"
        :page-size="100"
        layout="jumper, prev, pager, next, total"
        :total="400" class="test1">
      </el-pagination>
      <el-button type="primary" @click="toToggle(1)">返回</el-button>
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
    width: 100%;
    height: 100%;
    padding: 1%;
    display: flex;
  }

  .ms-main > .ms-chart {
    flex: 0 0 70%;
    position: relative;
  }

  .ms-main > .ms-detail {
    flex: 0 0 30%;
    padding: 10px 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }

  .ms-detail-up {
    flex: 0 0 40%;
    border-bottom: 1px solid #D5D5D5;
  }

  .ms-detail-down {
    flex: 0 0 60%;
  }

  .ms-detail-up, .ms-detail-down {
    display: flex;
    flex-direction: column;
  }

  .ms-detail .chart {
    flex: 1;
  }

  .ms-detail .ms-detail-title {
    font-size: 18px;
    color: #828282;
  }

  .ms-detail .ms-detail-count {
    font-size: 28px;
    color: #00ACFF;
  }

  .ms-detail p {
    letter-spacing: .2em;
  }

  .content-header {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content-header .content-header-title {
    font-size: 18px;
  }

  .content-header .content-header-form {
    display: flex;
    align-items: center;
  }

  .content-wrap {
    border-radius: 2px;
    background-color: #fff;
  }

  .ms-main-enterprise {
    width: 100%;
    padding: 1%;
    height: calc(100% - 40px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .ms-main-enterprise > .ms-table {
    min-height: calc(100% - 200px);
  }

  .ms-pagination {
    height: 40px;
    width: 100%;
    text-align: center;
    padding-top: 5px;
  }
</style>
