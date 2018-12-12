
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看测试操作员</span>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ testOpeator.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ testOpeator.name }}</span>
                        </el-form-item>
                        <el-form-item label="员工姓名">
                            <span>{{ testOpeator.staffName }}</span>
                        </el-form-item>
                        <el-form-item label="身份证号">
                            <span>{{ testOpeator.staffIdNumber }}</span>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <span>{{ testOpeator.staffAge }}</span>
                        </el-form-item>
                        <el-form-item label="薪水">
                            <span>{{ testOpeator.salary }}</span>
                        </el-form-item>
                        <el-form-item label="分数">
                            <span>{{ testOpeator.score }}</span>
                        </el-form-item>
                        <el-form-item label="入职日期">
                            <span>{{ testOpeator.dateOfJoin }}</span>
                        </el-form-item>
                        <el-form-item label="单位">
                            <span>{{ testOpeator.organizationName }}</span>
                        </el-form-item>
                        <el-form-item label="单位">
                            <span>{{ testOpeator.organizationId }}</span>
                        </el-form-item>
                        <el-form-item label="性别">
                            <span>{{ testOpeator.gender }}</span>
                        </el-form-item>
                        <el-form-item label="是否有效">
                            <span>{{ testOpeator.enabled }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ testOpeator.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ testOpeator.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ testOpeator.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ testOpeator.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ testOpeator.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {TestOpeatorService} from './TestOpeatorService';

export default {
    components: {
    },
    data() {
        return {
            testOpeator:{},
        }
    },
    methods: {
        findTestOpeatorForView(testOpeatorId)//查找测试操作员
        {
            TestOpeatorService.findTestOpeatorForView(testOpeatorId).then((resp) => {
                this.testOpeator = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询测试操作员出错'
        })
        })
        },
    },
    created() {
        const testOpeatorId = this.$route.params.testOpeatorId;
        this.findTestOpeatorForView(testOpeatorId);
    },
}

</script>
<style scoped lang="scss">

</style>
