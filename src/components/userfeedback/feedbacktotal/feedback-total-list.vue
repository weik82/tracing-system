<template>
  <div class="ms-main">
    <div class="ms-all-table content-wrap">
      <div class="content-header">
        <span class="content-header-title">全网各行业各系统反馈数</span>
        <div class="content-header-form">
          <el-form ref="form" :model="form" :inline="true" label-width="0" label-position="left">
            <el-form-item label="">
              <el-input placeholder="请输入行业" v-model="form.name" style="width: 240px;">
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
            label="所属行业"
            width="240">
          </el-table-column>
          <el-table-column
            prop="aCount"
            label="跨境电商追溯系统反馈总数"
            width="280">
            <template scope="scope">
              <a @click="cellClick(scope.$index,scope.row,$event,1)" class="cell-click">{{scope.row.aCount}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="bCount"
            label="宁波跨境追溯系统反馈总数"
            width="280">
            <template scope="scope">
              <a @click="cellClick(scope.$index,scope.row,$event,2)" class="cell-click">{{scope.row.bCount}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalCount"
            label="反馈总数">
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
    data(){
      return {
        config: {
          currentPage: 1,
          pageSize: 10,
          total: 3
        },
        form: {
          name: ''
        },
        tableData: [
          {
            trade: '乳与乳制品',
            aCount: 344571,
            bCount: 124447,
            totalCount: 469018
          },
          {
            trade: '酒类',
            aCount: 344571,
            bCount: 124447,
            totalCount: 469018
          },
          {
            trade: '器械行业',
            aCount: 344571,
            bCount: 124447,
            totalCount: 469018
          }
        ]
      }
    },
    methods: {
      toToggle(type){
        this.$emit('toggleItem', type);
      },
      cellClick(index, row, event, id){
        event.preventDefault();
        this.$router.push({path: '/home/fb_crossborder/' + id, query: {trade: row.trade}, params: {userId: 123}});
        console.log(index, row, event);
//        this.toToggle('detail');
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
