<template>
  <div class="ms-main ms-main-scroll">
    <div class="ms-up-chart content-wrap" :style="{height:(chartStatus?'50':'250')+'px'}">
      <div class="content-header" style="padding: 0;">
        <span class="content-header-title">系统报检数量时间分布统计</span>
        <div class="content-header-form">
          <el-select v-model="value" placeholder="请选择" style="width: 100px;margin: 0 10px">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value" :key="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="value6"
            type="daterange"
            :editable="false"
            placeholder="选择日期范围" style="width: 200px;margin: 0 10px">
          </el-date-picker>
          <span :class="{'is-circle-checked':circleChecked=='day'}" @click="circleChecked='day'" class="circle-checked">天</span>
          <span :class="{'is-circle-checked':circleChecked=='week'}" @click="circleChecked='week'" class="circle-checked">周</span>
          <span :class="{'is-circle-checked':circleChecked=='month'}" @click="circleChecked='month'" class="circle-checked">月</span>
          <i class="el-icon-caret-top el-icon-caret-top1" :class="{'el-icon-caret-bottom':chartStatus}"
             @click="chartStatus=!chartStatus;"></i>
        </div>
      </div>
      <div style="width: 100%;height:calc(100% - 40px)" id="chart"></div>
    </div>
    <div class="ms-down-table content-wrap">
      <div class="content-header">
        <span class="content-header-title">系统报检信息列表</span>
        <div class="content-header-form">
          <el-input placeholder="请输入报检单号" v-model="input5" style="width: 240px;">
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
      <div class="ms-pagination">
        <el-pagination
          @current-change=""
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
  import echarts from 'echarts'
  export default {
    data(){
      return {
        config: {
          currentPage: 1,
          pageSize: 10,
          total: 3
        },
        circleChecked: 'day',
        chartStatus: false,
        value: '折线',
        input5: '',
        value6: '',
        options: [
          {label: '折线', value: '折线'},
          {label: '饼图', value: '饼图'}
        ],
        mapChart: null,
        chartOption: {
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          grid: {
            left: '5%',
            right: '5%',
            top: '10%',
            bottom: '15%'
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '数量',
              type: 'line',
              smooth: true,
              data: [12, 11, 15, 13, 12, 13, 10, 12, 11, 15, 13, 12, 13]

            }
          ]
        },
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
      initChart(){
        this.mapChart = echarts.init(document.getElementById('chart'));
        this.mapChart.setOption(this.chartOption);
      },
      search(){
          alert(this.input5);
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.initChart()
      })
    }
  }
</script>
<style scoped>
  .el-icon-caret-top1{
    line-height: 30px!important;
  }
</style>
