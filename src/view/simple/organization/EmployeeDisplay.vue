
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看职员</span>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ employee.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ employee.name }}</span>
                        </el-form-item>
                        <el-form-item label="编码">
                            <span>{{ employee.code }}</span>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <span>{{ employee.linkTel }}</span>
                        </el-form-item>
                        <el-form-item label="所属部门">
                            <span>{{ employee.departmentName }}</span>
                        </el-form-item>
                        <el-form-item label="所属单位">
                            <span>{{ employee.organizationName }}</span>
                        </el-form-item>
                        <el-form-item label="所属部门">
                            <span>{{ employee.departmentId }}</span>
                        </el-form-item>
                        <el-form-item label="所属单位">
                            <span>{{ employee.organizationId }}</span>
                        </el-form-item>
                        <el-form-item label="性别">
                            <span>{{ employee.sex }}</span>
                        </el-form-item>
                        <el-form-item label="出生日期">
                            <span>{{ employee.birthDate }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ employee.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ employee.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ employee.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ employee.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ employee.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {EmployeeService} from './EmployeeService';

export default {
    components: {
    },
    data() {
        return {
            employee:{},
        }
    },
    methods: {
        findEmployeeForView(employeeId)//查找职员
        {
            EmployeeService.findEmployeeForView(employeeId).then((resp) => {
                this.employee = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询职员出错'
        })
        })
        },
    },
    created() {
        const employeeId = this.$route.params.employeeId;
        this.findEmployeeForView(employeeId);
    },
}

</script>
<style scoped lang="scss">

</style>
