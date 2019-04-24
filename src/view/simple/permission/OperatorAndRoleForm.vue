
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/simple/operatorAndRole' }">模块管理列表</el-breadcrumb-item>
                <el-breadcrumb-item>操作员角色管理</el-breadcrumb-item>
              </el-breadcrumb>
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
                <el-form ref="operatorAndRoleForm" :model="operatorAndRole" label-width="150px" :rules="rules">
                                    <el-col :span="12">
                                        <el-form-item label="名称" prop="name">
                                            <el-input type="input" v-model="operatorAndRole.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=1
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="12">
                                    <el-form-item label="操作员" prop="operatorName">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="operatorAndRole.operatorName"
                                                :fetch-suggestions="searchOperatorName "
                                                placeholder="编码"
                                                @select="handleSelectOperatorName"
                                                clearable autosize
                                                resize ="both" tabindex="3"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>


                                <el-col :span="12">
                                    <el-form-item label="角色" prop="roleName">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="operatorAndRole.roleName"
                                                :fetch-suggestions="searchRoleName "
                                                placeholder="角色"
                                                @select="handleSelectRoleName"
                                                clearable autosize
                                                resize ="both" tabindex="4"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="单位" prop="organizationName">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="operatorAndRole.organizationName"
                                                :fetch-suggestions="searchOrganizationName "
                                                placeholder="单位"
                                                @select="handleSelectOrganizationName"
                                                clearable autosize
                                                resize ="both" tabindex="5"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="24">
                                    <el-form-item label="备注" prop="remark">

                                            <el-input type="textarea" v-model="operatorAndRole.remark"
                                                      placeholder="备注" clearable autosize
                                                      resize ="both" tabindex=10000
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <el-button type="primary" @click="submitOperatorAndRole()"    :loading="isSubmiting" v-permission:simple_permission_OperatorAndRole_Edit >提交</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>







