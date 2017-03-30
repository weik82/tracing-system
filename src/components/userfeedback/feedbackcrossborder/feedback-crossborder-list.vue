<template>
  <div class="ms-main">
    <div class="ms-all-table content-wrap">
      <div class="content-header">
        <span class="content-header-title">系统各行业反馈数</span>
        <div class="content-header-form">
          <el-form ref="form" :model="form" :inline="true" label-width="0" label-position="left">
            <el-form-item label="">
              <el-input placeholder="请输入行业" v-model="form.trade" style="width: 240px;">
                <el-button slot="append" type="primary" icon="search" @click="search">搜索</el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="width: 100%;height: calc(100% - 80px)">
        <el-table :data="tableData" style="height: 100%;width: 100%" height="'100%'">
          <el-table-column
            prop="trade"
            label="所属行业">
          </el-table-column>
          <el-table-column
            prop="aCount"
            label="反馈总数"
            width="280">
            <template scope="scope">
              <a @click="cellClick(scope.$index,scope.row,0,$event)" class="cell-click">{{scope.row.aCount}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="bCount"
            label="差评数"
            width="280">
            <template scope="scope">
              <a @click="cellClick(scope.$index,scope.row,1,$event)" class="cell-click">{{scope.row.bCount}}</a>
            </template>
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
      </div>
    </div>
    <div class="ms-pagination" style="padding-top: 4px;">
      <el-button type="primary" @click="toToggle('chart')">返回</el-button>
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
        form: {
          trade: ''
        },
        option: this.options,
        tableData: [
          {
            trade: '乳与乳制品',
            aCount: 344571,
            bCount: 1244
          },
          {
            trade: '酒类',
            aCount: 344571,
            bCount: 1244
          },
          {
            trade: '器械行业',
            aCount: 344571,
            bCount: 1244
          }
        ]
      }
    },
    methods: {
      search(){

      },
      toToggle(type){
        this.$emit('toggleItem', type);
      },
      cellClick(index, row, tag, event){
        event.preventDefault();
//        this.$router.push({path: '/home/fb_crossborder', query: {plan: 'private'}, params: {userId: 123}});
        console.log(index, row, event);
        this.option.tag = tag;
        this.option.trade = row.trade;
        this.toToggle('detail');
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
    min-width: 1100px;
  }

  .ms-main > .ms-all-table {
    height: calc(100% - 40px);
  }

  .el-form-item {
    margin: 0;
  }

  .cell-click {
    cursor: pointer;
    text-decoration: underline;
    color: #0081ED;
  }
</style>
