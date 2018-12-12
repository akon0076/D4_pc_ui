
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看码表</span>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="标识">
                            <span>{{ empOpenId.EId }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ empOpenId.name }}</span>
                        </el-form-item>
                        <el-form-item label="人员">
                            <span>{{ empOpenId.employeeName }}</span>
                        </el-form-item>
                        <el-form-item label="人员">
                            <span>{{ empOpenId.employeeId }}</span>
                        </el-form-item>
                        <el-form-item label="openId">
                            <span>{{ empOpenId.openId }}</span>
                        </el-form-item>
                        <el-form-item label="uId">
                            <span>{{ empOpenId.uId }}</span>
                        </el-form-item>
                        <el-form-item label="操作员">
                            <span>{{ empOpenId.operatorName }}</span>
                        </el-form-item>
                        <el-form-item label="操作员">
                            <span>{{ empOpenId.operatorId }}</span>
                        </el-form-item>
                        <el-form-item label="平台类型">
                            <span>{{ empOpenId.type }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ empOpenId.remark }}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <span>{{ empOpenId.createId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ empOpenId.createDatetime }}</span>
                        </el-form-item>
                        <el-form-item label="修改人">
                            <span>{{ empOpenId.updateId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ empOpenId.updateDatetime }}</span>
                        </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {EmpOpenIdService} from './EmpOpenIdService';

export default {
    components: {
    },
    data() {
        return {
            empOpenId:{},
        }
    },
    methods: {
        findEmpOpenIdForView(empOpenIdId)//查找码表
        {
            EmpOpenIdService.findEmpOpenIdForView(empOpenIdId).then((resp) => {
                this.empOpenId = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询码表出错'
        })
        })
        },
    },
    created() {
        const empOpenIdId = this.$route.params.empOpenIdId;
        this.findEmpOpenIdForView(empOpenIdId);
    },
}

</script>
<style scoped lang="scss">

</style>
