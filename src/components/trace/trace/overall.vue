<template>
  <div class="ms-main ms-main-flex">
    <div class="ms-left-chart">
      <div style="width: 100%;height: 100%" id="map"></div>
      <transition-group name="move" mode="out-in">
        <v-pop v-if="popInfo.showPop" v-for="(item, index) in popInfo.popItems"
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
        <p class="title">{{detailInfo.name}}统计</p>
        <p>企业备案(家)</p>
        <span>{{detailInfo.vendorcount}}</span>
        <p>产品备案(个)</p>
        <span>{{detailInfo.productcount}}</span>
        <p>商品累计加贴数量(件)</p>
        <span>{{detailInfo.tagcount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {geoCoordMap} from '../../../config/config'
  import vPop from '../../common/pop.vue'
  let provinceMap = {
    '北京': 'beijing',
    '浙江': 'zhejiang',
    '广东': 'guangdong'
  };
  export default {
    components: {
      vPop
    },
    data(){
      return {
        timeout: null,
        popInfo: {
          showPop: false,
          popItems: [],
          popCity: []
        },
        value: 'china',
        options: [
          {label: '全国', value: 'china'}
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
            backgroundColor: '',
            borderColor: '',
            position: 'left',
            formatter: function (v) {
              if (v.seriesType == 'map' && v.data && v.data.vendorcount) {
                return '<div class="ms-outer-wrap">' +
                  '<div class="ms-tooltip"> ' +
                  '<div class="tip-up"></div><div class="tip-down"></div> ' +
                  '<div class="tip-detail"> ' +
                  '<p class="tip-role">' + v.name + '</p> ' +
                  '<p>企业备案：' + v.data.vendorcount + '(家)</p> ' +
                  '<p>商品备案：' + v.data.productcount + '(个)</p> ' +
                  '<p>商品累计加贴数量2：' + v.data.tagcount + '(件)</p> ' +
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
            data: []
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
          series: []
        },//中国地图option
        province: {
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
            backgroundColor: '',
            borderColor: '',
            position: 'left',
            formatter: function (v) {
              return '<div class="ms-outer-wrap">' +
                '<div class="ms-tooltip"> ' +
                '<div class="tip-up"></div><div class="tip-down"></div> ' +
                '<div class="tip-detail"> ' +
                '<p class="tip-role">' + v.name + '</p> ' +
                '<p>企业备案：' + v.data.vendorcount + '(家)</p> ' +
                '<p>商品备案：' + v.data.productcount + '(个)</p> ' +
                '<p>商品累计加贴数量：' + v.data.tagcount + '(件)</p> ' +
                '</div></div></div>';
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
            data: []
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
          series: []
        },//省份地图option
        detailInfo: {}//详细统计
      }
    },
    methods: {
      getCountData(obj){
        this.axios.post('/statistics/getcountdata', obj)
          .then((res) => {
            if (res.status == 200) {
              this.detailInfo = res.data;
              this.detailInfo.name = '全网';
            }
          })
      },//获取全国系统信息
      getProvinceData(){
        this.axios.post('/statistics/getprovincedata', {})
          .then((res) => {
            if (res.status == 200) {
              res.data.forEach((item) => {
                this.options.push({label: item, value: item})
              })
            }
          })
      },//获取下拉省份信息
      getGeoData(){
        this.axios.post('/statistics/getgeodata', {})
          .then((res) => {
            if (res.status == 200) {
              let _series = [], _legendData = [], _data = res.data;
              _series.push({
                name: '省份',
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
                data: _data.provstaticdata
              });
              let locateData = _data.systemallocatedata;
              locateData.forEach((item) => {
                let _arr = [], _popCity = [];
                item.data.forEach((sitem) => {
                  _arr.push({
                    name: sitem.city,
                    value: geoCoordMap[sitem.city],
                  });
                  _popCity.push(sitem.city);
                });
                this.popInfo.popCity = _popCity;
                _legendData.push({
                  name: item.platform,
                  icon: 'image://static/image/icon' + item.sysid + '.png'
                });
                _series.push({
                  name: item.platform,
                  type: 'scatter',
                  coordinateSystem: 'geo',
                  symbolSize: [27, 36],
                  symbolOffset: [0, '-50%'],
                  symbol: 'image://static/image/icon' + item.sysid + '.png',
                  data: _arr,
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
                });
              });
              this.china.legend.data = _legendData;
              this.china.series = _series;
              this.initChinaMap();
            }
          })
      },//获取全国地图信息
      getProvinceGeoData(province){
        this.popInfo.showPop = false;
        this.axios.post('/statistics/getgeodata', {province: province})
          .then((res) => {
            if (res.status == 200) {
              let _data = res.data,
                locateData = _data.systemallocatedata;
              this.detailInfo = _data.provstaticdata[0];
              this.initProvinceMap(province, locateData);
            }
          })
      },//获取省份地图信息
      timeoutPop(){
        let vm = this;
        this.timeout = setTimeout(function () {
          let seriesModel = vm.chinaChart.getModel().getSeriesByIndex(1),
            coordSys = seriesModel.coordinateSystem,
            _len = vm.popInfo.popCity.length,
            _randomIndex = Math.floor(Math.random() * _len),
            point = coordSys.dataToPoint(geoCoordMap['北京']), _tpyeId = 1;
          _tpyeId = Math.random() > 0.5 ? 2 : 1;
          let arr = [{typeId: _tpyeId, position: point}];
          vm.popInfo.popItems.push(...arr);
          vm.popInfo.showPop = true;
          if (_tpyeId == 1) {
            vm.detailInfo.vendorcount += Math.floor(Math.random() * 5);
          } else {
            vm.detailInfo.productcount += Math.floor(Math.random() * 10);
          }
          let t = null;
          t = setTimeout(function () {
            vm.popInfo.showPop = false;
            clearTimeout(t);
          }, 5000);
          vm.timeoutPop();
        }, 60 * 1000)
      },//悬浮气泡
      initChinaMap(){
        this.axios.get(location.origin + '/static/json/china.json').then((res) => {
          if (res.status == 200) {
            echarts.registerMap('china', res.data);
            this.chinaChart && this.chinaChart.dispose && this.chinaChart.dispose();
            this.chinaChart = echarts.init(document.getElementById('map'));
            this.chinaChart.setOption(this.china);
            let vm = this;
            this.chinaChart.on('click', function (p) {
              if (p.seriesType == 'map' && p.data.selected) {
                vm.value = p.data.name;
              }
            });
            this.timeoutPop();
          }
        });
      },//初始化中国地图
      initProvinceMap(_province, locateData){
        this.province.title.text = _province + '追溯系统分布图';
        _province = provinceMap[_province];
        this.axios.get(location.origin + '/static/json/province/' + _province + '.json').then((res) => {
          if (res.status == 200) {
            clearTimeout(this.timeout);
            echarts.registerMap(_province, res.data);
            this.chinaChart && this.chinaChart.dispose && this.chinaChart.dispose();
            this.chinaChart = echarts.init(document.getElementById('map'));
            this.province.geo.map = _province;
            let _series = [], _legendData = [], _position = echarts.getMap(_province).geoJson.features;
            locateData.forEach((item) => {
              let _arr = [];
              item.data.forEach((sitem) => {
                let _geoCoord;
                _position.forEach((pitem) => {
                  if (pitem.properties.name.indexOf(sitem.city) > -1) {
                    _geoCoord = pitem.properties.cp;
                  }
                });
                _arr.push({
                  name: sitem.platform,
                  value: _geoCoord,
                  productcount: sitem.productcount,
                  tagcount: sitem.tagcount,
                  vendorcount: sitem.vendorcount,
                  sysid: item.sysid
                });
              });
              _legendData.push({
                name: item.platform,
                icon: 'image://static/image/icon' + item.sysid + '.png'
              });
              _series.push({
                name: item.platform,
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'image://static/image/icon' + item.sysid + '.png',
                symbolSize: [27, 36],
                symbolOffset: [0, '-50%'],
                data: _arr,
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
              });
            });
            this.province.legend.data = _legendData;
            this.province.series = _series;
            this.chinaChart.setOption(this.province);
            let vm = this;
            this.chinaChart.on('click', function (p) {
              console.log(p);
              let _sysid = p.data.sysid;
              if (p.seriesType == 'scatter') {
                vm.$router.push({path: '/home/crossborder/' + _sysid, query: {isActive: 2}});
              }
            })
          }
        });
      },//初始化省份地图
      provinceChange(v){
        console.log('change' + v);
        if (v == 'china') {
          this.getCountData({});
          this.getGeoData();
        } else {
          this.getProvinceGeoData(v);
        }
      }//中国和省份地图切换
    },
    mounted(){
      this.$nextTick(function () {
        this.getCountData({});
        this.getProvinceData();
        this.getGeoData({});
      })
    }
  }
</script>
<style scoped>

</style>
