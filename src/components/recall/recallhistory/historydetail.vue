<template>
  <div class="ms-main">
    <div class="main-header">
      <span class="content-header-title">{{options.id}}召回详情</span>
    </div>
    <div class="ms-half-table content-wrap">
      <div class="content-header">
        <span class="content-header-title">召回商品列表</span>
      </div>
      <div style="width: 100%;height: calc(100% - 80px)">
        <el-table class="space-nowrap" :data="detailData.list" style="height: 100%;width: 100%" height="'100%'">
          <el-table-column
            prop="name"
            label="商品名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="vendor"
            label="所属企业"
            width="150">
          </el-table-column>
          <el-table-column
            prop="system"
            label="所属系统"
            width="150">
          </el-table-column>
          <el-table-column
            prop="organization"
            label="所属机构"
            width="150">
          </el-table-column>
          <el-table-column
            prop="port"
            label="报关口岸/所在省份"
            width="160">
          </el-table-column>
          <el-table-column
            prop="count"
            label="报检次数/报检商品数"
            width="170">
          </el-table-column>
          <el-table-column
            prop="pdate"
            label="生产日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="idate"
            label="报检日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="producer"
            label="生产商"
            width="150">
          </el-table-column>
          <el-table-column
            prop="origin"
            label="产地"
            width="90">
          </el-table-column>
          <el-table-column
            prop="country"
            label="原产国"
            width="90">
          </el-table-column>
          <el-table-column
            prop="code"
            label="商品条码"
            width="110">
          </el-table-column>
          <el-table-column
            prop="ciqcode"
            label="CIQ编码"
            width="110">
          </el-table-column>
          <el-table-column
            prop="indate"
            label="入境日期"
            width="120">
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
    <div class="content-wrap">
      <div class="content-header">
        <span class="content-header-title">召回原因及公告</span>
      </div>
      <div class="detail-wrap">
        <el-row>
          <el-col :span="8">
            <span class="info">召回原因</span>
          </el-col>
          <el-col :span="8">
            <span class="info">召回公告</span>
          </el-col>
          <el-col :span="8">
            <span class="info">附件</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            {{detailData.reason}}
          </el-col>
          <el-col :span="8">
            {{detailData.notice}}
          </el-col>
          <el-col :span="8">
            {{detailData.fileName}}
            <el-button type="text" @click="downloadFile" size="mini">下载</el-button>
            <v-download ref="download" content-type="application/msword;charset=UTF-8" file-name="1.txt"
                        url="/static/data.txt"></v-download>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="ms-pagination" style="padding-top: 4px;">
      <el-button type="primary" @click="toList()">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {recallDetail} from '../../../config/config';
  import vDownload from '../../common/download.vue'
  export default {
    components: {
      vDownload
    },
    props: {
      option: {
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
        detailData: recallDetail,
        options: this.option
      }
    },
    methods: {
      toList(){
        let option = {
          type: 'list',
          config: {}
        };
        this.$emit('toggleItem', option);
      },
      downloadFile(){
        this.$refs.download.downloadFile();
      }
    },
    mounted(){
      this.$nextTick(function () {
        console.log('111111122')
      })
    }
  }
</script>
<style scoped>
  .ms-main {
    height: 100%;
    min-height: 100%;
    padding: 0 1% 1%;
    min-width: 1100px;
  }

  .ms-main > .ms-half-table {
    height: calc(100% - 150px);
    margin-bottom: 10px;
  }

  .detail-wrap {
    padding: 5px 20px;
  }

  .detail-wrap .info {
    font-weight: bold;
  }

  .el-row {
    font-size: 15px;
    padding: 5px;
  }
</style>
