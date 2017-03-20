<template>
  <div class="ms-main ms-main-flex">
    <div class="ms-left-chart">
      <el-date-picker
        v-model="value6"
        type="daterange"
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
  import 'echarts/map/js/china'
  import {geoCoordMap} from '../../config/config'
  export default {
    data(){
      return {
        value6: '',
        mapChart: null,
        pieChart: null,
        barChart: null,
        map: {
          tooltip: {
            trigger: 'item',
            // alwaysShowContent: true,
            backgroundColor: '',
            borderColor: '',
            position: 'left',
            formatter: function (v) {
              // console.log(v);
              return '<div class="ms-outer-wrap">' +
                '<div class="ms-tooltip"> ' +
                '<div class="tip-up"></div><div class="tip-down"></div> ' +
                '<div class="tip-detail"> ' +
                '<p class="tip-role">' + v.name + '</p> ' +
                '<p>企业数量：' + v.data.data1.cnt1 + '家</p> ' +
                '<p>备案商品：' + v.data.data1.cnt2 + '个</p> ' +
                '<p>商品数量：' + v.data.data1.cnt3 + '件</p> ' +
                '</div></div></div>';
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
                // shadowColor: '#20c3ff',
                shadowBlur: 1
                // borderColor: '#20c3ff',
                // borderWidth: 3.5
              },
              emphasis: {
                areaColor: '#20c3ff'
              }
            },
            /*top: '17%',
             left: '18%',
             bottom: '5%'*/
          },
          series: [
            {
              silent: true,
              name: '中国',
              type: 'map',
              map: 'china',
              selectedMode: false,
              /*top: '17%',
               left: '18%',
               bottom: '5%',*/
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: [
                {name: '广东', selected: true},
                {name: '浙江', selected: true},
                {name: '北京', selected: true}
              ],
              itemStyle: {
                normal: {
                  areaColor: '#fff',
                  borderColor: '#206082',
                  borderWidth: 1
                },
                emphasis: {
                  areaColor: '#20c3ff'
                }
              }
            },
            {
              name: 'city',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbolSize: [30, 40],
              symbolOffset: [0, '-50%'],
              data: [
                {
                  "name": "浙江",
                  "value": geoCoordMap['杭州'],
                  symbol: 'image://static/image/icon.png',
                  data1: {
                    province: '浙江',
                    cnt1: 39,
                    cnt2: 485,
                    cnt3: 1324449,
                    link: 'http://ziqa.ciqca.com/index.html'
                  }
                },
                {
                  "name": "广东",
                  "value": geoCoordMap['广州'],
                  symbol: 'image://static/image/icon.png',
                  data1: {
                    province: '广东',
                    cnt1: 6,
                    cnt2: 84,
                    cnt3: 65466,
                    link: 'http://gziqa.ciqca.com/index.html'
                  }
                },
                {
                  "name": "北京",
                  "value": geoCoordMap['北京'],
                  symbol: 'image://static/image/icon.png',
                  data1: {
                    province: '北京',
                    cnt1: 68,
                    cnt2: 3336,
                    cnt3: 4064649,
                    link: 'http://bj.ciqca.com/index.html'
                  }
                }
              ],
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: ['100%', 7],
                  show: false
                },
                emphasis: {
                  formatter: '{b}',
                  position: ['100%', 7],
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 16
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#f4e925',
                  shadowBlur: 10,
                  shadowColor: '#333'
                }
              },
              zlevel: 2
            }
          ]
        },
        scanpie: {
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
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '60%',
              center: ['30%', '55%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'}
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
            top: '2%',
            left: '2%',
            right: '5%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口']
          },
          series: [
            {
              name: '2011年',
              type: 'bar',
              barWidth: 15,
              data: [18203, 23489, 29034, 104970, 131744, 630230]
            }
          ]
        }
      }
    },
    methods: {
      initMap(){
        this.mapChart = echarts.init(document.getElementById('map'));
        this.mapChart.setOption(this.map);
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
