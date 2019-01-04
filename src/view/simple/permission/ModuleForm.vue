
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>模块管理</span>
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
                <el-form ref="moduleForm" :model="module" label-width="150px" :rules="rules">
                                    <el-col :span="12">
                                        <el-form-item label="编码" prop="code">
                                            <el-input type="input" v-model="module.code"
                                                      placeholder="编码(如:Simple)" clearable autosize
                                                      resize ="both" tabindex=3
                                                              maxlength=200
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="名称" prop="name">
                                            <el-input type="input" v-model="module.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=4
                                                              maxlength=200
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="URL地址" prop="url">
                                            <el-input type="input" v-model="module.url"
                                                      placeholder="地址" clearable autosize
                                                      resize ="both" tabindex=5
                                                              maxlength=500
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="路由" prop="route">
                                            <el-input type="input" v-model="module.route"
                                                      placeholder="路由" clearable autosize
                                                      resize ="both" tabindex=6
                                                              maxlength=200
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="图标" prop="iconClass">
                                            <el-input type="input" v-model="module.iconClass"
                                                      placeholder="图标" clearable autosize
                                                      resize ="both" tabindex=7
                                                              maxlength=200
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="12">
                                    <el-form-item label="显示顺序" prop="displayIndex">
                                        <el-input type="number" step="1" v-model="module.displayIndex"
                                                  placeholder="显示顺序" clearable autosize
                                                  resize ="both" tabindex=8
                                                          maxlength=250
                                        ></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="上级模块" prop="parentName">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="module.parentName"
                                                :fetch-suggestions="searchParentName "
                                                placeholder="上级模块(不填默认为顶级模块)"
                                                @select="handleSelectParentName"
                                                clearable
                                                autosize
                                                resize ="both" tabindex="9"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="模块类型" prop="moduleType">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="module.moduleType"
                                                :fetch-suggestions="searchModuleType "
                                                placeholder="模块类型"
                                                clearable autosize
                                                resize ="both" tabindex="10"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>
                             <!--       <el-col :span="12">
                                        <el-form-item label="上级模块编码" prop="parentCode">
                                            <el-input type="input" v-model="module.parentCode"
                                                      placeholder="上级模块编码" clearable autosize
                                                      resize ="both" tabindex=10
                                                              maxlength=500
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>-->
                                <el-col :span="12">
                                    <el-form-item label="在用" prop="isInUse">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="module.isInUse"
                                                :fetch-suggestions="searchIsInUse "
                                                placeholder="在用"
                                                clearable autosize
                                                resize ="both" tabindex="11"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="路由参数对象" prop="routeParamsObj">
                                            <el-input type="input" v-model="module.routeParamsObj"
                                                      placeholder="路由参数对象" clearable autosize
                                                      resize ="both" tabindex=12
                                                              maxlength=200
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary" @click="submitModule()"    :loading="isSubmiting" v-permission:simple_permission_Module_Edit >提交</el-button>
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





