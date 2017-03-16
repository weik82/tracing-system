<template>
  <div class="ms-main-enterprise">
    <div class="ms-chart content-wrap" :style="{height:(chartStatus?'50':'250')+'px'}">
      <div class="content-header">
        <span class="content-header-title">全网商品备案时间分布统计</span>
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
            placeholder="选择日期范围" style="width: 200px;margin: 0 10px">
          </el-date-picker>
          <span :class="{'is-circle-checked':circleChecked=='day'}" @click="circleChecked='day'" class="circle-checked">天</span>
          <span :class="{'is-circle-checked':circleChecked=='week'}" @click="circleChecked='week'"
                class="circle-checked">周</span>
          <span :class="{'is-circle-checked':circleChecked=='month'}" @click="circleChecked='month'"
                class="circle-checked">月</span>
          <i class="el-icon-caret-top" :class="{'el-icon-caret-bottom':chartStatus}"
             @click="chartStatus=!chartStatus;"></i>
        </div>
      </div>
      <div style="width: 100%;height:calc(100% - 40px)" id="chart"></div>
    </div>
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
      <div class="ms-pagination">
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
  import echarts from 'echarts'
  export default {
    data(){
      return {
        circleChecked: 'day',
        chartStatus: false,
        value: '饼图',
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
    min-height: calc(100% - 40px);
    padding: 1%;
    height: calc(100% - 40px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .ms-main-enterprise .ms-chart {
    padding: 5px 20px;
    width: 100%;
    height: 250px;
    margin-bottom: 10px;
    transition: height 0.5s;
    overflow: hidden;
  }

  .ms-main-enterprise .ms-table {
    min-height: calc(100% - 200px);
  }

  .ms-pagination {
    height: 40px;
    width: 100%;
    text-align: center;
    padding-top: 5px;
  }

  .circle-checked {
    display: inline-block;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border-radius: 18px;
    margin: 0 5px;
    cursor: pointer;
  }

  .circle-checked.is-circle-checked {
    border: 1px solid #09ACFF;
    color: #09ACFF;
  }

  .el-icon-caret-top {
    margin-left: 20px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 16px;
    background-color: #E2E2E2;
    color: #fff;
    cursor: pointer;
  }

  .el-icon-caret-bottom:before {
    content: "\E604" !important;
  }
</style>
