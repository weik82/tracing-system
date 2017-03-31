<template>
  <div class="ms-main ms-main-scroll">
    <div class="ms-up-chart content-wrap" :style="{height:(config.chartStatus?'50':'250')+'px'}">
      <div class="content-header" style="padding: 0">
        <span class="content-header-title">全网商品备案时间分布统计</span>
        <div class="content-header-form">
          <el-select v-model="config.chartType" disabled placeholder="请选择" style="width: 100px;margin: 0 10px">
            <el-option
              v-for="item in config.options"
              :label="item.label"
              :value="item.value" :key="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="config.date"
            type="daterange"
            :editable="false"
            placeholder="选择日期范围" style="width: 220px;margin: 0 10px">
          </el-date-picker>
          <span :class="{'is-circle-checked':config.circleChecked=='day'}" @click="searchChart('day')"
                class="circle-checked">天</span>
          <span :class="{'is-circle-checked':config.circleChecked=='week'}" @click="searchChart('week')"
                class="circle-checked">周</span>
          <span :class="{'is-circle-checked':config.circleChecked=='month'}" @click="searchChart('month')"
                class="circle-checked">月</span>
          <i class="el-icon-caret-top el-icon-caret-top1" :class="{'el-icon-caret-bottom':config.chartStatus}"
             @click="config.chartStatus=!config.chartStatus;"></i>
        </div>
      </div>
      <div style="width: 100%;height:calc(100% - 40px)" id="chart"></div>
    </div>
    <div class="ms-down-table content-wrap">
      <div class="content-header">
        <span class="content-header-title">全网商品信息列表</span>
        <div class="content-header-form">
          <el-input placeholder="请输入商品名称" v-model="config.productName" style="width: 240px;">
            <el-button slot="append" icon="search" @click="searchList">搜索</el-button>
          </el-input>
        </div>
      </div>
      <el-table class="space-nowrap" highlight-current-row :data="productData" style="width: 100%;" height="405">
        <el-table-column
          prop="productname"
          label="商品名称"
          width="170">
        </el-table-column>
        <el-table-column
          prop="categoryname"
          label="所属行业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="vendorname"
          label="所属企业"
          width="180">
        </el-table-column>
        <el-table-column
          prop="platform"
          label="所属系统"
          width="170">
        </el-table-column>
        <el-table-column
          prop="gov"
          label="所属机构"
          width="180">
        </el-table-column>
        <el-table-column
          label="报检次数/商品数"
          width="150">
          <template scope="scope">
            <span>{{ scope.row.inspectcnt + ' / ' + scope.row.tagcnt}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="importgate"
          label="报关口岸"
          width="100">
        </el-table-column>
        <el-table-column
          prop="province"
          label="所在省份"
          width="100">
        </el-table-column>
        <el-table-column
          prop="hscode"
          label="HS编码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="createtimestr"
          label="备案时间"
          width="120">
        </el-table-column>
      </el-table>
      <div class="ms-pagination">
        <el-pagination
          @current-change="getProductList"
          :current-page="config.currentPage"
          :page-size="config.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="config.total">
        </el-pagination>
        <span class="down-excel">导出excel</span>
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
          total: 3,
          circleChecked: 'day',
          chartStatus: false,
          chartType: '折线',
          productName: '',
          date: [],
          options: [
            {label: '折线', value: '折线'},
            {label: '饼图', value: '饼图'}
          ]
        },
        mapChart: null,
        chartOption: {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
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
              name: '产品数量',
              type: 'line',
              smooth: true,
              data: []

            }
          ]
        },
        productData: []
      }
    },
    methods: {
      getProductByDate(){
        let _data = {
          starttime: this.submitDate[0],
          endtime: this.submitDate[1]
        };
        this.axios.post('/statistics/getproductdatabydate', _data)
          .then((res) => {
            if (res.status == 200) {
              let _data = res.data, _xAxis = [], _yAxis = [];
              _data.forEach((item) => {
                _xAxis.push(item.date);
                _yAxis.push(item.count)
              });
              this.chartOption.xAxis.data = _xAxis;
              this.chartOption.series[0].data = _yAxis;
              this.initChart();
            }
          })
      },//图表数据
      getProductList(currentpage){
        let _data = {
          starttime: this.submitDate[0],
          endtime: this.submitDate[1],
          productname: this.config.productName,
          pageflag: 1,
          currentpage: currentpage - 1,
          pagesize: this.config.pageSize
        };
        this.axios.post('/statistics/getproductdatalist', _data)
          .then((res) => {
            if (res.status == 200 && res.data.result == 0) {
              this.productData = res.data.data;
              this.config.total = res.data.totalnum;
            } else {
              this.productData = [];
              this.config.total = 0;
            }
          })
      },//列表数据
      initChart(){
        this.mapChart = echarts.init(document.getElementById('chart'));
        this.mapChart.setOption(this.chartOption);
      },
      searchList(){
        this.config.currentPage = 1;
        this.getProductList(1);
      },
      searchChart(flag){
        this.config.circleChecked = flag;
        this.getProductByDate();
      }
    },
    created(){
      let _sTime = new Date(), _eTime = new Date();
      _sTime.setMonth(_sTime.getMonth() - 6);
      this.config.date = [_sTime, _eTime];
    },
    computed: {
      submitDate(){
        let addZero = function (m) {
          return m < 10 ? '0' + m : m;
        };
        let dateFormat = function (time) {
          let y = time.getFullYear();
          let m = time.getMonth() + 1;
          let d = time.getDate();
          return y + '-' + addZero(m) + '-' + addZero(d);
        };
        return [dateFormat(this.config.date[0]), dateFormat(this.config.date[1])]
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.getProductByDate();
        this.getProductList(1);
      })
    }
  }
</script>
<style scoped>
  .el-icon-caret-top1 {
    line-height: 30px !important;
  }
</style>
