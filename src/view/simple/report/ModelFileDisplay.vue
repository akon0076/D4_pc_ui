
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/simple/report/modelFile' }">模板文件管理列表</el-breadcrumb-item>
                <el-breadcrumb-item>查看模板文件</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ modelFile.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ modelFile.name }}</span>
                        </el-form-item>
                        <el-form-item label="模板唯一标识">
                            <span>{{ modelFile.modelKey }}</span>
                        </el-form-item>
                        <el-form-item label="模板名称">
                            <span>{{ modelFile.modelName }}</span>
                        </el-form-item>
                        <el-form-item label="分类目录">
                            <span>{{ modelFile.category }}</span>
                        </el-form-item>
                        <el-form-item label="模板类别">
                            <span>{{ modelFile.modelType }}</span>
                        </el-form-item>
                        <el-form-item label="导出文件名称">
                            <span>{{ modelFile.exportName }}</span>
                        </el-form-item>
                        <el-form-item label="导出文件类型">
                            <span>{{ modelFile.exportFileType }}</span>
                        </el-form-item>
                        <el-form-item label="是否分页">
                            <span>{{ modelFile.isPagenation }}</span>
                        </el-form-item>
                        <el-form-item label="一页展示条数">
                            <span>{{ modelFile.displayNum }}</span>
                        </el-form-item>
                        <el-form-item label="是否添加检索">
                            <span>{{ modelFile.isSearch }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ modelFile.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ modelFile.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ modelFile.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ modelFile.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ modelFile.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {ModelFileService} from './ModelFileService';

export default {
    components: {
    },
    data() {
        return {
            modelFile:{},
        }
    },
    methods: {
        findModelFileForView(modelFileId)//查找模板文件
        {
            ModelFileService.findModelFileForView(modelFileId).then((resp) => {
                this.modelFile = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询模板文件出错'
        })
        })
        },
    },
    created() {
        const modelFileId = this.$route.params.modelFileId;
        this.findModelFileForView(modelFileId);
    },
}

</script>
<style scoped lang="scss">

</style>
