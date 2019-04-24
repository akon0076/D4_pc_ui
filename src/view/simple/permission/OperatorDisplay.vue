
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/simple/permission/Operator' }">操作员管理列表</el-breadcrumb-item>
                <el-breadcrumb-item>查看操作员</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ operator.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ operator.name }}</span>
                        </el-form-item>
                        <el-form-item label="编码">
                            <span>{{ operator.code }}</span>
                        </el-form-item>
                        <el-form-item label="密码">
                            <span>{{ operator.passWord }}</span>
                        </el-form-item>
                        <el-form-item label="状态">
                            <span>{{ operator.status }}</span>
                        </el-form-item>
                        <el-form-item label="类型">
                            <span>{{ operator.type }}</span>
                        </el-form-item>
                        <el-form-item label="人员ID">
                            <span>{{ operator.personId }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ operator.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ operator.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ operator.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ operator.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ operator.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {OperatorService} from './OperatorService';

export default {
    components: {
    },
    data() {
        return {
            operator:{},
        }
    },
    methods: {
        findOperatorForView(operatorId)//查找操作员
        {
            OperatorService.findOperatorForView(operatorId).then((resp) => {
                this.operator = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询操作员出错'
        })
        })
        },
    },
    created() {
        const operatorId = this.$route.params.operatorId;
        this.findOperatorForView(operatorId);
    },
}

</script>
<style scoped lang="scss">

</style>
