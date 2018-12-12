
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看角色权限点</span>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ roleAndPermission.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ roleAndPermission.name }}</span>
                        </el-form-item>
                        <el-form-item label="权限点编码">
                            <span>{{ roleAndPermission.permissionCode }}</span>
                        </el-form-item>
                        <el-form-item label="角色Id">
                            <span>{{ roleAndPermission.roleId }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ roleAndPermission.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ roleAndPermission.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ roleAndPermission.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ roleAndPermission.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ roleAndPermission.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {RoleAndPermissionService} from './RoleAndPermissionService';

export default {
    components: {
    },
    data() {
        return {
            roleAndPermission:{},
        }
    },
    methods: {
        findRoleAndPermissionForView(roleAndPermissionId)//查找角色权限点
        {
            RoleAndPermissionService.findRoleAndPermissionForView(roleAndPermissionId).then((resp) => {
                this.roleAndPermission = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询角色权限点出错'
        })
        })
        },
    },
    created() {
        const roleAndPermissionId = this.$route.params.roleAndPermissionId;
        this.findRoleAndPermissionForView(roleAndPermissionId);
    },
}

</script>
<style scoped lang="scss">

</style>
