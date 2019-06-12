<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/simple/permission/Module' }">模块管理列表</el-breadcrumb-item>
          <el-breadcrumb-item>模块管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-form ref="moduleForm" :model="module" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="模块编码" prop="code">
                <el-input type="input" v-model="module.code"
                          placeholder="模块唯一编码（如simple，simple/permission）" clearable autosize
                          resize="both" tabindex=3
                          maxlength=200
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="模块名称" prop="name">
                <el-input type="input" v-model="module.name"
                          placeholder="模块名称（如基础管理）" clearable autosize
                          resize="both" tabindex=4
                          maxlength=200
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="模块类型" prop="moduleType">
                <el-select v-model="module.moduleType" filterable placeholder="模块类型">
                  <el-option
                    v-for="item in moduleTypeCodeTables"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用状态" prop="isInUse">
                <el-select v-model="module.isInUse" filterable placeholder="使用状态">
                  <el-option
                    v-for="item in isInUseCodeTables"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="上级模块" prop="parentName">
                <el-autocomplete
                  class="inline-input"
                  value-key="name"
                  v-model="module.parentName"
                  :fetch-suggestions="searchParentName "
                  placeholder="上级模块(不填默认为顶级模块)"
                  @select="handleSelectParentName"
                  clearable
                  autosize
                  resize="both" tabindex="9"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="页面路由" prop="route">
                <el-input type="input" v-model="module.route"
                          placeholder="页面路由（如/simple/permission/Module）" clearable autosize
                          resize="both" tabindex=6
                          maxlength=200
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="显示顺序" prop="displayIndex">
                <el-input-number v-model="module.displayIndex" :min="1" :max="999999999"
                                 label="显示顺序(默认为第一个)"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图标" prop="iconClass">
                <el-input type="input" v-model="module.iconClass"
                          placeholder="图标" clearable autosize
                          resize="both" tabindex=7
                          maxlength=200
                ></el-input>
                <el-link type="primary" href="https://www.iconfont.cn" target="_blank">https://www.iconfont.cn（阿里云图标库）
                </el-link>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="submitModule()" :loading="isSubmiting"
                           v-permission:simple_permission_Module_Edit>提交
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<script>


  import {ModuleService} from './ModuleService'
  import {d4utils} from '../../../tools/d4utils'

  export default {
    components: {},
    data() {
      return {
        rules: {
          code: [
            {required: true, message: '请输入模块唯一编码', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入模块名称', trigger: 'blur'},
          ],
          moduleType: [
            {required: true, message: '请输入模块类型', trigger: 'blur'},
          ],
          isInUse: [
            {required: true, message: '请输入使用状态', trigger: 'blur'},
          ]
        },
        isSubmiting: false,
        module: {},
        moduleId: null,
        moduleTypeCodeTables: [],
        isInUseCodeTables: [],
      }
    },

    methods: {
      submitModule() {
        var refs = this.$refs;
        refs['moduleForm'].validate(valid => {
          if (valid) {
            if (this.moduleId) {//编辑模块
              this.updateModule();
            } else {//保存模块
              this.saveModule();
            }
          } else {
            return false
          }
        })
      },
      saveModule()//保存模块
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在保存,请稍后...");
        if (this.module.parentName) {
        }
        else {
          this.module.parentCode = "";
          this.module.parentName = "";
        }
        ModuleService.saveModule(this.module).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$router.push({path: '/simple/permission/Module'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: error.data.message
          })
        })
      },
      updateModule()//编辑模块
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在更新,请稍后...");
        if (!this.module.parentName) {
          this.module.parentCode = "";
          this.module.parentName = "";
        }
        ModuleService.updateModule(this.module).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$router.push({path: '/simple/permission/Module'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: '保存出错'
          })
        })
      },
      findModuleForEdit(moduleId)//查找模块
      {
        ModuleService.findModuleForEdit(moduleId).then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询模块出错'
          })
        })
      },
      createModule()//创建新的模块
      {
        ModuleService.createModule().then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '创建新的模块出错'
          })
        })
      },
      prepareForEdit(moduleEditDto) {
        this.module = moduleEditDto.module;
        this.module.lastCode = moduleEditDto.module.code;
        this.moduleTypeCodeTables = moduleEditDto.moduleTypeCodeTables;
        this.isInUseCodeTables = moduleEditDto.isInUseCodeTables;
        this.parentModules = moduleEditDto.parentModules
      },
      searchParentName(queryString, cb) {
        var parentModules = this.parentModules;

        //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
        if (parentModules) {
          var results = queryString ? parentModules.filter(this.createFilterParentName(queryString)) : parentModules;
          cb(results);
        }
        else {
          var results = d4utils.getObjectCached("findModulesWithIdNameByName_" + queryString);
          if (results) {
            cb(results);
          }
          else {
            var cb1 = cb;
            ModuleService.findModulesWithIdNameByName(queryString).then((resp) => {
              if (resp.data) {
                var results = resp.data;
                d4utils.cacheObject("findModulesWithIdNameByName_" + queryString);
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
        return (module) => {
          return (module.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectParentName(item) {
        this.module.parentCode = item.code;
      },
    },
    created() {
      this.moduleId = this.$route.query.moduleId;
      if (this.moduleId)//编辑
      {
        this.findModuleForEdit(this.moduleId);
      }
      else//新增
      {
        this.createModule();
      }
    },
  }
</script>
<style scoped lang="scss">
  .inline-input {
    width: 100%;
  }
</style>
