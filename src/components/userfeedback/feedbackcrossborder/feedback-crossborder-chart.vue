<template>
  <div class="ms-main ms-main-flex">
    <div class="ms-left-chart">
      <el-date-picker
        v-model="date"
        type="daterange"
        :editable="false"
        placeholder="选择日期范围" style="width: 220px;position: absolute;right: 10px;top: 0;z-index: 10;">
      </el-date-picker>
      <div style="width: 100%;height: 100%" id="map"></div>
    </div>
    <div class="ms-right-detail ms-r-detail">
      <div class="ms-detail-up">
        <p class="ms-detail-title">系统用户反馈统计(次)</p>
        <div class="chart">
          <div class="up-detail">
            <p>反馈总数</p>
            <p class="ms-detail-count">{{count.totalCount}}</p>
          </div>
          <div class="up-detail">
            <p>差评数</p>
            <p class="ms-detail-count bad-count">{{count.badCount}}</p>
          </div>
        </div>
      </div>
      <div class="ms-detail-mid">
        <p class="ms-detail-title" style="padding-top: 10px">
          系统月反馈增率最高TOP3行业
          <span @click="toToggle('list')" class="more">更多</span>
        </p>
        <div id="scanbar" class="chart"></div>
      </div>
      <div class="ms-detail-down">
        <p class="ms-detail-title" style="padding-top: 10px">系统用户反馈时间分布</p>
        <div id="scanline" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts/map/js/china'
  import {mapData, mapData1} from '../../../config/config'
  import {convertData} from '../../../config/util'
  export default {
    data(){
      return {
        count: {
          totalCount: 34252435,
          badCount: 34252
        },
        date: '',
        mapChart: null,
        pieChart: null,
        barChart: null,
        lineChart: null,
        feedbackmap: {
          title: {
            text: '系统用户反馈分布图',
            left: 'left',
            textStyle: {
              color: '#828282',
              fontSize: 20
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            bottom: 20,
            left: 20,
            data: ['用户反馈', '用户差评反馈'],
            textStyle: {
              color: '#000',
              fontSize: 18
            }
          },
          geo: {
            map: 'china',
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: '#fff',
                borderColor: '#D2D2D2',
                borderWidth: 2
              },
              emphasis: {
                areaColor: '#fefefe'
              }
            }
          },
          series: [
            {
              name: '用户反馈',
              type: 'scatter',
              coordinateSystem: 'geo',
              legendHoverLink: false,
              data: convertData(mapData),
              symbolSize: function (val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#00C1FF'
                }
              }
            },
            {
              name: '用户差评反馈',
              type: 'scatter',
              coordinateSystem: 'geo',
              legendHoverLink: false,
              data: convertData(mapData1),
              symbolSize: function (val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#FF6E00'
                }
              }
            }
          ]
        },
        feedbackbar: {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '7%',
            right: '7%',
            top: '8%',
            bottom: '20%'
          },
          legend: {
            orient: 'vertical',
            data: ['2月', '3月'],
            right: 20,
            top: 20
          },
          xAxis: [
            {
              type: 'category',
              data: ['酒类', '奶粉', '食用油', '咖啡']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '2月',
              type: 'bar',
              data: [132, 234, 98, 101]
            },
            {
              name: '3月',
              type: 'bar',
              data: [120, 295, 120, 70]
            }
          ]
        },
        feedbackline: {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['7月', '8月', '9月', '10月', '11月', '12月']
          },
          legend: {
            data: ['跨境电商'],
            left: 'center',
            bottom: 0,
            show: false
          },
          grid: {
            left: '10%',
            right: '5%',
            top: '10%',
            bottom: '20%'
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: false
            }
          },
          series: [
            {
              name: '跨境电商',
              type: 'line',
              smooth: true,
              data: [300, 326, 256, 421, 333, 456, 512]
            }
          ]
        }
      }
    },
    methods: {
      toToggle(type){
        this.$emit('toggleItem', type);
      },
      initMap(){
        this.axios.get(location.origin + '/static/json/china.json').then((res) => {
          if (res.status == 200) {
            echarts.registerMap('china', res.data);
            this.mapChart = echarts.init(document.getElementById('map'));
            this.mapChart.setOption(this.feedbackmap);
          }
        });
      },
      initBar(){
        this.barChart = echarts.init(document.getElementById('scanbar'));
        this.barChart.setOption(this.feedbackbar);
      },
      initLine(){
        this.lineChart = echarts.init(document.getElementById('scanline'));
        this.lineChart.setOption(this.feedbackline);
      }
    },
    watch: {
      '$route' (to, from) {
        let id = to.params.id;
        if (id == 1) {
          this.count.totalCount = 34252435;
          this.count.badCount = 34252;
        } else if (id == 2) {
          this.count.totalCount = 3425245;
          this.count.badCount = 3425;
        }
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.initMap();
        this.initBar();
        this.initLine();
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

  .ms-r-detail .ms-detail-mid {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #D5D5D5;
  }

  .ms-detail-up {
    flex: 0 0 30%;
  }

  .ms-detail-mid, .ms-detail-down {
    flex: 0 0 35%
  }

  .ms-detail-up .chart {
    display: flex;
    align-items: center
  }

  .more {
    text-decoration: underline;
    font-size: 80%;
    color: #21C3FC;
    cursor: pointer
  }

  .up-detail {
    flex: 0 0 50%;
  }

  .bad-count {
    color: #FF6F00;
  }
</style>
