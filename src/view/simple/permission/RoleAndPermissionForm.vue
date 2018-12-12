
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>角色权限点管理</span>
            </div>
            <div class="alert-container clearfix">
                <el-alert  v-for="alert in alerts.successes"  :key="alert.title"
                           v-bind:title="alert.title"
                           type="success"
                           show-icon>
                </el-alert>
                <el-alert  v-for="alert in alerts.infos"  :key="alert.title"
                           v-bind:title="alert.title"
                           type="info"
                           show-icon >
                </el-alert>
                <el-alert  v-for="alert in alerts.warnings"  :key="alert.title"
                           v-bind:title="alert.title"
                           type="warning"
                           show-icon >
                </el-alert>
                <el-alert  v-for="alert in alerts.errors"  :key="alert.title"
                           v-bind:title="alert.title"
                           type="error"
                           show-icon >
                </el-alert>
            </div>
            <div class="text item">
                <el-form ref="roleAndPermissionForm" :model="roleAndPermission" label-width="150px" :rules="rules">
                                    <el-col :span="12">
                                        <el-form-item label="名称" prop="name">
                                            <el-input type="input" v-model="roleAndPermission.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=1
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="权限点编码" prop="permissionCode">
                                            <el-input type="input" v-model="roleAndPermission.permissionCode"
                                                      placeholder="权限点编码" clearable autosize
                                                      resize ="both" tabindex=3
                                                              maxlength=200
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="12">
                                    <el-form-item label="角色Id" prop="roleId">
                                        <el-input type="number" step="1" v-model="roleAndPermission.roleId"
                                                  placeholder="角色Id" clearable autosize
                                                  resize ="both" tabindex=4
                                                          maxlength=200
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="备注" prop="remark">

                                            <el-input type="textarea" v-model="roleAndPermission.remark"
                                                      placeholder="备注" clearable autosize
                                                      resize ="both" tabindex=10000
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <el-button type="primary" @click="submitRoleAndPermission()"    :loading="isSubmiting" v-permission:simple_permission_RoleAndPermission_Edit >提交</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
            <div class="text item clearfix">
                <el-alert v-for="remark in alerts.remarks"  :key="remark.title"
                          v-bind:title="remark.title"
                          type="info"
                          v-bind:description="remark.description">
                </el-alert>
            </div>
        </el-card>
    </div>
</template>

<script>




import {RoleAndPermissionService} from './RoleAndPermissionService'
import {d4utils} from '../../../tools/d4utils'

export default {
    components: {
    },
    data() {
        var validateIntRange = d4utils.validateFloatRange;
        var validateFloatRange = d4utils.validateFloatRange;
        var validateString = d4utils.validateString;

        return {
            rules: {
                name: [
                    {required:  false , message: '请输入名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                permissionCode: [
                    {required:  true , message: '请输入权限点编码', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                roleId: [

                    {required:  true , message: '请输入角色Id', trigger: 'blur'},
                    { validator: validateIntRange(-9223372036854775808,9223372036854775807), trigger: 'blur' },
                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            roleAndPermission:{},
            roleAndPermissionId:null,
            pickerOptionsCreateDatetime: {
                disabledDate(time) {
                    //TODO: 请在此判断可以输入的日期范围,
                    //return time.getTime() > Date.now();
                    return false;
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            pickerOptionsUpdateDatetime: {
                disabledDate(time) {
                    //TODO: 请在此判断可以输入的日期范围,
                    //return time.getTime() > Date.now();
                    return false;
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
        alerts:{ remarks:[{title:"功能说明",description:"TODO: 请在这里加上功能说明"},],
                successes:[], //TODO:[{title:'消息内容'},]
                infos:[],
                warnings:[],
                errors:[]},
        }
    },

    methods: {
        submitRoleAndPermission() {
            var refs = this.$refs;
            refs['roleAndPermissionForm'].validate(valid => {
            if (valid) {
            if(this.roleAndPermission.eid)//编辑角色权限点
            {
            this.updateRoleAndPermission();
            }
            else//保存角色权限点
            {
            this.saveRoleAndPermission();
            }
            } else {
            return false
            }
            })
        },
        saveRoleAndPermission()//保存角色权限点
        {
            this.isSubmiting = true;
            RoleAndPermissionService.saveRoleAndPermission(this.roleAndPermission).then((resp) => {
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/roleAndPermission'})
        }).catch((error) => {
            this.isSubmiting = false;
            this.$message({
            type: 'error',
            message: '保存出错'
        })
        })
        },
        updateRoleAndPermission()//编辑角色权限点
        {
            this.isSubmiting = true;
            RoleAndPermissionService.updateRoleAndPermission(this.roleAndPermission).then((resp) => {
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/roleAndPermission'})
        }).catch((error) => {
            this.isSubmiting = false;
            this.$message({
            type: 'error',
            message: '保存出错'
        })
        })
        },
        findRoleAndPermissionForEdit(roleAndPermissionId)//查找角色权限点
        {
            RoleAndPermissionService.findRoleAndPermissionForEdit(roleAndPermissionId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询角色权限点出错'
        })
        })
        },
        createRoleAndPermission()//创建新的角色权限点
        {
            RoleAndPermissionService.createRoleAndPermission().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的角色权限点出错'
        })
        })
        },
        prepareForEdit(roleAndPermissionEditDto)
        {
            this.roleAndPermission = roleAndPermissionEditDto.roleAndPermission;

        },

    },
    created() {
        this.roleAndPermissionId = this.$route.params.roleAndPermissionId;
        if(this.roleAndPermissionId)//编辑
        {
            this.findRoleAndPermissionForEdit(this.roleAndPermissionId);
        }
        else//新增
        {
            this.createRoleAndPermission();
        }
    },
}
</script>
<style scoped lang="scss">

</style>
