<template>
  <div class="ms-main ms-main-flex">
    <div class="ms-left-chart">
      <el-date-picker
        v-model="date"
        type="daterange"
        :editable="false"
        placeholder="选择日期范围" style="width: 220px;position: absolute;right: 10px;top: 10px;z-index: 10;">
      </el-date-picker>
      <div style="width: 100%;height: 100%" id="warnmap"></div>
    </div>
    <div class="ms-right-detail ms-r-detail">
      <div class="ms-detail-up">
        <p class="ms-detail-title">系统异常预警统计(次)</p>
        <div class="chart">
          <p class="ms-detail-count warn">{{warnTotal}}<span class="arrow-more" @click="toToggle(2)">>></span></p>
        </div>
      </div>
      <div class="ms-detail-down">
        <p class="ms-detail-title" style="padding-top: 10px">系统各省异常预警统计(次)</p>
        <div class="chart" style="overflow-y: scroll">
          <div id="warnbar" style="width: 100%;height: 125%"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import {geoCoordMap, mapData, mapData1} from '../../../../config/config'
  import {convertData} from '../../../../config/util'
  export default {
    data(){
      return {
        platformId: this.$route.params.id,
        date: [],
        warnTotal: 0,
        mapChart: null,
        barChart: null,
        warnMap: {
          color: ['#FF6655', '#C547F6', '#FF9E5E'],
          title: {
            text: '系统异常预警分布图',
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
            data: [],
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
          series: []
        },//全网异常预警分布图
        warnBar: {
          color: ['#FF6655', '#C547F6', '#FF9E5E'],
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
            data: []
          },
          series: []
        }
      }
    },
    methods: {
      toToggle(item){
        this.$emit('toggleItem', item);
      },
      getSystemWarnCount(){
        let _data = {
          starttime: this.submitDate[0],
          endtime: this.submitDate[1],
          platformid: this.platformId
        };
        this.axios.post('/statistics/getsystemwarningscancount', _data)
          .then((res) => {
            if (res.status == 200) {
              let _data = res.data;
              this.warnTotal = _data.total;
            }
          });
      },//全网预警统计(次)
      getProvinceWarnCount(){
        let _data = {
          starttime: this.submitDate[0],
          endtime: this.submitDate[1],
          platformid: this.platformId
        };
        this.axios.post('/statistics/getprovincewarningscancount', _data)
          .then((res) => {
            if (res.status == 200) {
              let _data = res.data, _yAxis = [], _series = [];
              _data.provincedata.forEach((item) => {
                _yAxis.push(item.province);
              });
              let _len = _data.platformdata.length - 1;
              _data.platformdata.forEach((item, index) => {
                if (index == _len) {
                  let _count = [];
                  item.count.forEach((sitem, sindex) => {
                    _count.push({
                      value: sitem,
                      value1: _data.provincedata[sindex].count
                    });
                  });
                  _series.push({
                    name: item.platform,
                    type: 'bar',
                    stack: '总量',
                    barWidth: 25,
                    label: {
                      normal: {
                        textStyle: {
                          color: '#000'
                        },
                        show: true,
                        position: 'right',
                        formatter: function (v) {
                          return v.data.value1;
                        }
                      }
                    },
                    data: _count
                  })
                } else {
                  _series.push({
                    name: item.platform,
                    type: 'bar',
                    stack: '总量',
                    barWidth: 15,
                    data: item.count
                  })
                }
              });
              this.warnBar.yAxis.data = _yAxis;
              this.warnBar.series = _series;
              this.initBar();
            }
          })
      },//全网各省预警统计(次)
      initBar(){
        this.barChart = echarts.init(document.getElementById('warnbar'));
        this.barChart.setOption(this.warnBar);
      },
      getSysPostionWarnCount(){
        let _data = {
          starttime: this.submitDate[0],
          endtime: this.submitDate[1],
          platformid: this.platformId
        };
        this.axios.post('/statistics/getsyspostionwarningscancount', _data)
          .then((res) => {
            if (res.status == 200) {
              let _data = res.data, _series = [], _legend = [];
              _data.forEach((item) => {
                let _data = [];
                item.position.forEach((sitem) => {
                  _data.push({
                    name: item.platform.substr(0, 2),
                    value: [sitem.longitude, sitem.latitude, sitem.count]
                  })
                });
                _series.push({
                  name: item.platform,
                  type: 'scatter',
                  coordinateSystem: 'geo',
                  legendHoverLink: false,
                  data: _data,
                  /* symbolSize: function (val) {
                   return val[2] * 10;
                   },*/
                  label: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: false
                    }
                  }
                });
                _legend.push(item.platform);
              });
              this.warnMap.legend.data = _legend;
              this.warnMap.series = _series;
              this.initMap();
            }
          })
      },//全网预警分布
      initMap(){
        this.axios.get(location.origin + '/static/json/china.json')
          .then((res) => {
            if (res.status == 200) {
              echarts.registerMap('china', res.data);
              this.mapChart = echarts.init(document.getElementById('warnmap'));
              this.mapChart.setOption(this.warnMap);
            }
          })
      }
    },
    created(){
      let _sTime = new Date(), _eTime = new Date();
      _sTime.setMonth(_sTime.getMonth() - 6);
      this.date = [_sTime, _eTime];
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
        return [dateFormat(this.date[0]), dateFormat(this.date[1])]
      }
    },
    /*watch: {
      '$route' (to, from) {
        this.platformId = to.params.id;
        this.getProvinceWarnCount();
        this.getSysPostionWarnCount();
      }
    },*/
    mounted(){
      this.$nextTick(function () {
        this.getSystemWarnCount();
        this.getProvinceWarnCount();
        this.getSysPostionWarnCount();
      })
    }
  }
</script>
<style scoped>
  .ms-main {
    height: 100%;
    min-height: 100%;
  }

  .ms-detail-up {
    flex: 0 0 25%
  }

  .ms-detail-up .chart {
    display: flex;
    align-items: center;
  }

  .ms-detail-down {
    flex: 0 0 75%;
  }

  .ms-r-detail .ms-detail-count.warn {
    color: #FC675B;
  }

  .arrow-more {
    cursor: pointer;
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
    line-height: 32px;
    padding-left: 5px;
  }
</style>
