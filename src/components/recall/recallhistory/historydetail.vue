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
                        :url="downloadUrl"></v-download>
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
        downloadUrl: location.origin + '/static/data.txt',
        config: {
          currentPage: 1,
          pageSize: 10,
          total: 3
        },
        detailData: {
          list: [
            {
              id: '00000001',
              name: '雀巢中小学儿童营养奶粉钙铁锌1kg',
              vendor: '雀巢公司',
              system: '跨境电商追溯平台',
              organization: '首都机场出入境检验检疫局',
              port: '北京口岸/北京',
              count: '30/100',
              pdate: '2015-01-02',
              idate: '2016-01-01',
              producer: '雀巢公司',
              origin: '美国',
              country: '美国',
              code: '1234567',
              ciqcode: '10000001',
              indate: '2016-01-02',
            },
            {
              id: '00000002',
              name: '雀巢成人奶粉全脂900g无蔗糖',
              vendor: '雀巢公司',
              system: '宁波跨境电商追溯平台',
              organization: '宁波出入境检验检疫局',
              port: '浙江口岸/宁波',
              count: '50/120',
              pdate: '2016-01-02',
              idate: '2016-02-01',
              producer: '雀巢公司',
              origin: '美国',
              country: '美国',
              code: '7654321',
              ciqcode: '10000002',
              indate: '2016-03-02'
            },
            {
              id: '00000003',
              name: '雅培亲体欧洲原罐装进口奶粉3段900g',
              vendor: '雅培公司',
              system: '跨境电商追溯平台',
              organization: '首都机场出入境检验检疫局',
              port: '北京口岸/北京',
              count: '30/100',
              pdate: '2015-03-10',
              idate: '2016-03-19',
              producer: '雅培公司',
              origin: '美国',
              country: '美国',
              code: '1234567',
              ciqcode: '10000001',
              indate: '2016-03-20'
            },
            {
              id: '00000004',
              name: '新西兰进口全脂奶粉',
              vendor: '绿色新西兰集团',
              system: '跨境电商追溯平台',
              organization: '首都机场出入境检验检疫局',
              port: '北京口岸/北京',
              count: '30/100',
              pdate: '2015-03-10',
              idate: '2016-03-19',
              producer: '绿色新西兰集团',
              origin: '新西兰',
              country: '新西兰',
              code: '1234567',
              ciqcode: '10000001',
              indate: '2016-03-20'
            },
            {
              id: '00000005',
              name: '澳洲进口康培尔conbair山羊奶粉400g儿童',
              vendor: '康培尔',
              system: '跨境电商追溯平台',
              organization: '首都机场出入境检验检疫局',
              port: '北京口岸/北京',
              count: '30/100',
              pdate: '2015-03-10',
              idate: '2016-03-19',
              producer: '康培尔',
              origin: '澳洲',
              country: '澳洲',
              code: '1234567',
              ciqcode: '10000001',
              indate: '2016-03-20'
            }
          ],
          reason: '产品中文标签不符合规定',
          notice: '包装问题，标签标志问题',
          fileId: 123,
          fileName: '文件123.docx'
        },
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
