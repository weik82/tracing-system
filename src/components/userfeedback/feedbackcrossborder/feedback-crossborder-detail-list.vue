<template>
  <div class="ms-main">
    <div class="ms-all-table content-wrap">
      <div class="content-header">
        <span class="content-header-title">{{option.trade}}反馈详情</span>
        <div class="content-header-form">
          <el-button class="el-button-1" :plain="true" :class="{'tag-active':option.tag==0}" type="info"
                     @click="getDetailList(0)">全部反馈
          </el-button>
          <el-button class="el-button-1" :plain="true" :class="{'tag-active':option.tag==1}" type="info"
                     @click="getDetailList(1)">只看差评
          </el-button>
        </div>
      </div>
      <div style="width: 100%;height: calc(100% - 80px)">
        <el-table :row-class-name="tableRowClassName" :data="filterTableData" style="height: 100%;width: 100%"
                  height="'100%'">
          <el-table-column
            prop="name"
            label="商品名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="comment"
            label="评价内容"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="address"
            label="所在地点">
          </el-table-column>
          <el-table-column
            prop="system"
            label="所属系统">
          </el-table-column>
          <el-table-column
            prop="insCode"
            label="报检单号">
          </el-table-column>
          <el-table-column
            prop="id"
            label="唯一ID">
          </el-table-column>
        </el-table>
      </div>
      <div class="ms-pagination" style="background-color: #eef1f6;padding-top: 4px">
        <el-pagination
          @current-change=""
          :current-page="config.currentPage"
          :page-size="config.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="config.total">
        </el-pagination>
        <span class="down-excel">导出excel</span>
      </div>
    </div>
    <div class="ms-pagination" style="padding-top: 4px;">
      <el-button type="primary" @click="toToggle('list')">返回</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    data(){
      return {
        config: {
          currentPage: 1,
          pageSize: 10,
          total: 3
        },
        option: this.options,
        tableData: [
          {
            trade:'乳与乳制品',
            name: '乳制品1',
            comment: '味道不错,和上次买的差不多',
            date: '2017-01-02',
            address: '上海',
            system: '跨境电商追溯系统',
            insCode: 1234554,
            id: '000001',
            tag: 0
          },
          {
            trade:'乳与乳制品',
            name: '乳制品2',
            comment: '味道不错,和上次买的差不多',
            date: '2017-01-02',
            address: '上海',
            system: '跨境电商追溯系统',
            insCode: 1234554,
            id: '000002',
            tag: 0
          },
          {
            trade:'酒类',
            name: '酒类1',
            comment: '味道不错,和上次买的差不多',
            date: '2017-02-02',
            address: '北京',
            system: '跨境电商追溯系统',
            insCode: 12563351,
            id: '000002',
            tag: 0
          },
          {
            trade:'酒类',
            name: '酒类2',
            comment: '味道不好,有异味,差评',
            date: '2017-03-02',
            address: '上海',
            system: '跨境电商追溯系统',
            insCode: 14533663,
            id: '000003',
            tag: 1
          },
          {
            trade: '器械行业',
            name: '器械行业1',
            comment: '味道不好,有异味,差评',
            date: '2017-03-02',
            address: '上海',
            system: '跨境电商追溯系统',
            insCode: 14533663,
            id: '000003',
            tag: 1
          },
          {
            trade: '器械行业',
            name: '器械行业2',
            comment: '味道不好,有异味,差评',
            date: '2017-03-02',
            address: '上海',
            system: '跨境电商追溯系统',
            insCode: 14533663,
            id: '000003',
            tag: 1
          }
        ]
      }
    },
    methods: {
      toToggle(type){
        this.$emit('toggleItem', type);
      },
      getDetailList(tag){
        this.option.tag = tag;
      },
      tableRowClassName(row, index){
        if (row.tag == 1) {
          return 'info-row';
        }
        return '';
      }
    },
    computed: {
      filterTableData(){
        let _arr = [], _tag = this.option.tag, _trade = this.option.trade;
        if (_tag == 0) {
          _arr = this.tableData.filter((item) => {
            return item.trade == _trade;
          });
        } else {
          _arr = this.tableData.filter((item) => {
            return item.tag == _tag && item.trade == _trade;
          });
        }
        return _arr;
      }
    },
    mounted(){
      this.$nextTick(function () {

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

  .el-table .cell {
    white-space: normal !important;
  }

  .tag-active {
    color: #50bfff;
    border-color: #50bfff;
  }

  .el-button-1:not(.tag-active) {
    border-color: transparent;
  }

</style>
