<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/simple/permission/Operator' }">操作员管理列表</el-breadcrumb-item>
          <el-breadcrumb-item>操作员管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-form ref="operatorForm" :model="operator" label-width="150px" :rules="rules">
          <el-col :span="12">
            <el-form-item label="用户名" prop="code">
              <el-input type="input" v-model="operator.code"
                        placeholder="请输入账号" clearable autosize
                        resize="both" tabindex=3
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input type="input" v-model="operator.name"
                        placeholder="请输入名称" clearable autosize
                        resize="both" tabindex=1
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isAdd">
            <el-form-item label="密码" prop="passWord">
              <el-input type="input" v-model="operator.passWord"
                        placeholder="请输入密码" clearable autosize
                        resize="both" tabindex=4
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="operator.status" filterable placeholder="状态">
                <el-option
                  v-for="item in statusCodeTables"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-select v-model="operator.type" filterable placeholder="类型">
                <el-option
                  v-for="item in typeCodeTables"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职员" prop="personId">
              <el-autocomplete
                class="inline-input"
                v-model="employeeName"
                :fetch-suggestions="querySearch"
                value-key="name"
                placeholder="请选择对应职员"
                resize="both"
                clearable
                autosize
                tabindex=6
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">

              <el-input type="textarea" v-model="operator.remark"
                        placeholder="备注" clearable autosize
                        resize="both" tabindex=10000
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="submitOperator()" :loading="isSubmiting"
                         v-permission:simple_permission_Operator_Edit>提交
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>


  import {OperatorService} from './OperatorService'
  import {EmployeeService} from '../organization/EmployeeService'
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
            {validator: validateString(0, 100, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {validator: validateString(0, 100, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          passWord: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validateString(0, 100, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          status: [
            {required: true, message: '请选择操作员状态', trigger: 'blur'},
          ],
          type: [
            {required: true, message: '请选择操作员类型', trigger: 'blur'},
          ],
          personId: [
            {required: true, message: '请选择对应职员', trigger: 'blur'},
          ],
          remark: [
            {required: false, message: '请输入备注', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
        },
        isSubmiting: false,
        typeCodeTables: [],
        statusCodeTables: [],
        isAdd: true,
        employeeId: '',
        employeeName: '',
        employees: [],
        operator: {},
        operatorId: null,
      }
    },

    methods: {
      submitOperator() {
        var refs = this.$refs;
        refs['operatorForm'].validate(valid => {
          if (valid) {
            if (this.operator.eid)//编辑操作员
            {
              this.updateOperator();
            }
            else//保存操作员
            {
              this.saveOperator();
            }
          } else {
            return false
          }
        })
      },
      saveOperator()//保存操作员
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在保存,请稍后...");
        OperatorService.saveOperator(this.operator).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/permission/Operator'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: '保存出错'
          })
        })
      },
      updateOperator() { //编辑操作员
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在更新,请稍后...");
        OperatorService.updateOperator(this.operator).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/permission/Operator'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: '保存出错'
          })
        })
      },
      findOperatorForEdit(operatorId) {//查找操作员
        OperatorService.findOperatorForEdit(operatorId).then((resp) => {
          this.operator = resp.data.operator;
          this.statusCodeTables = resp.data.statusCodeTables;
          this.typeCodeTables = resp.data.typeCodeTables;
          this.employeeId = resp.data.operator.personId;
        }).then((resp) => {
          EmployeeService.findAllEmployees().then((resp) => {
            let _this = this
            resp.data.forEach(item => {
              let employee = {}
              employee.personId = item.eid
              employee.name = item.name
              _this.employees.push(employee)
              if (item.eid == _this.employeeId) {
                _this.employeeName = item.name
              }
            })
          }).catch((error) => {
            this.$message({
              type: 'error',
              message: error.data.message
            })
          })
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: error.data.message
          })
        })
      },
      createOperator() { //创建新的操作员
        OperatorService.createOperator().then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '创建新的操作员出错'
          })
        })
        EmployeeService.findAllEmployees().then((resp) => {
          let _this = this
          resp.data.forEach(item => {
            let employee = {}
            employee.personId = item.eid
            employee.name = item.name
            _this.employees.push(employee)
          })
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: error.data.message
          })
        })
      },
      prepareForEdit(operatorEditDto) {
        this.operator = operatorEditDto.operator;
        this.statusCodeTables = operatorEditDto.statusCodeTables;
        this.typeCodeTables = operatorEditDto.typeCodeTables;
      },
      searchStatus(queryString, cb) {
        var statusCodeTables = this.statusCodeTables;
        var results = queryString ? statusCodeTables.filter(this.createFilterStatus(queryString)) : statusCodeTables;
        cb(results);
      },
      createFilterStatus(queryString) {
        return (OperatorStatus) => {
          return (OperatorStatus.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      searchType(queryString, cb) {
        var typeCodeTables = this.typeCodeTables;
        var results = queryString ? typeCodeTables.filter(this.createFilterType(queryString)) : typeCodeTables;
        cb(results);
      },
      createFilterType(queryString) {
        return (OperatorType) => {
          return (OperatorType.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      querySearch(queryString, cb) {
        var restaurants = this.employees;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.operator.personId = item.personId
      },
    },
    created() {
      this.operatorId = this.$route.params.operatorId
      if (this.operatorId) { //编辑
        this.isAdd = false
        this.findOperatorForEdit(this.operatorId)
      } else { //新增
        this.isAdd = true
        this.createOperator()
      }
    },
  }
</script>
<style scoped lang="scss">

</style>
