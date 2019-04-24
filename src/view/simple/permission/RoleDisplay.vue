
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/simple/permission/Role' }">角色管理列表</el-breadcrumb-item>
                <el-breadcrumb-item>查看角色</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ role.EId }}</span>
                        </el-form-item>
                        <el-form-item label="编码">
                            <span>{{ role.code }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ role.name }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ role.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ role.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ role.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ role.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ role.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {RoleService} from './RoleService';

export default {
    components: {
    },
    data() {
        return {
            role:{},
        }
    },
    methods: {
        findRoleForView(roleId)//查找角色
        {
            RoleService.findRoleForView(roleId).then((resp) => {
                this.role = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询角色出错'
        })
        })
        },
    },
    created() {
        const roleId = this.$route.params.roleId;
        this.findRoleForView(roleId);
    },
}

</script>
<style scoped lang="scss">

</style>
