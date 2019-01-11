<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>权限点管理</span>
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
        <el-form ref="permissionForm" :model="permission" label-width="150px" :rules="rules">
          <el-col :span="12">
            <el-form-item label="编码" prop="code">
              <el-input type="input" v-model="permission.code"
                        placeholder="编码" clearable autosize
                        resize="both" tabindex=3
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input type="input" v-model="permission.name"
                        placeholder="名称" clearable autosize
                        resize="both" tabindex=4
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="全名" prop="fullName">
              <el-input type="input" v-model="permission.fullName"
                        placeholder="模块名称加上权限点名称" clearable autosize
                        resize="both" tabindex=5
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模块" prop="moduleCode">
              <el-autocomplete
                class="inline-input"
                v-model="moduleName"
                :fetch-suggestions="querySearch"
                value-key="name"
                placeholder="请输入对应模块"
                resize="both"
                clearable
                autosize
                tabindex=6
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="urls" prop="urls">
              <el-input type="textarea" v-model="permission.urls"
                        placeholder="urls路径" clearable autosize
                        resize="both" tabindex=7
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">

              <el-input type="textarea" v-model="permission.remark"
                        placeholder="备注" clearable autosize
                        resize="both" tabindex=10000
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="submitPermission()" :loading="isSubmiting"
                         v-permission:simple_permission_Permission_Edit>提交
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="text item clearfix">
        <el-alert v-for="remark in alerts.remarks" :key="remark.title"
                  v-bind:title="remark.title"
                  type="info"
                  v-bind:description="remark.description"
                  style="text-align: left">
        </el-alert>
      </div>
    </el-card>
  </div>
</template>

<script>


  import {PermissionService} from './PermissionService'
  import {ModuleService} from './ModuleService'
  import {d4utils} from '../../../tools/d4utils'

  export default {
    components: {},
    data() {
      var validateIntRange = d4utils.validateFloatRange;
      var validateFloatRange = d4utils.validateFloatRange;
      var validateString = d4utils.validateString;

      return {
        rules: {
          code: [
            {required: true, message: '请输入编码', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          fullName: [
            {required: true, message: '请输入全名', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          moduleCode: [
            {required: true, message: '请输入模块编码', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          urls: [
            {required: true, message: '请输入urls', trigger: 'blur'}
          ],
          remark: [
            {required: false, message: '请输入备注', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
        },
        isSubmiting: false,
        moduleName: '',
        modules: [],
        lastCode: '',
        permission: {},
        code: '',
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
          remarks: [{title: "功能说明", description: "权限点编码命名格式请参考Module.json和操作文档执行！"},],
          successes: [], //TODO:[{title:'消息内容'},]
          infos: [],
          warnings: [],
          errors: []
        },
      }
    },

    methods: {
      submitPermission() {
        var refs = this.$refs;
        refs['permissionForm'].validate(valid => {
          if (valid) {
            if (this.code)//编辑权限点
            {
              this.updatePermission();
            }
            else//保存权限点
            {
              this.savePermission();
            }
          } else {
            return false
          }
        })
      },
      //保存权限点
      savePermission() {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在保存,请稍后...");
        let params = JSON.parse(JSON.stringify(this.permission))
        params.urls = this.permission.urls.split("\n")
        PermissionService.savePermission(params).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/permission/Permission'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: error.data.message
          })
        })
      },
      //编辑权限点
      updatePermission() {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在更新,请稍后...");
        let params = JSON.parse(JSON.stringify(this.permission))
        params.urls = this.permission.urls.split("\n")
        let dto = {}
        dto.permission = params
        dto.lastCode = this.lastCode
        PermissionService.updatePermission(dto).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/permission/Permission'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: error.data.message
          })
        })
      },
      findPermissionForEdit(code)//查找权限点
      {
        PermissionService.findPermissionForEdit(code).then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询权限点出错'
          })
        })
      },
      findAllModules() {
        ModuleService.findAllModules().then((resp) => {
          let _this = this
          resp.data.forEach(item => {
            let module = {}
            module.code = item.code
            module.name = item.name
            _this.modules.push(module)
          })

        }).catch((error) => {
          this.$message({
            type: 'error',
            message: error.data.message
          })
        })
      },
      prepareForEdit(permissionEditDto) {
        ModuleService.findAllModules().then((resp) => {
          let _this = this
          resp.data.forEach(item => {
            let module = {}
            module.code = item.code
            module.name = item.name
            _this.modules.push(module)
          })
          this.permission = permissionEditDto.permission
          this.lastCode = permissionEditDto.permission.code
          this.permission.urls = permissionEditDto.permission.urls.join("\n")
          this.modules.forEach(item => {
            if (item.code == _this.permission.moduleCode) {
              _this.moduleName = item.name
            }
          })
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: error.data.message
          })
        })
      },
      querySearch(queryString, cb) {
        var restaurants = this.modules;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.code.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.permission.moduleCode = item.code
      },
    },
    created() {
      this.code = this.$route.params.code;
      if (this.code) {
        this.findPermissionForEdit(this.code);//编辑
      } else {
        this.findAllModules();//新增
      }
    },
  }
</script>
<style scoped lang="scss">

</style>
