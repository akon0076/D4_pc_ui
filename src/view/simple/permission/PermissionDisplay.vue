
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/simple/permission/Permission' }">权限点管理列表</el-breadcrumb-item>
                <el-breadcrumb-item>查看权限点</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="编码">
                            <span>{{ permission.code }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ permission.name }}</span>
                        </el-form-item>
                        <el-form-item label="全名">
                            <span>{{ permission.fullName }}</span>
                        </el-form-item>
                        <el-form-item label="模块编码">
                            <span>{{ permission.moduleCode }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ permission.remark }}</span>
                        </el-form-item>

                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {PermissionService} from './PermissionService';

export default {
    components: {
    },
    data() {
        return {
            permission:{},
        }
    },
    methods: {
        findPermissionForView(code)//查找权限点
        {
            PermissionService.findPermissionForView(code).then((resp) => {
                this.permission = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询权限点出错'
        })
        })
        },
    },
    created() {
        const code = this.$route.params.code;
        this.findPermissionForView(code);
    },
}

</script>
<style scoped lang="scss">

</style>
