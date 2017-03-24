<template>
  <div class="ms-main ms-main-flex">
    <div class="ms-left-chart">
      <div style="width: 100%;height: 100%" id="map"></div>
      <transition-group name="move" mode="out-in">
        <v-pop v-if="showPop" v-for="(item, index) in popItems"
               :key="index"
               :position="item.position"
               :type="item.typeId">
        </v-pop>
      </transition-group>
    </div>
    <div class="ms-right-detail">
      <el-select v-model="value" @change="provinceChange" placeholder="请选择" style="width: 100%">
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
  import {geoCoordMap} from '../../../config/config'
  import vPop from '../../common/pop.vue'
  export default {
    components: {
      vPop
    },
    data(){
      return {
        loading2: true,
        timeout: null,
        showPop: false,
        popItems: [],
        value: 'china',
        options: [
          {label: '全国', value: 'china'},
          {label: '浙江', value: 'zhejiang'}
        ],//下拉框选项
        chinaChart: null,
        china: {
          title: {
            text: '全网追溯系统分布图',
            left: 'left',
            textStyle: {
              color: '#828282',
              fontSize: 20
            }
          },
          tooltip: {
            trigger: 'item',
            // alwaysShowContent: tru11e,
            backgroundColor: '',
            borderColor: '',
            position: 'left',
            formatter: function (v) {
//              console.log(v);
              if (v.seriesType == 'map' && v.data && v.data.cnt1) {
                return '<div class="ms-outer-wrap">' +
                  '<div class="ms-tooltip"> ' +
                  '<div class="tip-up"></div><div class="tip-down"></div> ' +
                  '<div class="tip-detail"> ' +
                  '<p class="tip-role">' + v.name + '</p> ' +
                  '<p>企业备案：' + v.data.cnt1 + '(家)</p> ' +
                  '<p>商品备案：' + v.data.cnt2 + '(个)</p> ' +
                  '<p>商品累计加贴数量2：' + v.data.cnt3 + '(件)</p> ' +
                  '</div></div></div>';
              }
              return '';
            }
          },
          legend: {
            orient: 'vertical',
            bottom: 20,
            left: 20,
            itemWidth: 24,
            itemHeight: 32,
            textStyle: {
              color: '#000',
              fontSize: 16
            },
            data: [
              {name: '跨境电商追溯系统', icon: 'image://static/image/icon.png'},
              {name: '宁波跨境追溯系统', icon: 'image://static/image/icon2.png'}
            ]
          },
          geo: {
            map: 'china',
            roam: false,
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#ffffff',
                borderColor: '#D1D1D1',
                borderWidth: 2
              }
            },
            top: '5%',
            bottom: '5%',
            right: '10%',
            left: '10%'
          },
          series: [
            {
              name: 'province',
              type: 'map',
              map: 'china',
              itemStyle: {
                normal: {
                  areaColor: '#ffffff',
                  borderColor: '#D1D1D1',
                  borderWidth: 2
                },
                emphasis: {
                  areaColor: '#20c3ff',
                  borderWidth: 2
                }
              },
              top: '5%',
              bottom: '5%',
              right: '10%',
              left: '10%',
              label: {normal: {show: false}, emphasis: {show: false}},
              data: [
                {
                  name: '北京',
                  selected: true,
                  province: 'bejing',
                  cnt1: 68,
                  cnt2: 3336,
                  cnt3: 4064649

                },
                {
                  name: '浙江',
                  selected: true,
                  province: 'zhejiang',
                  cnt1: 39,
                  cnt2: 485,
                  cnt3: 1324449

                },
                {
                  name: '广东',
                  selected: true,
                  province: 'guangdong',
                  cnt1: 6,
                  cnt2: 84,
                  cnt3: 65466

                }
              ]
            },
            {
              name: '跨境电商追溯系统',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbolSize: [27, 36],
              symbolOffset: [0, '-50%'],
              symbol: 'image://static/image/icon.png',
              data: [
                {
                  "name": "广州",
                  "value": geoCoordMap['广州'],
                },
                {
                  "name": "北京",
                  "value": geoCoordMap['北京']
                },
                {
                  "name": "杭州",
                  "value": geoCoordMap['杭州']
                }
              ],
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#F06C00'
                }
              }
            },
            {
              name: '宁波跨境追溯系统',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbolSize: [27, 36],
              symbolOffset: [0, '-50%'],
              symbol: 'image://static/image/icon2.png',
              data: [{
                "name": "宁波",
                "value": geoCoordMap['宁波']
              }],
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#F06C00'
                }
              }
            }
          ]
        },//中国地图option
        province: {
          tooltip: {
            trigger: 'item',
            backgroundColor: '',
            borderColor: '',
            position: 'left',
            formatter: function (v) {
              return '<div class="ms-outer-wrap">' +
                '<div class="ms-tooltip"> ' +
                '<div class="tip-up"></div><div class="tip-down"></div> ' +
                '<div class="tip-detail"> ' +
                '<p class="tip-role">' + v.name + '</p> ' +
                '<p>企业备案：' + v.data.data1.cnt1 + '(家)</p> ' +
                '<p>商品备案：' + v.data.data1.cnt2 + '(个)</p> ' +
                '<p>商品累计加贴数量：' + v.data.data1.cnt3 + '(件)</p> ' +
                '</div></div></div>';
            }
          },
          geo: {
            map: '',
            roam: false,
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#ffffff',
                borderColor: '#D1D1D1',
                borderWidth: 2
              },
              emphasis: {
                areaColor: '#ffffff',
                borderColor: '#D1D1D1',
                borderWidth: 2
              }
            },
            top: '5%',
            bottom: '5%',
            right: '10%',
            left: '10%'
          },
          series: [
            {
              name: '城市',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'image://static/image/icon.png',
              symbolSize: [27, 36],
              symbolOffset: [0, '-50%'],
              data: [
                {
                  "name": "杭州出入境检验检疫局",
                  "value": [120.156969, 30.284324],
                  data1: {
                    cnt1: 6,
                    cnt2: 1,
                    cnt3: 10
                  }
                }, {
                  "name": "温州出入境检验检疫局",
                  "value": [120.689066, 28.011184],
                  data1: {
                    cnt1: 3,
                    cnt2: 40,
                    cnt3: 147655
                  }
                }, {
                  "name": "嘉兴出入境检验检疫局",
                  "value": [120.722919, 30.756431],
                  data1: {
                    cnt1: 1,
                    cnt2: 0,
                    cnt3: 0
                  }
                }, {
                  "name": "义乌出入境检验检疫局",
                  "value": [120.100371, 29.332409],
                  data1: {
                    cnt1: 28,
                    cnt2: 444,
                    cnt3: 1176784
                  }
                }, {
                  "name": "嵊泗出入境检验检疫局",
                  "value": [122.463481, 30.725828],
                  data1: {
                    cnt1: 1,
                    cnt2: 0,
                    cnt3: 0
                  }
                }
              ],
              hoverAnimation: true,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  formatter: '{b}',
                  position: ['100%', 7],
                  show: true,
                  textStyle: {
                    color: '#000',
                    fontSize: 16,
                    fontWeight: 'bold'
                  }
                }
              },
              itemStyle: {
                normal: {
                  shadowBlur: 5,
                  shadowColor: '#333'
                }
              }
            }
          ]
        },//省份地图option1111123
        detail: {
          name: '全网'
        }
      }
    },
    methods: {
      timeoutPop(){
        let vm = this;
        this.timeout = setTimeout(function () {
          let seriesModel = vm.chinaChart.getModel().getSeriesByIndex(1);
          let coordSys = seriesModel.coordinateSystem;
          let point = coordSys.dataToPoint(geoCoordMap['杭州']);
          let point1 = coordSys.dataToPoint(geoCoordMap['广州']);
          let arr = [{typeId: 1, position: point}, {typeId: 2, position: point1}];
          vm.popItems.push(...arr);
          vm.showPop = true;
          let t = null;
          t = setTimeout(function () {
            vm.showPop = false;
            clearTimeout(t);
          }, 5000);
          vm.timeoutPop();
        }, 20 * 1000)
      },
      initChinaMap(){
        this.loading2 = true;
        this.axios.get(location.origin + '/static/json/china.json').then((res) => {
          if (res.status == 200) {
            echarts.registerMap('china', res.data);
            this.chinaChart && this.chinaChart.dispose && this.chinaChart.dispose();
            this.chinaChart = echarts.init(document.getElementById('map'));
            this.chinaChart.setOption(this.china);
            let vm = this;
            this.chinaChart.on('click', function (p) {
              if (p.seriesType == 'map' && p.data.selected) {
//                vm.initProvinceMap1('zhejiang');
                vm.value = p.data.province;
              }
            });
            this.timeoutPop();
            setTimeout(function () {
              vm.loading2 = false;
            }, 2000)
          }
        });
      },
      initProvinceMap1(_province){
        this.axios.get(location.origin + '/static/json/' + _province + '.json').then((res) => {
          if (res.status == 200) {
            clearTimeout(this.timeout);
            echarts.registerMap(_province, res.data);
            this.chinaChart && this.chinaChart.dispose && this.chinaChart.dispose();
            this.chinaChart = echarts.init(document.getElementById('map'));
            this.province.geo.map = _province;
            this.chinaChart.setOption(this.province);
            let vm = this;
            this.chinaChart.on('click', function (p) {
//              console.log(p);
              if (p.seriesType == 'scatter') {
                vm.$router.push({path: '/home/crossborder/1', query: {isActive: 2}});
              }
            })
          }
        });
      },
      provinceChange(v){
        if (v == 'china') {
          this.initChinaMap();
        } else {
          this.initProvinceMap1(v);
        }
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.initChinaMap();
        this.axios.get(location.origin + '/static/json/province/beijing.json')
      })
    }
  }
</script>
<style scoped>

</style>
