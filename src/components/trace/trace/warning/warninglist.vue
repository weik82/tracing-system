<template>
  <div class="ms-main">
    <div class="ms-all-table content-wrap">
      <div class="content-header">
        <span class="content-header-title">全网异常预警商品列表</span>
        <div class="content-header-form">
          <el-select v-model="config.province" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in config.provinceOptions"
              :label="item.label"
              :value="item.value"
              :key="item.value">
            </el-option>
          </el-select>
          <el-select v-model="config.platformId" placeholder="请选择" style="width: 200px;margin-left: 20px">
            <el-option
              v-for="item in config.platformOptions"
              :label="item.platform"
              :value="item.sysid"
              :key="item.sysid">
            </el-option>
          </el-select>
          <el-button type="primary" @click="searchList" style="margin-left: 20px">搜索</el-button>
        </div>
      </div>
      <div style="width: 100%;height: calc(100% - 80px)">
        <el-table class="space-nowrap" highlight-current-row :data="warnData" style="height: 100%;width: 100%"
                  height="'100%'">
          <el-table-column
            prop="productname"
            label="商品名称"
            width="170">
          </el-table-column>
          <el-table-column
            prop="scancnt"
            label="扫描次数"
            width="100">
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
            prop="address"
            label="报检次数/商品数"
            width="150">
            <template scope="scope">
              <span>{{ scope.row.inspectcnt + ' / ' + scope.row.tagcnt}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="报关省份"
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
      </div>
      <div class="ms-pagination" style="background-color: #eef1f6;padding-top: 4px">
        <el-pagination
          @current-change="getWarnList"
          :current-page="config.currentPage"
          :page-size="config.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="config.total">
        </el-pagination>
      </div>
    </div>
    <div class="ms-pagination" style="padding-top: 4px;">
      <el-button type="primary" @click="toToggle(1)">返回</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        config: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
          province: null,
          platformId: null,
          provinceOptions: [
            {label: '全网', value: null}
          ],
          platformOptions: [
            {platform: '全网追溯系统', sysid: null}
          ]
        },
        warnData: []
      }
    },
    methods: {
      toToggle(flag){
        this.$emit('toggleItem', flag);
      },
      getProvinceData(){
        this.axios.post('/statistics/getprovincedata', {})
          .then((res) => {
            if (res.status == 200) {
              res.data.forEach((item) => {
                this.config.provinceOptions.push({label: item, value: item})
              })
            }
          })
      },//获取下拉省份信息
      getAllSystem(){
        this.axios.post('/statistics/getallsystem', {})
          .then((res) => {
            if (res.status == 200) {
              this.config.platformOptions.push(...res.data);
            }
          })
      },
      getWarnList(currentpage){
        let _data = {
          province: this.config.province,
          platformid: this.config.platformId,
          pageflag: 1,
          currentpage: currentpage - 1,
          pagesize: this.config.pageSize
        };
        this.axios.post('/statistics/getwarningproductlist', _data)
          .then((res) => {
            if (res.status == 200 && res.data.result == 0) {
              this.warnData = res.data.data;
              this.config.total = res.data.totalnum;
            } else {
              this.warnData = [];
              this.config.total = 0;
            }
          })
      },
      searchList(){
        this.config.currentPage = 1;
        this.getWarnList(1);
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.getProvinceData();
        this.getAllSystem();
        this.getWarnList(1);
      })
    }
  }
</script>
<style scoped>
  .ms-main {
    height: 100%;
    min-height: 100%;
  }

  .ms-main > .ms-all-table {
    height: calc(100% - 40px);
  }

</style>
