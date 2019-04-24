
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/simple/system/CodeTable' }">码表管理列表</el-breadcrumb-item>
                <el-breadcrumb-item>查看码表</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="名称">
                            <span>{{ codeTable.name }}</span>
                        </el-form-item>
                        <el-form-item label="码表全名">
                            <span>{{ codeTable.fullname }}</span>
                        </el-form-item>
                        <el-form-item label="码表类型">
                            <span>{{ codeTable.codeType }}</span>
                        </el-form-item>
                        <el-form-item label="显示顺序">
                            <span>{{ codeTable.displayOrder }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {CodeTableService} from './CodeTableService';

export default {
    components: {
    },
    data() {
        return {
            codeTable:{},
        }
    },
    methods: {
        findCodeTableForView(codeTableId)//查找码表
        {
            CodeTableService.findCodeTableForView(codeTableId).then((resp) => {
                this.codeTable = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询码表出错'
        })
        })
        },
    },
    created() {
        const codeTableId = this.$route.params.codeTableId;
        this.findCodeTableForView(codeTableId);
    },
}

</script>
<style scoped lang="scss">

</style>
