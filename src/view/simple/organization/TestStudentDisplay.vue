
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看学生</span>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ testStudent.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ testStudent.name }}</span>
                        </el-form-item>
                        <el-form-item label="员工姓名">
                            <span>{{ testStudent.staffName }}</span>
                        </el-form-item>
                        <el-form-item label="身份证号">
                            <span>{{ testStudent.staffIdNumber }}</span>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <span>{{ testStudent.staffAge }}</span>
                        </el-form-item>
                        <el-form-item label="薪水">
                            <span>{{ testStudent.salary }}</span>
                        </el-form-item>
                        <el-form-item label="分数">
                            <span>{{ testStudent.score }}</span>
                        </el-form-item>
                        <el-form-item label="入职日期">
                            <span>{{ testStudent.dateOfJoin }}</span>
                        </el-form-item>
                        <el-form-item label="单位">
                            <span>{{ testStudent.organizationName }}</span>
                        </el-form-item>
                        <el-form-item label="单位">
                            <span>{{ testStudent.organizationId }}</span>
                        </el-form-item>
                        <el-form-item label="性别">
                            <span>{{ testStudent.gender }}</span>
                        </el-form-item>
                        <el-form-item label="是否有效">
                            <span>{{ testStudent.enabled }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ testStudent.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ testStudent.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ testStudent.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ testStudent.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ testStudent.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {TestStudentService} from './TestStudentService';

export default {
    components: {
    },
    data() {
        return {
            testStudent:{},
        }
    },
    methods: {
        findTestStudentForView(testStudentId)//查找学生
        {
            TestStudentService.findTestStudentForView(testStudentId).then((resp) => {
                this.testStudent = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询学生出错'
        })
        })
        },
    },
    created() {
        const testStudentId = this.$route.params.testStudentId;
        this.findTestStudentForView(testStudentId);
    },
}

</script>
<style scoped lang="scss">

</style>
