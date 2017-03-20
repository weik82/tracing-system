<template>
  <div class="ms-main ms-main-flex">
    <div class="ms-left-chart">
      <div style="width: 100%;height: 100%" id="map"></div>
    </div>
    <div class="ms-right-detail">
      <el-select v-model="value" placeholder="请选择" style="width: 100%">
        <el-option
          v-for="item in options"
          :label="item.label"
          :value="item.value"
          :key="item.value">
        </el-option>
      </el-select>
      <div class="ms-detail-info">
        <p class="title">全国统计</p>
        <p>企业备案(家)</p>
        <span>654</span>
        <p>产品备案(个)</p>
        <span>1323</span>
        <p>商品累计加贴数量(件)</p>
        <span>23244</span>
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
        value: '',
        options: [
          {label: '全国', value: '全国'},
          {label: '浙江省', value: '浙江省'}
        ],
        mapChart: null,
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
        }
      }
    },
    methods: {
      initMap(){
        this.mapChart = echarts.init(document.getElementById('map'));
        this.mapChart.setOption(this.map);
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.initMap()
      })
    }
  }
</script>
<style scoped>

</style>
