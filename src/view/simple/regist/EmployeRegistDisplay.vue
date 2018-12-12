
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>人员审核</span>
            </div>
          <div class="text item">
            <el-form ref="employeRegistForm" :model="employeRegist" label-width="150px" :rules="rules">
              <el-col :span="12">
                <el-form-item label="名称" prop="name">
                  <span>{{employeRegist.name}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="linkTel">
                  <span>{{employeRegist.linkTel}}</span>
                </el-form-item>
              </el-col>

              </el-col>
              <el-col :span="12">
                <el-form-item label="机构名称" prop="organizationName">
                  <span>{{employeRegist.organizationName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱" prop="email">
                  <span>{{employeRegist.email}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="type == '查看'">
                <el-form-item label="审核结果" prop="auditState">
                  <span>{{employeRegist.auditState}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="type == '查看'">
                <el-form-item label="审核意见" prop="auditRemark">
                  <span>{{employeRegist.auditRemark}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="type == '审核'">
                <el-form-item label="审核结果" prop="auditState">
                  <el-autocomplete
                    class="inline-input"
                    value-key="name"
                    v-model="employeRegist.auditState"
                    :fetch-suggestions="searchAuditState"
                    placeholder="审核"
                    clearable autosize
                    resize ="both" tabindex="11"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="type == '审核'">
                <el-form-item label="审核意见" prop="auditRemark">
                  <el-input type="textarea" v-model="employeRegist.auditRemark"
                            placeholder="审核意见" clearable autosize
                            resize ="both" tabindex=10000
                            maxlength=255
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="type == '审核'">
                <el-form-item>
                  <el-button type="primary" @click="auditEmployeRegist()">提交</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="12"  v-show="type == '查看'">
                <el-form-item>
                  <el-button type="primary" @click="goBack()">返回</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-card>
    </div>
</template>

<script>
import {EmployeRegistService} from './EmployeRegistService';
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
              auditState: [
                {required: true, message: '请输入审核结果', trigger: 'blur'},
                {validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur'},
              ]
            },
            employeRegist:{},
            type:"",
        }
    },
    methods: {

        findEmployeRegistForView(employeRegistId)//查找人员注册
        {
            EmployeRegistService.findEmployeRegistForView(employeRegistId).then((resp) => {
                this.employeRegist = resp.data;
                if(this.type == "审核"){
                  this.employeRegist.auditState = "通过";
                }
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询人员注册出错'
        })
        })
        },
        searchAuditState(queryString, cb) {
          cb([{name:"通过"},{name:"不通过"}]);
        },
        auditEmployeRegist(){
          EmployeRegistService.updateEmployeRegist(this.employeRegist).then((resp) => {
            this.$router.push({path: '/simple/regist/EmployeRegist'});
          }).catch((error) => {
            this.$message({
              type: 'error',
              message: '审核人员出错'
            })
          })
        },
      goBack(){
        this.$router.push({path: '/simple/regist/EmployeRegist'});
      }
      },
    created() {
        const employeRegistId = this.$route.params.employeRegistId;
        this.findEmployeRegistForView(employeRegistId);
        this.type = this.$route.query.type;
    },
}

</script>
<style scoped lang="scss">

</style>
