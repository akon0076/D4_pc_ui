
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>系统参数管理</span>
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
                <el-form ref="systemConfigForm" :model="systemConfig" label-width="150px" :rules="rules">
                                    <el-col :span="11">
                                        <el-form-item label="名称" prop="name">
                                          <file-tip content=""></file-tip>
                                            <el-input type="input" v-model="systemConfig.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=1
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="键" prop="systemConfigKey">
                                          <file-tip></file-tip>
                                            <el-input type="input" v-model="systemConfig.systemConfigKey"
                                                      placeholder="键" clearable autosize
                                                      resize ="both" tabindex=3
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="值" prop="systemConfigValue">
                                          <file-tip></file-tip>
                                            <el-input type="input" v-model="systemConfig.systemConfigValue"
                                                      placeholder="值" clearable autosize
                                                      resize ="both" tabindex=4
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="描述" prop="systemConfigDescription">
                                          <file-tip></file-tip>
                                            <el-input type="input" v-model="systemConfig.systemConfigDescription"
                                                      placeholder="描述" clearable autosize
                                                      resize ="both" tabindex=5
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="22">
                                    <el-form-item label="备注" prop="remark">
                                      <file-tip></file-tip>
                                            <el-input type="textarea" v-model="systemConfig.remark"
                                                      placeholder="备注" clearable autosize
                                                      resize ="both" tabindex=10000
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                </el-col>
                  <el-col :span="22">
                    <el-form-item label="附件" prop="remark">
                      <el-upload
                        multiple
                        action=""
                        show-file-list
                        :auto-upload="false"
                        :on-change="fileUpload"
                        :show-file-list="false"
                        :file-list="fileList">
                        <el-button size="small" type="primary">选取文件</el-button>
                      </el-upload>
                      <div class="system_config_edit_xx" v-for="item in fileList"><span>{{item.name}} </span><i @click="deleteFileList(item,item.id)" style="cursor:pointer;margin-left: 18px;color: red;font-size:18px;" class="el-icon-close"></i></div>
                    </el-form-item>
                  </el-col>
                    <el-col :span="11">
                        <el-form-item>
                            <el-button type="primary" @click="submitSystemConfig()"    :loading="isSubmiting" v-permission:simple_systemConfig_SystemConfig_Edit >提交</el-button>
                        </el-form-item>
                    </el-col>

                </el-form>
            </div>
            <div class="text item clearfix">
                <el-alert v-for="remark in alerts.remarks"  :key="remark.title"
                          v-bind:title="remark.title"
                          type="info"
                          v-bind:description="remark.content">
                </el-alert>
            </div>
        </el-card>
    </div>
</template>

<script>




import {SystemConfigService} from './SystemConfigService'
import {d4utils} from '../../../tools/d4utils'
import fileTip from '@/components/tip/fileTip'

export default {
    components: {
      fileTip
    },
    data() {
        var validateIntRange = d4utils.validateFloatRange;
        var validateFloatRange = d4utils.validateFloatRange;
        var validateString = d4utils.validateString;

        return {
          fileList:[],
          requiredValue:true,
            rules: {

                name: [
                    {required:  false , message: '请输入名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                systemConfigKey: [
                    {required:  true , message: '请输入键', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                systemConfigValue: [
                    {required: true , message: '请输入值', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                systemConfigDescription: [
                    {required:  false , message: '请输入描述', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            systemConfig:{deleteIds:[]},
            systemConfigId:null,
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
        alerts:{ remarks:[{title:"功能说明",content:"TODO: 请在这里加上功能说明"},],
                successes:[], //TODO:[{title:'消息内容'},]
                infos:[],
                warnings:[],
                errors:[]},
        }
    },
watch:{
fileList(newval){
     if(this.fileList.length>0){
         this.rules.systemConfigValue[0].required=false;
     }
     else{
       this.rules.systemConfigValue[0].required=true;
     }
}
},
    methods: {
      deleteFileList(item,ids){
       let index= this.fileList.indexOf(item);
         this.fileList.splice(index,1)
        if(ids){
          this.systemConfig.deleteIds.push(ids);
        }
      },
      fileUpload(file,fileList){
         this.fileList.push(file);
      },
        addAlert(message,title,type){
            //type 可选的值为:remarks,successes,infos,warnings,errors
            type = type? type:"errors";
            type = this.alerts[type]?type:"errors";
            title = title?title:message;
            this.alerts[type].unshift({title:title,content:message});
        },
        removeAlert(title,type){
            //type 可选的值为:remarks,successes,infos,warnings,errors
            type = type? type:"errors";
            type = this.alerts[type]?type:"errors";
            for (var i = this.alerts[type].length-1; i>=0 ; i--) {
                delete this.alerts[type][i]
            }
        },
        submitSystemConfig() {
            var refs = this.$refs;
            refs['systemConfigForm'].validate(valid => {
            if (valid) {
            if(this.systemConfig.eid)//编辑系统参数
            {
            this.updateSystemConfig();
            }
            else//保存系统参数
            {
            this.saveSystemConfig();
            }
            } else {
            return false
            }
            })
        },
        saveSystemConfig()//保存系统参数
        {
            this.isSubmiting = true;
          this.buttonRequestProgressStart("正在保存,请稍后...");
            SystemConfigService.saveSystemConfig(this.systemConfig,this.fileList).then((resp) => {
              this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/systemConfig/systemConfig'})
        }).catch((error) => {
              this.buttonRequestProgressClose();
            //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
            this.isSubmiting = false;

            this.addAlert({title:error.data.message})
            this.$message({
                type: 'error',
                message: '保存出错,原因是：'+error.data.message
            })
        })
        },
        updateSystemConfig()//编辑系统参数
        {
            this.isSubmiting = true;
          this.buttonRequestProgressStart("正在更新,请稍后...");
            SystemConfigService.updateSystemConfig(this.systemConfig,this.fileList).then((resp) => {
              this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/systemConfig/systemConfig'})
        }).catch((error) => {
              this.buttonRequestProgressClose();
            //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
            this.isSubmiting = false;
            this.addAlert({title:error.data.message})
            this.$message({
                type: 'error',
                message: '保存出错,原因是：'+error.data.message
            })

        })
        },
        findSystemConfigForEdit(systemConfigId)//查找系统参数
        {
            SystemConfigService.findSystemConfigForEdit(systemConfigId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询系统参数出错'
        })
        })
        },
        createSystemConfig()//创建新的系统参数
        {
            SystemConfigService.createSystemConfig().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的系统参数出错'
        })
        })
        },
        prepareForEdit(systemConfigEditDto)
        {

            this.systemConfig = systemConfigEditDto.systemConfig;
            this.systemConfig.deleteIds=[];
            if(systemConfigEditDto.attachments) {
              for (let i = 0; i < systemConfigEditDto.attachments.length; i++) {
                this.fileList[i] = {
                  name: systemConfigEditDto.attachments[i].attachmentRealName,
                  id: systemConfigEditDto.attachments[i].eid
                };
              }
              if(this.fileList.length>0){
                this.rules.systemConfigValue[0].required=false;
              }
              else{
                this.rules.systemConfigValue[0].required=true;
              }
            }
        },

    },
    created() {
        this.systemConfigId = this.$route.params.systemConfigId;
        if(this.systemConfigId)//编辑
        {
            this.findSystemConfigForEdit(this.systemConfigId);
        }
        else//新增
        {
            this.createSystemConfig();
        }
    },
}
</script>
<style scoped lang="scss">
.system_config_edit_xx :hover{
  background: rgba(3, 3, 3, 0.08);
}
</style>
<style>
  input::after{
    content:
  }
</style>
