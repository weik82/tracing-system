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
        <p class="ms-detail-title">全网用户反馈统计(次)</p>
        <p class="ms-detail-count">34252435</p>
        <div id="scanpie" class="chart"></div>
      </div>
      <div class="ms-detail-mid">
        <p class="ms-detail-title" style="padding-top: 10px">
          全网月反馈增率最高TOP3行业
          <span @click="toToggle('list')" class="more">更多</span>
        </p>
        <div id="scanbar" class="chart"></div>
      </div>
      <div class="ms-detail-down">
        <p class="ms-detail-title" style="padding-top: 10px">全网用户反馈时间分布</p>
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
        date: '',
        mapChart: null,
        pieChart: null,
        barChart: null,
        lineChart: null,
        feedbackmap: {
          title: {
            text: '全网用户反馈分布图',
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
            data: ['跨境电商追溯系统', '宁波跨境追溯系统'],
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
              name: '宁波跨境追溯系统',
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
            },
            {
              name: '跨境电商追溯系统',
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
            }
          ]
        },
        feedbackpie: {
          title: {
            text: '内饼图:\n总反馈数\n\n外环图:\n差评数',
            left: 0,
            top: 'center',
            textStyle: {
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: ['跨境电商追溯系统', '宁波跨境追溯系统', '广东跨境追溯系统']
          },
          series: [
            {
              name: '总反馈数',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '40%'],
              center: ['40%', '50%'],
              hoverAnimation: false,
              label: {
                normal: {
                  position: 'outside',
                  formatter: '{c}'
                }
              },
              data: [
                {value: 335, name: '跨境电商追溯系统'},
                {value: 679, name: '宁波跨境追溯系统'},
                {value: 1548, name: '广东跨境追溯系统'}
              ]
            },
            {
              name: '差评数',
              type: 'pie',
              radius: ['50%', '75%'],
              center: ['40%', '50%'],
              hoverAnimation: false,
              label: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '跨境电商追溯系统'},
                {value: 310, name: '宁波跨境追溯系统'},
                {value: 234, name: '广东跨境追溯系统'}
              ]
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
            data: ['跨境电商', '宁波跨境', '广东跨境'],
            left: 'center',
            bottom: 0
          },
          grid: {
            left: '10%',
            right: '5%',
            top: '10%',
            bottom: '32%'
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
            },
            {
              name: '宁波跨境',
              type: 'line',
              smooth: true,
              data: [100, 126, 110, 121, 123, 156, 200]
            },
            {
              name: '广东跨境',
              type: 'line',
              smooth: true,
              data: [200, 200, 146, 300, 210, 300, 312]
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
      initPie(){
        this.pieChart = echarts.init(document.getElementById('scanpie'));
        this.pieChart.setOption(this.feedbackpie);
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
    mounted(){
      this.$nextTick(function () {
        this.initMap();
        this.initPie();
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

  .ms-detail-up, .ms-detail-mid, .ms-detail-down {
    flex: 0 0 33%
  }

  .more {
    text-decoration: underline;
    font-size: 80%;
    color: #21C3FC;
    cursor: pointer
  }
</style>
