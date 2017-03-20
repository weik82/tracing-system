<template>
  <div class="ms-main">
    <div class="ms-all-table content-wrap">
      <div class="content-header">
        <span class="content-header-title">商品信息列表</span>
        <div class="content-header-form">
          <el-select v-model="value1" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value2" placeholder="请选择" style="width: 200px;margin-left: 40px">
            <el-option
              v-for="item in options1"
              :label="item.label"
              :value="item.value"
              :key="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div style="width: 100%;height: calc(100% - 80px)">
        <el-table :data="tableData" style="height: 100%;width: 100%" height="'100%'">
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
      <el-button type="primary" @click="toToggle(1)">返回</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        value1:'全国',
        value2:'全网追溯系统',
        options: [
          {label: '全国', value: '全国'},
          {label: '浙江省', value: '浙江省'}
        ],
        options1: [
          {label: '全网追溯系统', value: '全网追溯系统'},
          {label: '跨境电商追溯系统', value: '跨境电商追溯系统'}
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
  .content-header>.content-header-title{padding-left: 20px}
  .content-header>.content-header-form{padding-right: 20px}
</style>
