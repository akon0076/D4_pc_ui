<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/simple/organization/employee' }">职员管理列表</el-breadcrumb-item>
          <el-breadcrumb-item>职员管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-form ref="employeeForm" :model="employee" label-width="150px" :rules="rules">
          <el-col :span="12">
            <el-form-item label="职员编码" prop="code">
              <el-input type="input" v-model="employee.code"
                        placeholder="职员编码" clearable autosize
                        resize="both" tabindex=3
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职员姓名" prop="name">
              <el-input type="input" v-model="employee.name"
                        placeholder="职员姓名" clearable autosize
                        resize="both" tabindex=3
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属单位" prop="organizationName">
              <el-autocomplete
                class="inline-input"
                value-key="name"
                v-model="employee.organizationName"
                :fetch-suggestions="searchOrganizationName "
                placeholder="所属单位"
                @select="handleSelectOrganizationName"
                clearable autosize
                resize="both" tabindex="5"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属部门" prop="departmentName">
              <el-autocomplete
                :disabled="!employee.organizationId"
                class="inline-input"
                value-key="name"
                v-model="employee.departmentName"
                :fetch-suggestions="searchDepartmentName "
                placeholder="所属部门"
                @select="handleSelectDepartmentName"
                clearable autosize
                resize="both" tabindex="5"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="employee.sex" filterable placeholder="性别">
                <el-option
                  v-for="item in sexCodeTables"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthDate">
              <el-date-picker clearable
                              v-model="employee.birthDate"
                              align="right"
                              type="date"
                              placeholder="出生日期"
                              :picker-options="pickerOptionsBirthDate">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="linkTel">
              <el-input type="input" v-model="employee.linkTel"
                        placeholder="联系电话" clearable autosize
                        resize="both" tabindex=4
                        maxlength=100
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">

              <el-input type="textarea" v-model="employee.remark"
                        placeholder="备注" clearable autosize
                        resize="both" tabindex=10000
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="submitEmployee()" :loading="isSubmiting"
                         v-permission:simple_organization_Employee_Edit>提交
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>


  import {DepartmentService} from '../../simple/organization/DepartmentService'
  import {OrganizationService} from '../../simple/organization/OrganizationService'
  import {EmployeeService} from './EmployeeService'
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
            {required: true, message: '请输入职员编码', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          linkTel: [
            {required: false, message: '请输入联系电话', trigger: 'blur'},
            {
              validator: validateString(0, 1000, /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, "手机号格式错误"),
              trigger: 'blur'
            },
          ],
          departmentName: [
            {required: false, message: '请输入所属部门', trigger: 'blur'},
          ],
          organizationName: [
            {required: true, message: '请输入所属单位', trigger: 'blur'},
          ],
          departmentId: [
            {required: false, message: '请输入所属部门', trigger: 'blur'},
          ],
          organizationId: [
            {required: true, message: '请输入所属单位', trigger: 'blur'},
          ],
          sex: [
            {required: false, message: '请输入性别', trigger: 'blur'},
          ],
          remark: [
            {required: false, message: '请输入备注', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
        },
        isSubmiting: false,
        employee: {},
        sexCodeTables: [],
        employeeId: null,
        pickerOptionsBirthDate: {
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
      }
    },

    methods: {
      submitEmployee() {
        var refs = this.$refs;
        refs['employeeForm'].validate(valid => {
          if (valid) {
            if (this.employee.eid)//编辑职员
            {
              this.updateEmployee();
            }
            else//保存职员
            {
              this.saveEmployee();
            }
          } else {
            return false
          }
        })
      },
      saveEmployee()//保存职员
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在保存,请稍后...");
        EmployeeService.saveEmployee(this.employee).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/organization/employee'})
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
      updateEmployee()//编辑职员
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在更新,请稍后...");
        EmployeeService.updateEmployee(this.employee).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/organization/employee'})
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
      findEmployeeForEdit(employeeId)//查找职员
      {
        EmployeeService.findEmployeeForEdit(employeeId).then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询职员出错'
          })
        })
      },
      createEmployee()//创建新的职员
      {
        EmployeeService.createEmployee().then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '创建新的职员出错'
          })
        })
      },
      prepareForEdit(employeeEditDto) {
        this.employee = employeeEditDto.employee;
        this.sexCodeTables = employeeEditDto.sexCodeTables;
        this.organizationOrganizations = employeeEditDto.organizationOrganizations
      },
      searchSex(queryString, cb) {
        var sexCodeTables = this.sexCodeTables;
        var results = queryString ? sexCodeTables.filter(this.createFilterSex(queryString)) : sexCodeTables;
        cb(results);
      },
      createFilterSex(queryString) {
        return (Gender) => {
          return (Gender.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },


      searchDepartmentName(queryString, cb) {
        var departmentDepartments = this.departmentDepartments;
        //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
        if (departmentDepartments) {
          var results = queryString ? departmentDepartments.filter(this.createFilterDepartmentName(queryString)) : departmentDepartments;
          cb(results);
        }
        else {
          var results = d4utils.getObjectCached("findDepartmentsWithIdNameByName_" + queryString);
          if (results) {
            cb(results);
          }
          else {
            var cb1 = cb;
            DepartmentService.findDepartmentsWithIdNameByName(queryString).then((resp) => {
              if (resp.data) {
                var results = resp.data;
                d4utils.cacheObject("findDepartmentsWithIdNameByName_" + queryString);
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
      createFilterDepartmentName(queryString) {
        return (department) => {
          return (department.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
      handleSelectDepartmentName(item) {
        this.employee.departmentId = item.eid;
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
        this.employee.organizationId = item.eid;
        DepartmentService.findAllDepartmentsByOrgId(this.employee.organizationId).then((resp) => {
          this.departmentDepartments = resp.data
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询引用数据出错'
          })
        });
      },
      handleSelectDepartmentName(item) {
        this.employee.departmentId = item.eid;
      },
    },
    created() {
      this.employeeId = this.$route.params.employeeId;
      if (this.employeeId)//编辑
      {
        this.findEmployeeForEdit(this.employeeId);
      }
      else//新增
      {
        this.createEmployee();
      }
    },
    watch: {
      "employee.organizationName"(newvalue) {
        if (newvalue) {
        }
        else {
          this.employee.organizationId = '';
          this.employee.departmentName = ''
          this.employee.departmentId = ''
        }

      }
    }
  }
</script>
<style scoped lang="scss">

</style>
