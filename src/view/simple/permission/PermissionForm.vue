<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/simple/permission/Permission' }">权限点管理列表</el-breadcrumb-item>
          <el-breadcrumb-item>权限点管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-form ref="permissionForm" :model="permission" label-width="150px" :rules="rules">
          <el-col :span="12">
            <el-form-item label="权限编码" prop="code">
              <el-input type="input" v-model="permission.code"
                        placeholder="权限编码(如：simple_organization_Organization_Delete)" clearable autosize
                        resize="both" tabindex=3
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限名称" prop="name">
              <el-input type="input" v-model="permission.name"
                        placeholder="权限名称(如：删除单位)" clearable autosize
                        resize="both" tabindex=4
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属模块" prop="moduleCode">
              <el-autocomplete
                class="inline-input"
                v-model="moduleName"
                :fetch-suggestions="querySearch"
                value-key="name"
                placeholder="请输入所属模块"
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
                        placeholder="请输入控制的controller路径，多个用回车分隔" clearable autosize
                        resize="both" tabindex=7
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
      return {
        rules: {
          code: [
            {required: true, message: '请输入模块编码', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入模块名称', trigger: 'blur'},
          ],
          moduleCode: [
            {required: true, message: '请输入所属模块', trigger: 'blur'},
          ],
          urls: [
            {required: false, message: '请输入controller路径', trigger: 'blur'}
          ],
        },
        isSubmiting: false,
        moduleName: '',
        modules: [],
        lastCode: '',
        permission: {},
        code: '',
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
        ModuleService.findAllLeafModules().then((resp) => {
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
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
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
  .inline-input {
    width: 100%;
  }
</style>
