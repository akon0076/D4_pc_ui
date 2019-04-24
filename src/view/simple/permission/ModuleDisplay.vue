
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/simple/permission/Module' }">模块管理列表</el-breadcrumb-item>
                <el-breadcrumb-item>查看模块</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form" label-width="200px">
                        <el-form-item label="标识">
                            <span>{{ module.EId }}</span>
                        </el-form-item>
                        <el-form-item label="编码">
                            <span>{{ module.code }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ module.name }}</span>
                        </el-form-item>
                        <el-form-item label="URL地址">
                            <span>{{ module.url }}</span>
                        </el-form-item>
                        <el-form-item label="路由">
                            <span>{{ module.route }}</span>
                        </el-form-item>
                        <el-form-item label="图标">
                            <span>{{ module.iconClass }}</span>
                        </el-form-item>
                        <el-form-item label="显示顺序">
                            <span>{{ module.displayIndex }}</span>
                        </el-form-item>
                        <el-form-item label="上级模块">
                            <span>{{ module.parentId }}</span>
                        </el-form-item>
                        <el-form-item label="模块类型">
                            <span>{{ module.moduleType }}</span>
                        </el-form-item>
                        <el-form-item label="上级模块编码">
                            <span>{{ module.parentCode }}</span>
                        </el-form-item>
                        <el-form-item label="在用">
                            <span>{{ module.isInUse }}</span>
                        </el-form-item>
                        <el-form-item label="路由参数对象">
                            <span>{{ module.routeParamsObj }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ module.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ module.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ module.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ module.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ module.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {ModuleService} from './ModuleService';

export default {
    components: {
    },
    data() {
        return {
            module:{},
        }
    },
    methods: {
        findModuleForView(moduleId)//查找模块
        {
            ModuleService.findModuleForView(moduleId).then((resp) => {
                this.module = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询模块出错'
        })
        })
        },
    },
    created() {
        const moduleId = this.$route.query.moduleCode;
        this.findModuleForView(moduleId);
    },
}

</script>
<style scoped lang="scss">

</style>