import {OperatorService} from '../../simple/permission/OperatorService'
import {RoleService} from '../../simple/permission/RoleService'
import {OrganizationService} from '../../simple/organization/OrganizationService'
import {OperatorAndRoleService} from './OperatorAndRoleService'
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
                operatorName: [
                    {required:  false , message: '请输入操作员', trigger: 'blur'},
                    ],
                operatorId: [
                    {required:  true , message: '请输入操作员', trigger: 'blur'},
                    ],
                roleId: [
                    {required:  true , message: '请输入角色', trigger: 'blur'},
                    ],
                roleName: [
                    {required:  false , message: '请输入角色', trigger: 'blur'},
                    ],
                organizationName: [
                    {required:  false , message: '请输入单位', trigger: 'blur'},
                    ],
                organizationId: [
                    {required:  true , message: '请输入单位', trigger: 'blur'},
                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            operatorAndRole:{},
            operatorAndRoleId:null,
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
        submitOperatorAndRole() {
            var refs = this.$refs;
            refs['operatorAndRoleForm'].validate(valid => {
            if (valid) {
            if(this.operatorAndRole.eid)//编辑操作员角色
            {
            this.updateOperatorAndRole();
            }
            else//保存操作员角色
            {
            this.saveOperatorAndRole();
            }
            } else {
            return false
            }
            })
        },
        saveOperatorAndRole()//保存操作员角色
        {
            this.isSubmiting = true;
            OperatorAndRoleService.saveOperatorAndRole(this.operatorAndRole).then((resp) => {
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/operatorAndRole'})
        }).catch((error) => {
            this.isSubmiting = false;
            this.$message({
            type: 'error',
            message: '保存出错'
        })
        })
        },
        updateOperatorAndRole()//编辑操作员角色
        {
            this.isSubmiting = true;
            OperatorAndRoleService.updateOperatorAndRole(this.operatorAndRole).then((resp) => {
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/operatorAndRole'})
        }).catch((error) => {
            this.isSubmiting = false;
            this.$message({
            type: 'error',
            message: '保存出错'
        })
        })
        },
        findOperatorAndRoleForEdit(operatorAndRoleId)//查找操作员角色
        {
            OperatorAndRoleService.findOperatorAndRoleForEdit(operatorAndRoleId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询操作员角色出错'
        })
        })
        },
        createOperatorAndRole()//创建新的操作员角色
        {
            OperatorAndRoleService.createOperatorAndRole().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的操作员角色出错'
        })
        })
        },
        prepareForEdit(operatorAndRoleEditDto)
        {
            this.operatorAndRole = operatorAndRoleEditDto.operatorAndRole;

            this.operatorOperators = operatorAndRoleEditDto.operatorOperators
            this.roleRoles = operatorAndRoleEditDto.roleRoles
            this.organizationOrganizations = operatorAndRoleEditDto.organizationOrganizations
        },


        searchOperatorName(queryString, cb) {
            var operatorOperators = this.operatorOperators;

            //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
            if(operatorOperators)
            {
                var results = queryString ? operatorOperators.filter(this.createFilterOperatorName(queryString)) : operatorOperators;
                cb(results);
            }
            else
            {
                var results = d4utils.getObjectCached("findOperatorsWithIdNameByName_"+queryString);
                if(results)
                {
                    cb(results);
                }
                else
                {
                    var cb1 = cb;
                    OperatorService.findOperatorsWithIdNameByName(queryString).then((resp) => {
                    if (resp.data)
                    {
                        var results = resp.data;
                        d4utils.cacheObject("findOperatorsWithIdNameByName_"+queryString);
                        cb1(results)
                    }
                else
                    {
                        this.$message({
                            type: 'error',
                            message: '没有查询到引用数据'
                        });
                    }
                }).catch((error) => {
                    this.$message({
                    type: 'error',
                    message: '查询引用数据出错'
                })
                });
                }
            }
        },







            createFilterOperatorName(queryString) {
                return (operator) => {
                    return (operator.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelectOperatorName(item){
                this.operatorAndRole.operatorId = item.eId;
            },

        searchRoleName(queryString, cb) {
            var roleRoles = this.roleRoles;

            //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
            if(roleRoles)
            {
                var results = queryString ? roleRoles.filter(this.createFilterRoleName(queryString)) : roleRoles;
                cb(results);
            }
            else
            {
                var results = d4utils.getObjectCached("findRolesWithIdNameByName_"+queryString);
                if(results)
                {
                    cb(results);
                }
                else
                {
                    var cb1 = cb;
                    RoleService.findRolesWithIdNameByName(queryString).then((resp) => {
                    if (resp.data)
                    {
                        var results = resp.data;
                        d4utils.cacheObject("findRolesWithIdNameByName_"+queryString);
                        cb1(results)
                    }
                else
                    {
                        this.$message({
                            type: 'error',
                            message: '没有查询到引用数据'
                        });
                    }
                }).catch((error) => {
                    this.$message({
                    type: 'error',
                    message: '查询引用数据出错'
                })
                });
                }
            }
        },







            createFilterRoleName(queryString) {
                return (role) => {
                    return (role.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelectRoleName(item){
                this.operatorAndRole.roleId = item.eId;
            },

        searchOrganizationName(queryString, cb) {
            var organizationOrganizations = this.organizationOrganizations;

            //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
            if(organizationOrganizations)
            {
                var results = queryString ? organizationOrganizations.filter(this.createFilterOrganizationName(queryString)) : organizationOrganizations;
                cb(results);
            }
            else
            {
                var results = d4utils.getObjectCached("findOrganizationsWithIdNameByName_"+queryString);
                if(results)
                {
                    cb(results);
                }
                else
                {
                    var cb1 = cb;
                    OrganizationService.findOrganizationsWithIdNameByName(queryString).then((resp) => {
                    if (resp.data)
                    {
                        var results = resp.data;
                        d4utils.cacheObject("findOrganizationsWithIdNameByName_"+queryString);
                        cb1(results)
                    }
                else
                    {
                        this.$message({
                            type: 'error',
                            message: '没有查询到引用数据'
                        });
                    }
                }).catch((error) => {
                    this.$message({
                    type: 'error',
                    message: '查询引用数据出错'
                })
                });
                }
            }
        },







            createFilterOrganizationName(queryString) {
                return (organization) => {
                    return (organization.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelectOrganizationName(item){
                this.operatorAndRole.organizationId = item.eId;
            },
    },
    created() {
        this.operatorAndRoleId = this.$route.params.operatorAndRoleId;
        if(this.operatorAndRoleId)//编辑
        {
            this.findOperatorAndRoleForEdit(this.operatorAndRoleId);
        }
        else//新增
        {
            this.createOperatorAndRole();
        }
    },
}
</script>
<style scoped lang="scss">

</style>
