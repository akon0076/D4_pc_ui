<template>
  <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>码表管理</span>
      </div>
      <el-row>
        <!--数据表格-->
        <el-col>
          <!--新增任务按钮-->
          <div style="float: right; margin-bottom: 15px">
            <el-button type="primary" @click="addCodeTable()" v-permission:simple_system_CodeTable_Add>新增码表</el-button>
          </div>
          <div class="table-control">
            <el-table v-loading="tableLoading" size="small" class="table-style" :data="codeTables" border row-key="uuid"
                      highlight-current-row>
              <el-table-column show-overflow-tooltip align="left" prop="name" label="码表名称" min-width="100" fixed="left"
                               resizable show-overflow-tooltip>
              </el-table-column>
              <el-table-column align="center" prop="codeType" label="码表种类" min-width="80" resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="left" prop="code" label="码表编码" min-width="80" resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="left" prop="label" label="选项名称" min-width="80" resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="left" prop="value" label="选项值" min-width="80" resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="center" prop="displayIndex" label="显示顺序" min-width="60" resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="center" prop="public" label="是否公开" min-width="60" resizable
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.public" size="success">是</el-tag>
                  <el-tag v-else size="danger">否</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" min-width="120" resizable>
                <template slot-scope="scope">
                  <template>
                    <el-button v-if="showEdit(scope.row)" @click="editOrganation(scope.row)" type="text" size="small"
                               v-permission:simple_system_CodeTable_Edit>编辑
                    </el-button>
                  </template>
                  <template>
                    <el-button @click="deleteCodeTable(scope.row.uuid)" type="text" size="small"
                               v-permission:simple_system_CodeTable_Delete><p
                      style="color: red !important;">删除</p></el-button>
                  </template>
                </template>
              </el-table-column>
            </el-table>

            <!--分页功能-->
            <div class="block">
              <el-pagination
                class="page-style" @size-change="changeSize" @current-change="changePage"
                background
                :current-page="currentPage"
                :page-sizes="[10, 15, 20, 25]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>
<script>
  import {mapState} from 'vuex';
  import {CodeTableService} from './CodeTableService';
  import downSearch from '@/components/select/downSearch'

  export default {
    components: {downSearch},
    data() {
      return {
        rules: {},
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        hightlight: true,
        codeTables: [],
        tableLoading: false,
      }
    },
    created: function () {
      this.findCodeTables();
    },
    methods: {
      searchByCondition(value) {
        this.currentPage = 1;
        this.condition = value;
        this.findCodeTables();
      },
      refresh() {
        this.findCodeTables();
      },
      installParms() {
        var parms = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        return parms;
      },
      findCodeTables() {
        var parms = this.installParms();
        this.buttonRequestProgressStart("正在搜索,请稍后...");
        CodeTableService.findAllCodeTablesTree(parms).then((res) => {
          this.buttonRequestProgressClose();
          this.codeTables = res.data.datas;
          this.totalCount = res.data.totalCount;
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      showEdit(codetable) {
        if (codetable.codeType == "组织单位") {
          return false
        }
        return true
      },
      displayCodeTable(codeTableId) {
        this.$router.push({path: '/simple/system/codeTable/display/' + codeTableId, query: {}});
      },
      deleteCodeTable(codeTableId) {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.buttonRequestProgressStart("正在删除,请稍后...");
          CodeTableService.deleteCodeTable(codeTableId).then((res) => {
            this.buttonRequestProgressClose();
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.refresh();
          }).catch((error) => {
            this.buttonRequestProgressClose();
            //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
            this.isSubmiting = false;
            this.$message({
              type: 'error',
              message: error.data.message
            })

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      changeSize(val) {
        this.pageSize = val;
        this.findCodeTables();
      },
      changePage(val) {
        this.currentPage = val;
        this.findCodeTables();
      },
      //新增码表
      addCodeTable() {
        this.$router.push({path: '/simple/system/codeTable/add/codeType', query: {}});
      },
      //编辑码表
      editOrganation(codeTable) {
        if (codeTable.codeType == "码表类型") {
          this.$router.push({path: '/simple/system/codeTable/edit/codeType/' + codeTable.uuid, query: {}});
        }
        if (codeTable.codeType == "码表选项") {
          this.$router.push({path: '/simple/system/codeTable/edit/optionType/' + codeTable.uuid, query: {}});
        }
      },
    }
  }
</script>
<style scoped lang="scss">
</style>
