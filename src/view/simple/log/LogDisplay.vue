<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/simple/log/Log' }">日志管理列表</el-breadcrumb-item>
          <el-breadcrumb-item>查看日志</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-form label-position="left" inline class="display-form">
          <el-form-item label="名称">
            <span>{{ log.name }}</span>
          </el-form-item>
          <el-form-item label="操作员">
            <span>{{ log.operatorName }}</span>
          </el-form-item>
          <el-form-item label="操作员">
            <span>{{ log.operatorId }}</span>
          </el-form-item>
          <el-form-item label="IP地址">
            <span>{{ log.ipAddress }}</span>
          </el-form-item>
          <el-form-item label="日志类型">
            <span>{{ log.logType }}</span>
          </el-form-item>
          <el-form-item label="操作实体">
            <span>{{ log.entity }}</span>
          </el-form-item>
          <el-form-item label="操作类型">
            <span>{{ log.operationType }}</span>
          </el-form-item>
          <el-form-item label="操作时间">
            <span>{{ log.logDate }}</span>
          </el-form-item>
          <el-form-item label="操作内容">
            <span>{{ log.operationContent }}</span>
          </el-form-item>
          <el-form-item label="url">
            <span>{{ log.url }}</span>
          </el-form-item>
          <el-form-item label="模块">
            <span>{{ log.module }}</span>
          </el-form-item>
          <el-form-item label="备注">
            <span>{{ log.remark }}</span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {LogService} from './LogService';

  export default {
    components: {},
    data() {
      return {
        log: {},
      }
    },
    methods: {
      findLogForView(logId)//查找日志
      {
        LogService.findLogForView(logId).then((resp) => {
          this.log = resp.data;
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询日志出错'
          })
        })
      },
    },
    created() {
      const logId = this.$route.params.logId;
      this.findLogForView(logId);
    },
  }

</script>
<style scoped lang="scss">

</style>
