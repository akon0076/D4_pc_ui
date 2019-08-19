<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/simple/organization/Organization' }">单位管理列表</el-breadcrumb-item>
          <el-breadcrumb-item>单位管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-form ref="organizationForm" :model="organization" label-width="150px" :rules="rules">
          <el-col :span="12">
            <el-form-item label="编码" prop="code">
              <el-input type="input" v-model="organization.code"
                        placeholder="编码" clearable autosize
                        resize="both" tabindex=3
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input type="input" v-model="organization.name"
                        placeholder="名称" clearable autosize
                        resize="both" tabindex=1
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="linkTel">
              <el-input type="input" v-model="organization.linkTel"
                        placeholder="联系电话" clearable autosize
                        resize="both" tabindex=4
                        maxlength=100
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-input type="input" v-model="organization.address"
                        placeholder="地址" clearable autosize
                        resize="both" tabindex=5
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="上级单位" prop="parentName">
              <el-autocomplete
                class="inline-input"
                value-key="name"
                v-model="organization.parentName"
                :fetch-suggestions="searchParentName "
                placeholder="上级单位"
                @select="handleSelectParentName"
                clearable autosize
                resize="both" tabindex="6"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="displayOrder">
              <el-input type="number" step="1" v-model="organization.displayOrder"
                        placeholder="显示顺序" clearable autosize
                        resize="both" tabindex=7
                        maxlength=250
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">

              <el-input type="textarea" v-model="organization.remark"
                        placeholder="备注" clearable autosize
                        resize="both" tabindex=10000
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="submitOrganization()" :loading="isSubmiting"
                         v-permission:simple_organization_Organization_Edit>提交
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>


  import {OrganizationService} from './OrganizationService'
  import {d4utils} from '../../../tools/d4utils'

  export default {
    components: {},
    data() {
      var validateIntRange = d4utils.validateFloatRange;
      var validateFloatRange = d4utils.validateFloatRange;
      var validateString = d4utils.validateString;

      return {
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请输入编码', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          linkTel: [
            {required: false, message: '请输入联系电话', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          address: [
            {required: false, message: '请输入地址', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          parentId: [
            {required: false, message: '请输入上级单位', trigger: 'blur'},
          ],
          parentName: [
            {required: false, message: '请输入上级单位', trigger: 'blur'},
          ],
          displayOrder: [
            {required: false, message: '请输入显示顺序', trigger: 'blur'},
            {validator: validateIntRange(-2147483648, 2147483647), trigger: 'blur'},
          ],
          remark: [
            {required: false, message: '请输入备注', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
        },
        isSubmiting: false,
        organization: {},
        organizationId: null,
      }
    },

    methods: {
      submitOrganization() {
        var refs = this.$refs;
        refs['organizationForm'].validate(valid => {
          if (valid) {
            if (this.organization.eid)//编辑单位
            {
              this.updateOrganization();
            }
            else//保存单位
            {
              this.saveOrganization();
            }
          } else {
            return false
          }
        })
      },
      saveOrganization()//保存单位
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在保存,请稍后...");
        OrganizationService.saveOrganization(this.organization).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/organization/Organization'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: '保存出错'
          })
        })
      },
      updateOrganization()//编辑单位
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在更新,请稍后...");
        OrganizationService.updateOrganization(this.organization).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/organization/Organization'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: '保存出错'
          })
        })
      },
      findOrganizationForEdit(organizationId)//查找单位
      {
        OrganizationService.findOrganizationForEdit(organizationId).then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询单位出错'
          })
        })
      },
      createOrganization()//创建新的单位
      {
        OrganizationService.createOrganization().then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '创建新的单位出错'
          })
        })
      },
      prepareForEdit(organizationEditDto) {
        this.organization = organizationEditDto.organization;

        this.parentOrganizations = organizationEditDto.parentOrganizations
      },


      searchParentName(queryString, cb) {
        var parentOrganizations = this.parentOrganizations;

        //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
        if (parentOrganizations) {
          var results = queryString ? parentOrganizations.filter(this.createFilterParentName(queryString)) : parentOrganizations;
          cb(results);
        }
        else {
          var results = d4utils.getObjectCached("findOrganizationsWithIdNameByName_" + queryString);
          if (results) {
            cb(results);
          }
          else {
            var cb1 = cb;
            OrganizationService.findOrganizationsWithIdNameByName(queryString).then((resp) => {
              if (resp.data) {
                var results = resp.data;
                d4utils.cacheObject("findOrganizationsWithIdNameByName_" + queryString);
                cb1(results)
              }
              else {
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
        return (organization) => {
          return (organization.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectParentName(item) {
        this.organization.parentId = item.eid;
      },
    },
    created() {
      this.organizationId = this.$route.params.organizationId;
      if (this.organizationId)//编辑
      {
        this.findOrganizationForEdit(this.organizationId);
      }
      else//新增
      {
        this.createOrganization();
      }
    },
  }
</script>
<style scoped lang="scss">

</style>
