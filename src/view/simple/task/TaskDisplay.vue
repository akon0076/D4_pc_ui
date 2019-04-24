
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/simple/task/task' }">定时任务管理列表</el-breadcrumb-item>
                <el-breadcrumb-item>查看定时任务</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="名称">
                            <span>{{ task.name }}</span>
                        </el-form-item>
                        <el-form-item label="任务编码">
                            <span>{{ task.taskId }}</span>
                        </el-form-item>
                        <el-form-item label="表达式">
                            <span>{{ task.taskExpression }}</span>
                        </el-form-item>
                        <el-form-item label="发布人">
                            <span>{{ task.taskPublisher }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ task.taskCreateTime }}</span>
                        </el-form-item>
                        <el-form-item label="完成时间">
                            <span>{{ task.taskCompleteTime }}</span>
                        </el-form-item>
                        <el-form-item label="任务状态">
                            <span>{{ task.taskStatus }}</span>
                        </el-form-item>
                        <el-form-item label="执行任务类">
                            <span>{{ task.taskClass }}</span>
                        </el-form-item>
                        <el-form-item label="执行任务变量">
                            <span>{{ task.taskVariable }}</span>
                        </el-form-item>
                        <el-form-item label="任务配置ID">
                            <span>{{ task.taskConfigId }}</span>
                        </el-form-item>
                        <el-form-item label="任务组">
                            <span>{{ task.taskGroup }}</span>
                        </el-form-item>
                        <el-form-item label="任务名称">
                            <span>{{ task.taskName }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ task.remark }}</span>
                        </el-form-item>

                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {TaskService} from './TaskService';

export default {
    components: {
    },
    data() {
        return {
            task:{},
        }
    },
    methods: {
        findTaskForView(taskId)//查找定时任务
        {
            TaskService.findTaskForView(taskId).then((resp) => {
                this.task = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询定时任务出错'
        })
        })
        },
    },
    created() {
        const taskId = this.$route.params.taskId;
        this.findTaskForView(taskId);
    },
}

</script>
<style scoped lang="scss">

</style>
