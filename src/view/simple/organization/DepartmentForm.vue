<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/simple/organization/department' }">部门管理列表</el-breadcrumb-item>
          <el-breadcrumb-item>部门管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-form ref="departmentForm" :model="department" label-width="150px" :rules="rules">
          <el-col :span="12">
            <el-form-item label="部门编码" prop="code">
              <el-input type="input" v-model="department.code"
                        placeholder="部门编码" clearable autosize
                        resize="both" tabindex=3
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="name">
              <el-input type="input" v-model="department.name"
                        placeholder="部门名称" clearable autosize
                        resize="both" tabindex=1
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属单位" prop="organizationName">
              <el-autocomplete
                class="inline-input"
                value-key="name"
                v-model="department.organizationName"
                :fetch-suggestions="searchOrganizationName "
                placeholder="所属单位"
                @select="handleSelectOrganizationName"
                clearable autosize
                resize="both" tabindex="4"
              ></el-autocomplete>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="办公电话" prop="officePhoneNumber">
              <el-input type="input" v-model="department.officePhoneNumber"
                        placeholder="办公电话" clearable autosize
                        resize="both" tabindex=5
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门地址" prop="address">
              <el-input type="input" v-model="department.address"
                        placeholder="部门地址" clearable autosize
                        resize="both" tabindex=7
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否启用" prop="enable">
              <el-radio-group v-model="department.enable">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">

              <el-input type="textarea" v-model="department.remark"
                        placeholder="备注" clearable autosize
                        resize="both" tabindex=10000
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="submitDepartment()" :loading="isSubmiting">提交</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>


  import {OrganizationService} from '../../simple/organization/OrganizationService'
  import {DepartmentService} from './DepartmentService'
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
            {required: true, message: '请输入部门编码', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          organizationName: [
            {required: true, message: '请输入所属单位', trigger: 'blur'},
          ],
          organizationId: [
            {required: true, message: '请输入所属单位', trigger: 'blur'},
          ],
          officePhoneNumber: [
            {required: false, message: '请输入办公电话', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          faxNumber: [
            {required: false, message: '请输入传真', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          address: [
            {required: false, message: '请输入部门地址', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          enable: [],
          remark: [
            {required: false, message: '请输入备注', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
        },
        isSubmiting: false,
        department: {},
        departmentId: null,
      }
    },

    methods: {
      submitDepartment() {
        var refs = this.$refs;
        refs['departmentForm'].validate(valid => {
          if (valid) {
            if (this.department.eid)//编辑部门
            {
              this.updateDepartment();
            }
            else//保存部门
            {
              this.saveDepartment();
            }
          } else {
            return false
          }
        })
      },
      saveDepartment()//保存部门
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在保存,请稍后...");
        DepartmentService.saveDepartment(this.department).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/organization/department'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
          this.isSubmiting = false;

          this.addAlert({title: error.data.message})
          this.$message({
            type: 'error',
            message: '保存出错,原因是：' + error.data.message
          })
        })
      },
      updateDepartment()//编辑部门
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在更新,请稍后...");
        DepartmentService.updateDepartment(this.department).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/organization/department'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
          this.isSubmiting = false;
          this.addAlert({title: error.data.message})
          this.$message({
            type: 'error',
            message: '保存出错,原因是：' + error.data.message
          })

        })
      },
      findDepartmentForEdit(departmentId)//查找部门
      {
        DepartmentService.findDepartmentForEdit(departmentId).then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询部门出错'
          })
        })
      },
      createDepartment()//创建新的部门
      {
        DepartmentService.createDepartment().then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '创建新的部门出错'
          })
        })
      },
      prepareForEdit(departmentEditDto) {
        this.department = departmentEditDto.department;

        this.organizationOrganizations = departmentEditDto.organizationOrganizations
      },


      searchOrganizationName(queryString, cb) {
        var organizationOrganizations = this.organizationOrganizations;

        //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
        if (organizationOrganizations) {
          var results = queryString ? organizationOrganizations.filter(this.createFilterOrganizationName(queryString)) : organizationOrganizations;
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
      createFilterOrganizationName(queryString) {
        return (organization) => {
          return (organization.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
      handleSelectOrganizationName(item) {
        this.department.organizationId = item.eid;
      },
    },
    created() {
      this.departmentId = this.$route.params.departmentId;
      if (this.departmentId)//编辑
      {
        this.findDepartmentForEdit(this.departmentId);
      }
      else//新增
      {
        this.createDepartment();
      }
    },
  }
</script>
<style scoped lang="scss">

</style>
