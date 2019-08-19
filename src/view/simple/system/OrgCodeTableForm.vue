<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/simple/system/CodeTable' }">码表管理列表</el-breadcrumb-item>
          <el-breadcrumb-item>码表管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs type="border-card" :value="tableName">
        <el-tab-pane label="码表选项" name="optionType">
          <el-form ref="optionForm" :model="codeTable" label-width="150px" :rules="optionRules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="码表类型" prop="codeTypeId">
                  <el-select v-model="codeTable.codeTypeId" filterable placeholder="码表类型">
                    <el-option
                      v-for="item in allCodeType"
                      :key="item.uuid"
                      :label="item.name"
                      :value="item.uuid">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="显示顺序" prop="displayIndex">
                  <el-input-number v-model="codeTable.displayIndex" :min="1" :max="999999"
                                   label="显示顺序(默认为第一个)"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="选项名称" prop="label">
                  <el-input type="input" v-model="codeTable.label"
                            placeholder="选项名称" clearable autosize
                            maxlength=200
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="选项值" prop="value">
                  <el-input type="input" v-model="codeTable.value"
                            placeholder="选项值" clearable autosize
                            maxlength=200
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item>
                  <el-button type="primary" @click="submitOption()" :loading="isSubmiting"
                             v-permission:simple_system_OrganizationCodeTable_Edit>提交
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>

  import {CodeTableService} from './CodeTableService'
  import {OrganizationService} from '../organization/OrganizationService'

  export default {
    components: {},
    data() {
      return {
        options: [{
          value: true,
          label: '是'
        }, {
          value: false,
          label: '否'
        }],
        disableType: false,
        tableName: '',
        allCodeType: [],
        isEdit: false,
        optionRules: {
          codeTypeId: [
            {required: true, message: '请输入码表类型', trigger: 'blur'},
          ],
          orgId: [
            {required: false, message: '请选择组织单位', trigger: 'blur'},
          ],
          label: [
            {required: true, message: '请输入选项名称', trigger: 'blur'},
          ],
          value: [
            {required: true, message: '请输入选项值', trigger: 'blur'},
          ],
          displayIndex: [
            {required: false, message: '请输入显示顺序', trigger: 'blur'},
          ]
        },
        isSubmiting: false,
        codeTable: {},
        codeTableId: null,
        codeType: ''
      }
    },
    methods: {
      submitOption() {
        this.codeTable.codeType = "码表选项"
        this.$refs['optionForm'].validate(valid => {
          if (valid) {
            if (this.isEdit)//编辑码表
            {
              this.updateCodeTableOption();
            }
            else//保存码表
            {
              this.saveOption();
            }
          } else {
            return false
          }
        })
      },
      saveOption()//保存码表选项
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在保存,请稍后...");
        CodeTableService.saveOption(this.codeTable).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$router.push({path: '/simple/system/OrganizationCodeTable'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: '保存出错'
          })
        })
      },
      updateCodeTableOption() {//编辑码表选项
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在更新,请稍后...");
        CodeTableService.updateCodeTableOption(this.codeTable).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/system/OrganizationCodeTable'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: '保存出错'
          })
        })
      },
      findCodeTableForEdit(uuid) {//查找码表
        CodeTableService.findCodeTable(uuid).then((resp) => {
          this.codeTable = resp.data
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询码表出错'
          })
        })
        CodeTableService.findAllPrivateCodeType().then((resp) => {
          this.allCodeType = resp.data
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '码表类型查询查询失败'
          })
        })
      },
      createCodeTable() {//创建新的码表
        CodeTableService.findAllPrivateCodeType().then((resp) => {
          this.allCodeType = resp.data
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '码表类型查询查询失败'
          })
        })
      },
    },
    created() {
      this.codeTableId = this.$route.params.codeTableId;
      this.codeTableAddId = this.$route.params.codeTableAddId;
      this.codeType = this.$route.params.type;
      this.tableName = this.codeType
      if (this.codeTableId) {//编辑
        this.isEdit = true
        this.findCodeTableForEdit(this.codeTableId);
      } else {//新增
        this.createCodeTable();
      }
    },
  };
</script>
<style scoped lang="scss">

</style>
