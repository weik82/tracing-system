<template>
  <div class="ms-main ms-main-flex">
    <div class="ms-left-chart">
      <el-date-picker
        v-model="value6"
        type="daterange"
        :editable="false"
        placeholder="选择日期范围" style="width: 200px;position: absolute;right: 10px;top: 10px;z-index: 10;">
      </el-date-picker>
      <div style="width: 100%;height: 100%" id="map"></div>
    </div>
    <div class="ms-right-detail ms-r-detail">
      <div class="ms-detail-up">
        <p class="ms-detail-title">全网扫码统计(次)</p>
        <p class="ms-detail-count">34252435</p>
        <div id="scanpie" class="chart"></div>
      </div>
      <div class="ms-detail-down">
        <p class="ms-detail-title" style="padding-top: 10px">全网各省扫码统计(次)</p>
        <div class="chart" style="overflow-y: scroll">
          <div id="scanbar" style="width: 100%;height: 150%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {geoCoordMap, mapData, mapData1} from '../../../config/config'
  import {convertData} from '../../../config/util'
  export default {
    data(){
      return {
        value6: '',
        mapChart: null,
        pieChart: null,
        barChart: null,
        map: {
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
                  color: '#FFE000'
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
                  color: '#00DEFF'
                }
              }
            }
          ]
        },
        scanpie: {
          color: ['#00DEFF', '#56F04A', '#FFE000'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
            textStyle: {
              fontSize: 12
            }
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: ['跨境电商追溯系统', '宁波跨境追溯系统', '广东跨境追溯系统']
          },
          series: [
            {
              name: '系统来源',
              type: 'pie',
              radius: '70%',
              center: ['30%', '55%'],
              data: [
                {value: 335, name: '跨境电商追溯系统'},
                {value: 310, name: '宁波跨境追溯系统'},
                {value: 234, name: '广东跨境追溯系统'}
              ],
              label: {
                normal: {
                  formatter: '{c}'
                }
              },
              labelLine: {
                normal: {
                  length: 3,
                  length2: 3
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        scanbar: {
          color: ['#00DEFF', '#56F04A', '#FFE000'],
          title: {
            text: '跨境电商追溯系统: 3122',
            left: 'center',
            textStyle: {
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top: '5%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['浙江', '上海', '北京', '福建', '江苏', '广东']
          },
          series: [
            {
              name: '跨境电商追溯系统',
              type: 'bar',
              stack: '总量',
              barWidth: 15,
              data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
              name: '宁波跨境追溯系统',
              type: 'bar',
              stack: '总量',
              barWidth: 15,
              data: [4820, 9348, 12904, 50490, 91744, 430230]
            },
            {
              name: '广东跨境追溯系统',
              type: 'bar',
              stack: '总量',
              barWidth: 15,
              data: [9820, 12348, 17904, 80490, 31744, 230230]
            }
          ]
        }
      }
    },
    methods: {
      initMap(){
        this.axios.get(location.origin + '/static/json/china.json').then((res) => {
          if (res.status == 200) {
            echarts.registerMap('china', res.data);
            this.mapChart = echarts.init(document.getElementById('map'));
            this.mapChart.setOption(this.map);
          }
        });
      },
      initPie(){
        this.pieChart = echarts.init(document.getElementById('scanpie'));
        this.pieChart.setOption(this.scanpie);
      },
      initBar(){
        this.barChart = echarts.init(document.getElementById('scanbar'));
        this.barChart.setOption(this.scanbar);
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.initMap();
        this.initPie();
        this.initBar();
      })
    }
  }
</script>
<style scoped>


</style>
