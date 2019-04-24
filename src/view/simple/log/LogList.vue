<template>
  <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>日志管理</span>
      </div>
      <el-row>
        <div class="alert-container clearfix">
          <el-alert v-for="alert in alerts.successes" :key="alert.title"
                    v-bind:title="alert.title"
                    type="success"
                    show-icon>
          </el-alert>
          <el-alert v-for="alert in alerts.infos" :key="alert.title"
                    v-bind:title="alert.title"
                    type="info"
                    show-icon>
          </el-alert>
          <el-alert v-for="alert in alerts.warnings" :key="alert.title"
                    v-bind:title="alert.title"
                    type="warning"
                    show-icon>
          </el-alert>
          <el-alert v-for="alert in alerts.errors" :key="alert.title"
                    v-bind:title="alert.title"
                    type="error"
                    show-icon>
          </el-alert>
        </div>
      </el-row>
      <el-row>
        <!--数据表格-->

        <el-col>
          <down-search :selectValues="selectValues" @returnedValue="searchByCondition"></down-search>
          <div class="table-control">
            <div style=" margin-bottom: 15px">
            </div>
            <el-table v-loading="tableLoading" size="small" class="table-style" :data="logs" border
                      highlight-current-row @current-change="handleCurrentChange">
              <el-table-column type="expand" fixed="left">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="list-table-expand">
                    <el-form-item label="标识">
                      <span>{{ props.row.EId }}</span>
                    </el-form-item>
                    <el-form-item label="名称">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="操作员">
                      <span>{{ props.row.operatorName }}</span>
                    </el-form-item>
                    <el-form-item label="操作员">
                      <span>{{ props.row.operatorId }}</span>
                    </el-form-item>
                    <el-form-item label="IP地址">
                      <span>{{ props.row.ipAddress }}</span>
                    </el-form-item>
                    <el-form-item label="日志类型">
                      <span>{{ props.row.logType }}</span>
                    </el-form-item>
                    <el-form-item label="操作实体">
                      <span>{{ props.row.entity }}</span>
                    </el-form-item>
                    <el-form-item label="操作类型">
                      <span>{{ props.row.operationType }}</span>
                    </el-form-item>
                    <el-form-item label="操作时间">
                      <span>{{ props.row.logDate }}</span>
                    </el-form-item>
                    <el-form-item label="操作内容">
                      <span>{{ props.row.operationContent }}</span>
                    </el-form-item>
                    <el-form-item label="url">
                      <span>{{ props.row.url }}</span>
                    </el-form-item>
                    <el-form-item label="模块">
                      <span>{{ props.row.module }}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                      <span>{{ props.row.remark }}</span>
                    </el-form-item>
                    <el-form-item label="创建人">
                      <span>{{ props.row.createId }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                      <span>{{ props.row.createDatetime }}</span>
                    </el-form-item>
                    <el-form-item label="修改人">
                      <span>{{ props.row.updateId }}</span>
                    </el-form-item>
                    <el-form-item label="修改时间">
                      <span>{{ props.row.updateDatetime }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="operatorName" label="操作员" min-width="80" sortable
                               resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="ipAddress" label="IP地址" min-width="80" sortable
                               resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="logType" label="日志类型" min-width="80" sortable
                               resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="entity" label="操作实体" min-width="80" sortable
                               resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="operationType" label="操作类型" min-width="80" sortable
                               resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="logDate" label="操作时间" min-width="80" sortable
                               resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="operationContent" label="操作内容" min-width="80"
                               sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="url" label="url" min-width="80" sortable resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="module" label="模块" min-width="80" sortable
                               resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="remark" label="备注" min-width="80" sortable
                               resizable show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" min-width="120" resizable>
                <template slot-scope="scope">
                  <template>
                    <el-button @click="displayLog(logs[scope.$index].eid)" type="text" size="small"
                    >查看
                    </el-button>
                  </template>
                  <template>
                    <el-button @click="deleteLog(logs[scope.$index].eid)" type="text" size="small"
                               v-permission:simple_log_Log_Delete><p
                      style="color: red !important;">删除</p></el-button>
                  </template>
                </template>
              </el-table-column>
            </el-table>

            <!--分页功能-->
            <div class="block">
              <el-pagination
                class="page-style" @size-change="changeSize" @current-change="changePage"
                background
                :current-page="currentPage"
                :page-sizes="[10, 15, 20, 25]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>
<script>
  import {mapState} from 'vuex';
  import {LogService} from './LogService';
  import downSearch from '@/components/select/downSearch'

  export default {
    components: {downSearch},
    data() {
      return {
        rules: {},
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        hightlight: true,
        logs: [],
        tableLoading: false,
        alerts: {
          remarks: [{title: "功能说明", content: "TODO: 请在这里加上功能说明"},],
          successes: [], //TODO:[{title:'消息内容'},]
          infos: [],
          warnings: [],
          errors: []
        },
        selectValues: [
          {key: "operatorName", value: "操作员"},
          {key: "ipAddress", value: "IP地址"},
          {key: "logType", value: "日志类型"},
          {key: "entity", value: "操作实体"},
          {key: "operationType", value: "操作类型"},
          {key: "logDate", value: "操作时间"},
          {key: "operationContent", value: "操作内容"},
          {key: "url", value: "url"},
          {key: "module", value: "模块"},
          {key: "remark", value: "备注"},
        ],
        condition: ''

      }
    },
    created: function () {
      this.findLogs();
    },
    methods: {
      searchByCondition(value) {
        this.condition = value;
        this.findLogs();
      },
      addAlert(message, title, type) {
        //type 可选的值为:remarks,successes,infos,warnings,errors
        type = type ? type : "errors";
        type = this.alerts[type] ? type : "errors";
        title = title ? title : message;
        this.alerts[type].unshift({title: title, content: message});
      },
      removeAlert(title, type) {
        //type 可选的值为:remarks,successes,infos,warnings,errors
        type = type ? type : "errors";
        type = this.alerts[type] ? type : "errors";
        for (var i = this.alerts[type].length - 1; i >= 0; i--) {
          delete this.alerts[type][i]
        }
      },
      refresh() {
        this.findLogs();
      },
      installParms() {
        var parms = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          columnName: this.condition.columnName,
          content: this.condition.content
        }
        return parms;
      },
      findLogs() {
        var parms = this.installParms();
        this.buttonRequestProgressStart("正在搜索,请稍后...");
        LogService.findLogs(parms).then((res) => {
          this.buttonRequestProgressClose();
          this.logs = res.data.datas;
          this.totalCount = res.data.totalCount;
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      displayLog(logId) {
        var router = this.$router;
        router.push({path: '/simple/log/log/display/' + logId, query: {}});
      },
      deleteLog(logId) {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.buttonRequestProgressStart("正在删除,请稍后...");
          LogService.deleteLog(logId).then((res) => {
            this.buttonRequestProgressClose();
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.refresh();
          }).catch((error) => {
            this.buttonRequestProgressClose();
            //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
            this.isSubmiting = false;
            this.addAlert({title: error.data.message})
            this.$message({
              type: 'error',
              message: '删除失败，,原因是：' + error.data.message
            })

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      changeSize(val) {
        this.pageSize = val;
        this.findLogs();
      },
      changePage(val) {
        this.currentPage = val;
        this.findLogs();
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
