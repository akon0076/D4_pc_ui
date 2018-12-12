
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看操作员角色</span>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ operatorAndRole.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ operatorAndRole.name }}</span>
                        </el-form-item>
                        <el-form-item label="操作员">
                            <span>{{ operatorAndRole.operatorName }}</span>
                        </el-form-item>
                        <el-form-item label="操作员">
                            <span>{{ operatorAndRole.operatorId }}</span>
                        </el-form-item>
                        <el-form-item label="角色">
                            <span>{{ operatorAndRole.roleId }}</span>
                        </el-form-item>
                        <el-form-item label="角色">
                            <span>{{ operatorAndRole.roleName }}</span>
                        </el-form-item>
                        <el-form-item label="单位">
                            <span>{{ operatorAndRole.organizationName }}</span>
                        </el-form-item>
                        <el-form-item label="单位">
                            <span>{{ operatorAndRole.organizationId }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ operatorAndRole.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ operatorAndRole.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ operatorAndRole.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ operatorAndRole.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ operatorAndRole.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {OperatorAndRoleService} from './OperatorAndRoleService';

export default {
    components: {
    },
    data() {
        return {
            operatorAndRole:{},
        }
    },
    methods: {
        findOperatorAndRoleForView(operatorAndRoleId)//查找操作员角色
        {
            OperatorAndRoleService.findOperatorAndRoleForView(operatorAndRoleId).then((resp) => {
                this.operatorAndRole = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询操作员角色出错'
        })
        })
        },
    },
    created() {
        const operatorAndRoleId = this.$route.params.operatorAndRoleId;
        this.findOperatorAndRoleForView(operatorAndRoleId);
    },
}

</script>
<style scoped lang="scss">

</style>
