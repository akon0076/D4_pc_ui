
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>单位审核</span>
            </div>
          <div class="text item">
            <el-form ref="organizationRegistForm" :model="organizationRegist" label-width="150px" :rules="rules">
              <el-col :span="12">
                <el-form-item label="机构名称" prop="name">
                  <span>{{organizationRegist.name}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="管理员名称" prop="adminName">
                  <span>{{organizationRegist.adminName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营业执照号" prop="businessLicenseCode">
                  <span>{{organizationRegist.businessLicenseCode}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="管理员手机" prop="adminLinkTel">
                  <span>{{organizationRegist.adminLinkTel}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="注册资金(万元)" prop="amount">
                  <span>{{organizationRegist.amount}}</span>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="管理员邮箱" prop="adminEmail">
                  <span>{{organizationRegist.adminEmail}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位地址" prop="address">
                  <span>{{organizationRegist.address}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法人" prop="legalPerson">
                  <span>{{organizationRegist.legalPerson}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="行业属性" prop="industryAttributes">
                  <span>{{organizationRegist.industryAttributes}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司座机" prop="landline">
                  <span>{{organizationRegist.landline}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="主营业务" prop="mainBusiness">
                  <span>{{organizationRegist.mainBusiness}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="type == '查看'">
                <el-form-item label="审核结果" prop="auditState">
                  <span>{{organizationRegist.auditState}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12"  v-show="type == '查看'">
                <el-form-item label="审核意见" prop="auditRemark">
                  <span>{{organizationRegist.auditRemark}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12"  v-show="type == '审核'">
                <el-form-item label="审核结果" prop="auditState">
                  <el-autocomplete
                    class="inline-input"
                    value-key="name"
                    v-model="organizationRegist.auditState"
                    :fetch-suggestions="searchAuditState"
                    placeholder="审核结果"
                    clearable autosize
                    resize ="both" tabindex="11"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="12"  v-show="type == '审核'">
                <el-form-item label="审核意见" prop="auditRemark">
                  <el-input type="textarea" v-model="organizationRegist.auditRemark"
                            placeholder="审核意见" clearable autosize
                            resize ="both" tabindex=10000
                            maxlength=255
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="type == '审核'">
                <el-form-item>
                  <el-button type="primary" @click="auditOrganizationRegist()" >提交</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="type == '查看'">
                <el-form-item>
                  <el-button type="primary" @click="goBack()" >返回</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-card>
    </div>
</template>

<script>
import {OrganizationRegistService} from './OrganizationRegistService';
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
        organizationRegist: {},
        type:"",
      }
    },
    methods: {
        findOrganizationRegistForView(organizationRegistId)//查找单位注册
        {
            OrganizationRegistService.findOrganizationRegistForView(organizationRegistId).then((resp) => {
                this.organizationRegist = resp.data;

                if(this.type == "审核"){
                  this.organizationRegist.auditState = "通过";
                }

        }).catch((error) => {
            this.$message({
              type: 'error',
              message: '查询单位出错'
             })
        })
        },
        searchAuditState(queryString, cb) {
          cb([{name:"通过"},{name:"不通过"}]);
        },
        auditOrganizationRegist(){
          OrganizationRegistService.updateOrganizationRegist(this.organizationRegist).then((resp) => {
            this.$router.push({path: '/simple/regist/organizationRegist'});
          }).catch((error) => {
            this.$message({
              type: 'error',
              message: '审核单位出错'
            })
          })
        },
      goBack(){
        this.$router.push({path: '/simple/regist/organizationRegist'});
      }
    },
    created() {
        const organizationRegistId = this.$route.params.organizationRegistId;
        this.findOrganizationRegistForView(organizationRegistId);
        this.type = this.$route.query.type;
    },
}

</script>
<style scoped lang="scss">

</style>
