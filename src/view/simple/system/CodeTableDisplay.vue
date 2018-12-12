
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看码表</span>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ codeTable.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ codeTable.name }}</span>
                        </el-form-item>
                        <el-form-item label="码表全名">
                            <span>{{ codeTable.fullname }}</span>
                        </el-form-item>
                        <el-form-item label="码表类型">
                            <span>{{ codeTable.codeType }}</span>
                        </el-form-item>
                        <el-form-item label="父级">
                            <span>{{ codeTable.parentFullname }}</span>
                        </el-form-item>
                        <el-form-item label="父级">
                            <span>{{ codeTable.parentId }}</span>
                        </el-form-item>
                        <el-form-item label="父级">
                            <span>{{ codeTable.parentName }}</span>
                        </el-form-item>
                        <el-form-item label="显示顺序">
                            <span>{{ codeTable.displayOrder }}</span>
                        </el-form-item>
                        <el-form-item label="有子码表">
                            <span>{{ codeTable.hasChildren }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ codeTable.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ codeTable.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ codeTable.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ codeTable.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ codeTable.updateDatetime }}</span>
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
