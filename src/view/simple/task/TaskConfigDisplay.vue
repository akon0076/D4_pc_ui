
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/simple/task/taskConfig' }">定时任务配置管理列表</el-breadcrumb-item>
                <el-breadcrumb-item>查看定时任务配置</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ taskConfig.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ taskConfig.name }}</span>
                        </el-form-item>
                        <el-form-item label="任务名称">
                            <span>{{ taskConfig.taskName }}</span>
                        </el-form-item>
                        <el-form-item label="任务类型">
                            <span>{{ taskConfig.taskType }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ taskConfig.createTime }}</span>
                        </el-form-item>
                        <el-form-item label="是否需要参数">
                            <span>{{ taskConfig.isNeedVariable }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ taskConfig.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ taskConfig.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ taskConfig.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ taskConfig.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ taskConfig.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {TaskConfigService} from './TaskConfigService';

export default {
    components: {
    },
    data() {
        return {
            taskConfig:{},
        }
    },
    methods: {
        findTaskConfigForView(taskConfigId)//查找定时任务
        {
            TaskConfigService.findTaskConfigForView(taskConfigId).then((resp) => {
                this.taskConfig = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询定时任务出错'
        })
        })
        },
    },
    created() {
        const taskConfigId = this.$route.params.taskConfigId;
        this.findTaskConfigForView(taskConfigId);
    },
}

</script>
<style scoped lang="scss">

</style>
