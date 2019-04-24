
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/simple/system/systemConfig' }">系统参数管理列表</el-breadcrumb-item>
                <el-breadcrumb-item>查看系统参数</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="名称">
                            <span>{{ systemConfig.name }}</span>
                        </el-form-item>
                        <el-form-item label="键">
                            <span>{{ systemConfig.systemConfigKey }}</span>
                        </el-form-item>
                        <el-form-item label="值">
                            <span>{{ systemConfig.systemConfigValue }}</span>
                        </el-form-item>
                        <el-form-item label="描述">
                            <span>{{ systemConfig.systemConfigDescription }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ systemConfig.remark }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {SystemConfigService} from './SystemConfigService';

export default {
    components: {
    },
    data() {
        return {
            systemConfig:{},
        }
    },
    methods: {
        findSystemConfigForView(systemConfigId)//查找系统参数
        {
            SystemConfigService.findSystemConfigForView(systemConfigId).then((resp) => {
                this.systemConfig = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询系统参数出错'
        })
        })
        },
    },
    created() {
        const systemConfigId = this.$route.params.systemConfigId;
        this.findSystemConfigForView(systemConfigId);
    },
}

</script>
<style scoped lang="scss">

</style>
