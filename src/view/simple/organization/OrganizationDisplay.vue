
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/simple/organization/Organization' }">单位管理列表</el-breadcrumb-item>
                <el-breadcrumb-item>查看单位</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ organization.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ organization.name }}</span>
                        </el-form-item>
                        <el-form-item label="编码">
                            <span>{{ organization.code }}</span>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <span>{{ organization.linkTel }}</span>
                        </el-form-item>
                        <el-form-item label="地址">
                            <span>{{ organization.address }}</span>
                        </el-form-item>
                        <el-form-item label="上级单位">
                            <span>{{ organization.parentId }}</span>
                        </el-form-item>
                        <el-form-item label="上级单位">
                            <span>{{ organization.parentName }}</span>
                        </el-form-item>
                        <el-form-item label="显示顺序">
                            <span>{{ organization.displayOrder }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ organization.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ organization.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ organization.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ organization.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ organization.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {OrganizationService} from './OrganizationService';

export default {
    components: {
    },
    data() {
        return {
            organization:{},
        }
    },
    methods: {
        findOrganizationForView(organizationId)//查找单位
        {
            OrganizationService.findOrganizationForView(organizationId).then((resp) => {
                this.organization = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询单位出错'
        })
        })
        },
    },
    created() {
        const organizationId = this.$route.params.organizationId;
        this.findOrganizationForView(organizationId);
    },
}

</script>
<style scoped lang="scss">

</style>
