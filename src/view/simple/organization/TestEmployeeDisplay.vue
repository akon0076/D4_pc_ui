
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看测试表单</span>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ testEmployee.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ testEmployee.name }}</span>
                        </el-form-item>
                        <el-form-item label="员工姓名">
                            <span>{{ testEmployee.staffName }}</span>
                        </el-form-item>
                        <el-form-item label="身份证号">
                            <span>{{ testEmployee.staffIdNumber }}</span>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <span>{{ testEmployee.staffAge }}</span>
                        </el-form-item>
                        <el-form-item label="薪水">
                            <span>{{ testEmployee.salary }}</span>
                        </el-form-item>
                        <el-form-item label="分数">
                            <span>{{ testEmployee.score }}</span>
                        </el-form-item>
                        <el-form-item label="入职日期">
                            <span>{{ testEmployee.dateOfJoin }}</span>
                        </el-form-item>
                        <el-form-item label="单位">
                            <span>{{ testEmployee.organizationName }}</span>
                        </el-form-item>
                        <el-form-item label="单位">
                            <span>{{ testEmployee.organizationId }}</span>
                        </el-form-item>
                        <el-form-item label="性别">
                            <span>{{ testEmployee.gender }}</span>
                        </el-form-item>
                        <el-form-item label="是否有效">
                            <span>{{ testEmployee.enabled }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ testEmployee.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ testEmployee.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ testEmployee.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ testEmployee.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ testEmployee.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {TestEmployeeService} from './TestEmployeeService';

export default {
    components: {
    },
    data() {
        return {
            testEmployee:{},
        }
    },
    methods: {
        findTestEmployeeForView(testEmployeeId)//查找测试表单
        {
            TestEmployeeService.findTestEmployeeForView(testEmployeeId).then((resp) => {
                this.testEmployee = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询测试表单出错'
        })
        })
        },
    },
    created() {
        const testEmployeeId = this.$route.params.testEmployeeId;
        this.findTestEmployeeForView(testEmployeeId);
    },
}

</script>
<style scoped lang="scss">

</style>
