<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/simple/permission/Operator' }">操作员管理列表</el-breadcrumb-item>
          <el-breadcrumb-item>操作员管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="alert-container clearfix">
        <el-alert v-for="alert in alerts.successes" :key="alert.title"
                  v-bind:title="alert.title"
                  type="success"
                  show-icon>
        </el-alert>
        <el-alert v-for="alert in alerts.infos" :key="alert.title"
                  v-bind:title="alert.title"
                  type="info"
                  show-icon>
        </el-alert>
        <el-alert v-for="alert in alerts.warnings" :key="alert.title"
                  v-bind:title="alert.title"
                  type="warning"
                  show-icon>
        </el-alert>
        <el-alert v-for="alert in alerts.errors" :key="alert.title"
                  v-bind:title="alert.title"
                  type="error"
                  show-icon>
        </el-alert>
      </div>


      <div class="text item">
        <el-form ref="operatorForm" :model="operator" label-width="150px" :rules="rules">
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input type="input" v-model="operator.name"
                        placeholder="名称" clearable autosize
                        resize="both" tabindex=1
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编码" prop="code">
              <el-input type="input" v-model="operator.code"
                        placeholder="编码" clearable autosize
                        resize="both" tabindex=3
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="passWord">
              <el-input type="input" v-model="operator.passWord"
                        placeholder="密码" clearable autosize
                        resize="both" tabindex=4
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-autocomplete
                class="inline-input"
                value-key="name"
                v-model="operator.status"
                :fetch-suggestions="searchStatus "
                placeholder="状态"
                clearable autosize
                resize="both" tabindex="5"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-autocomplete
                class="inline-input"
                value-key="name"
                v-model="operator.type"
                :fetch-suggestions="searchType "
                placeholder="与此操作员相应人员类型"
                clearable autosize
                resize="both" tabindex="6"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人员ID" prop="personId">
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
            {required: false, message: '请输入名称', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请输入编码', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          passWord: [
            {required: false, message: '请输入密码', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          status: [
            {required: false, message: '请输入状态', trigger: 'blur'},
          ],
          type: [
            {required: false, message: '请输入类型', trigger: 'blur'},
          ],
          personId: [
            {required: false, message: '请输入人员ID', trigger: 'blur'},
          ],
          remark: [
            {required: false, message: '请输入备注', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
        },
        isSubmiting: false,
        employeeName: '',
        employees: [],
        operator: {},
        operatorId: null,
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
        alerts: {
          remarks: [{title: "功能说明", description: "TODO: 请在这里加上功能说明"},],
          successes: [], //TODO:[{title:'消息内容'},]
          infos: [],
          warnings: [],
          errors: []
        },
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
      updateOperator()//编辑操作员
      {
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
      findOperatorForEdit(operatorId)//查找操作员
      {
        OperatorService.findOperatorForEdit(operatorId).then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询操作员出错'
          })
        })
      },
      createOperator()//创建新的操作员
      {
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
      this.operatorId = this.$route.params.operatorId;
      if (this.operatorId)//编辑
      {
        this.findOperatorForEdit(this.operatorId);
      }
      else//新增
      {
        this.createOperator();
      }
    },
  }
</script>
<style scoped lang="scss">

</style>
