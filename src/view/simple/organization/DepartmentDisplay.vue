
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看部门</span>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ department.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ department.name }}</span>
                        </el-form-item>
                        <el-form-item label="部门编码">
                            <span>{{ department.code }}</span>
                        </el-form-item>
                        <el-form-item label="所属单位">
                            <span>{{ department.organizationName }}</span>
                        </el-form-item>
                        <el-form-item label="所属单位">
                            <span>{{ department.organizationId }}</span>
                        </el-form-item>
                        <el-form-item label="办公电话">
                            <span>{{ department.officePhoneNumber }}</span>
                        </el-form-item>
                        <el-form-item label="传真">
                            <span>{{ department.faxNumber }}</span>
                        </el-form-item>
                        <el-form-item label="部门地址">
                            <span>{{ department.address }}</span>
                        </el-form-item>
                        <el-form-item label="是否启用">
                            <span>{{ department.enable }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ department.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ department.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ department.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ department.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ department.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {DepartmentService} from './DepartmentService';

export default {
    components: {
    },
    data() {
        return {
            department:{},
        }
    },
    methods: {
        findDepartmentForView(departmentId)//查找部门
        {
            DepartmentService.findDepartmentForView(departmentId).then((resp) => {
                this.department = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询部门出错'
        })
        })
        },
    },
    created() {
        const departmentId = this.$route.params.departmentId;
        this.findDepartmentForView(departmentId);
    },
}

</script>
<style scoped lang="scss">

</style>