import {ModuleService} from './ModuleService'
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
                code: [
                    {required:  true , message: '请输入编码', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                name: [
                    {required:  true , message: '请输入名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                url: [
                    {required:  false , message: '请输入URL地址', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                route: [
                    {required:  false , message: '请输入路由', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                iconClass: [
                    {required:  false , message: '请输入图标', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                displayIndex: [

                    {required:  false , message: '请输入显示顺序', trigger: 'blur'},
                    { validator: validateIntRange(-9223372036854775808,9223372036854775807), trigger: 'blur' },
                    ],
                parentId: [
                    {required:  false , message: '请输入上级模块', trigger: 'blur'},
                    ],
                parentName: [
                    {required:  false , message: '请输入上级模块', trigger: 'blur'},
                    ],
                moduleType: [
                    {required:  true , message: '请输入模块类型', trigger: 'blur'},
                    ],
                parentCode: [
                    {required:  false , message: '请输入上级模块编码', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                isInUse: [
                    {required:  true , message: '请输入在用', trigger: 'blur'},
                    ],
                routeParamsObj: [
                    {required:  false , message: '请输入路由参数对象', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            module:{},
            moduleId:null,
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
        submitModule() {
            var refs = this.$refs;
            refs['moduleForm'].validate(valid => {
            if (valid) {
            if( this.moduleId)//编辑模块
            {
            this.updateModule();
            }
            else//保存模块
            {
            this.saveModule();
            }
            } else {
            return false
            }
            })
        },
        saveModule()//保存模块
        {
            this.isSubmiting = true;
          this.buttonRequestProgressStart("正在保存,请稍后...");
          if(this.module.parentName){}
          else{
            this.module.parentCode = "";
            this.module.parentName = "";
          }
            ModuleService.saveModule(this.module).then((resp) => {
              this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/permission/Module'})
        }).catch((error) => {
              this.buttonRequestProgressClose();
            this.isSubmiting = false;
            this.$message({
            type: 'error',
            message: error.data.message
        })
        })
        },
        updateModule()//编辑模块
        {
            this.isSubmiting = true;
          this.buttonRequestProgressStart("正在更新,请稍后...");
          if(this.module.parentName){}
          else{
            this.module.parentCode = "";
            this.module.parentName = "";
          }
            ModuleService.updateModule(this.module).then((resp) => {
              this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/permission/module'})
        }).catch((error) => {
              this.buttonRequestProgressClose();
            this.isSubmiting = false;
            this.$message({
            type: 'error',
            message: '保存出错'
        })
        })
        },
        findModuleForEdit(moduleId)//查找模块
        {
            ModuleService.findModuleForEdit(moduleId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询模块出错'
        })
        })
        },
        createModule()//创建新的模块
        {
            ModuleService.createModule().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的模块出错'
        })
        })
        },
        prepareForEdit(moduleEditDto)
        {
            this.module = moduleEditDto.module;
            this.moduleTypeCodeTables = moduleEditDto.moduleTypeCodeTables;
            this.isInUseCodeTables = moduleEditDto.isInUseCodeTables;
            this.parentModules = moduleEditDto.parentModules
        },
        searchModuleType(queryString, cb) {
            var moduleTypeCodeTables = this.moduleTypeCodeTables;
            var results = queryString ? moduleTypeCodeTables.filter(this.createFilterModuleType(queryString)) : moduleTypeCodeTables;
            cb(results);
        },
        createFilterModuleType(queryString) {
            return (模块类型) => {
                return (模块类型.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        searchIsInUse(queryString, cb) {
            var isInUseCodeTables = this.isInUseCodeTables;
            var results = queryString ? isInUseCodeTables.filter(this.createFilterIsInUse(queryString)) : isInUseCodeTables;
            cb(results);
        },
        createFilterIsInUse(queryString) {
            return (逻辑) => {
                return (逻辑.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },


        searchParentName(queryString, cb) {
            var parentModules = this.parentModules;

            //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
            if(parentModules)
            {
                var results = queryString ? parentModules.filter(this.createFilterParentName(queryString)) : parentModules;
                cb(results);
            }
            else
            {
                var results = d4utils.getObjectCached("findModulesWithIdNameByName_"+queryString);
                if(results)
                {
                    cb(results);
                }
                else
                {
                    var cb1 = cb;
                    ModuleService.findModulesWithIdNameByName(queryString).then((resp) => {
                    if (resp.data)
                    {
                        var results = resp.data;
                        d4utils.cacheObject("findModulesWithIdNameByName_"+queryString);
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







            createFilterParentName(queryString) {
                return (module) => {
                    return (module.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelectParentName(item){
                this.module.parentCode = item.code;
            },
    },
    created() {
        this.moduleId = this.$route.query.moduleId;
        if(this.moduleId)//编辑
        {
            this.findModuleForEdit(this.moduleId);
        }
        else//新增
        {
            this.createModule();
        }
    },
}
</script>
<style scoped lang="scss">
.inline-input {
  width: 100%;
}
</style>
