
<template>
    <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>模板文件管理</span>
            </div>

            <el-row>
                <div class="alert-container clearfix">
                    <el-alert  v-for="alert in alerts.successes" :key="alert.title"
                               v-bind:title="alert.title" type="success" show-icon>
                    </el-alert>
                    <el-alert  v-for="alert in alerts.infos" :key="alert.title"
                               v-bind:title="alert.title" type="info" show-icon >
                    </el-alert>
                    <el-alert  v-for="alert in alerts.warnings" :key="alert.title"
                               v-bind:title="alert.title" type="warning" show-icon >
                    </el-alert>
                    <el-alert  v-for="alert in alerts.errors" :key="alert.title"
                               v-bind:title="alert.title" type="error"  show-icon >
                    </el-alert>
                </div>
            </el-row>

            <el-row>
                <!--数据表格-->
                <el-col>
                    <!--新增任务按钮-->
                    <down-search :selectValues="selectValues" @returnedValue="searchByCondition"></down-search>

                    <div style="float: right; margin-bottom: 15px">
                        <el-button  type="primary" @click="addModelFile()"  v-permission:simple_report_ModelFile_Add >
                          新增模板文件
                        </el-button>
                    </div>

                    <div class="table-control">
                        <el-table v-loading="tableLoading" size="small" class="table-style" :data="modelFiles" border
                                  highlight-current-row @current-change="handleCurrentChange">

                          <!--下拉按钮展示的信息,相当于display页面-->
                          <!--<el-table-column type="expand" fixed="left">-->
                                <!--<template slot-scope="props">-->
                                    <!--<el-form label-position="left" inline class="list-table-expand">-->
                                        <!--<el-form-item label="标识">-->
                                            <!--<span>{{ props.row.EId }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="名称">-->
                                            <!--<span>{{ props.row.name }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="模板唯一标识">-->
                                            <!--<span>{{ props.row.modelKey }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="模板名称">-->
                                            <!--<span>{{ props.row.modelName }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="分类目录">-->
                                            <!--<span>{{ props.row.category }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="模板类别">-->
                                            <!--<span>{{ props.row.modelType }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="导出文件名称">-->
                                            <!--<span>{{ props.row.exportName }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="导出文件类型">-->
                                            <!--<span>{{ props.row.exportFileType }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="是否分页">-->
                                            <!--<span>{{ props.row.isPagenation }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="一页展示条数">-->
                                            <!--<span>{{ props.row.displayNum }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="是否添加检索">-->
                                            <!--<span>{{ props.row.isSearch }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="备注">-->
                                            <!--<span>{{ props.row.remark }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="创建人">-->
                                            <!--<span>{{ props.row.createId }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="创建时间">-->
                                            <!--<span>{{ props.row.createDatetime }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="修改人">-->
                                            <!--<span>{{ props.row.updateId }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="修改时间">-->
                                            <!--<span>{{ props.row.updateDatetime }}</span>-->
                                        <!--</el-form-item>-->
                                    <!--</el-form>-->
                                <!--</template>-->
                          <!--</el-table-column>-->

                          <!--<el-table-column show-overflow-tooltip align="left" prop="name" label="模板文件名称"-->
                                           <!--min-width="100" fixed="left"  resizable show-overflow-tooltip>-->
                              <!--<template slot-scope="scope">-->
                                      <!--<p v-on:click="displayModelFile(modelFiles[scope.$index].eid)" style="text-decoration: underline">-->
                                          <!--{{ modelFiles[scope.$index].name }}-->
                                      <!--</p>-->
                              <!--</template>-->
                          <!--</el-table-column>-->

                          <!--<el-table-column align="left" clalss="setCenter" prop="modelKey" label="模板唯一标识" -->
                                           <!--min-width="80"  resizable show-overflow-tooltip></el-table-column>-->

                          <el-table-column align="left" clalss="setCenter" prop="modelName" label="模板名称"
                                           min-width="80"  resizable show-overflow-tooltip>
                              <!--点击跳到display页面-->
                              <template slot-scope="scope">
                                    <p v-on:click="displayModelFile(modelFiles[scope.$index].eid)" style="text-decoration: underline">
                                      {{ modelFiles[scope.$index].modelName }}
                                    </p>
                              </template>
                          </el-table-column>

                          <el-table-column align="left" clalss="setCenter" prop="category" label="分类目录"
                                           min-width="80"  resizable show-overflow-tooltip></el-table-column>

                          <el-table-column align="left" clalss="setCenter" prop="modelType" label="模板类别"
                                           min-width="80"  resizable show-overflow-tooltip></el-table-column>

                          <!--<el-table-column align="left" clalss="setCenter" prop="exportName" label="导出文件名称" -->
                                           <!--min-width="80"  resizable show-overflow-tooltip></el-table-column>-->
                          <!--<el-table-column align="left" clalss="setCenter" prop="exportFileType" label="导出文件类型" -->
                                           <!--min-width="80"  resizable show-overflow-tooltip></el-table-column>-->
                          <!--<el-table-column align="left" clalss="setCenter" prop="isPagenation" label="是否分页" -->
                                           <!--min-width="80"  resizable show-overflow-tooltip></el-table-column>-->
                          <!--<el-table-column align="left" clalss="setCenter" prop="displayNum" label="一页展示条数" -->
                                           <!--min-width="80"  resizable show-overflow-tooltip></el-table-column>-->
                          <!--<el-table-column align="left" clalss="setCenter" prop="isSearch" label="是否添加检索" -->
                                           <!--min-width="80"  resizable show-overflow-tooltip></el-table-column>-->

                          <el-table-column align="left" clalss="setCenter" prop="remark" label="备注"
                                           min-width="80"  resizable show-overflow-tooltip></el-table-column>

                          <!--操作按钮-->
                          <el-table-column label="操作" min-width="120" resizable>
                              <template slot-scope="scope">
                                  <template>
                                      <el-button @click="editOrganation(modelFiles[scope.$index].eid)" type="text"
                                                 size="small" v-permission:simple_report_ModelFile_Edit >编辑</el-button>
                                  </template>
                                  <template>
                                      <el-button @click="deleteModelFile(modelFiles[scope.$index].eid)" type="text"
                                                 size="small" v-permission:simple_report_ModelFile_Delete >
                                        <p style="color: red !important;">删除</p></el-button>
                                  </template>
                              </template>
                          </el-table-column>
                        </el-table>

                        <!--分页功能-->
                        <div class="block">
                            <el-pagination class="page-style" @size-change="changeSize" @current-change="changePage"
                                           background :current-page="currentPage" :page-sizes="[10, 15, 20, 25]"
                                           :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
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
    import {ModelFileService} from './ModelFileService';
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
                    modelFiles: [],
                tableLoading: false,
                alerts:{ remarks:[{title:"功能说明",content:"TODO: 请在这里加上功能说明"},],
                    successes:[], //TODO:[{title:'消息内容'},]
                    infos:[],
                    warnings:[],
                    errors:[]},
                selectValues:[
                    {key:"modelKey",value:"模板唯一标识"},
                    {key:"modelName",value:"模板名称"},
                    {key:"category",value:"分类目录"},
                    {key:"modelType",value:"模板类别"},
                    {key:"exportName",value:"导出文件名称"},
                    {key:"exportFileType",value:"导出文件类型"},
                    {key:"isPagenation",value:"是否分页"},
                    {key:"displayNum",value:"一页展示条数"},
                    {key:"isSearch",value:"是否添加检索"},
                    {key:"remark",value:"备注"},
                ],
                condition:''

            }
        },
        created: function () {
            this.findModelFiles();
        },
        methods: {
            searchByCondition(value){        this.currentPage=1;
                this.condition=value;
                this.findModelFiles();
            },
            addAlert(message,title,type){
                //type 可选的值为:remarks,successes,infos,warnings,errors
                type = type? type:"errors";
                type = this.alerts[type]?type:"errors";
                title = title?title:message;
                this.alerts[type].unshift({title:title,content:message});
            },
            removeAlert(title,type){
                //type 可选的值为:remarks,successes,infos,warnings,errors
                type = type? type:"errors";
                type = this.alerts[type]?type:"errors";
                for (var i = this.alerts[type].length-1; i>=0 ; i--) {
                    delete this.alerts[type][i]
                }
            },
            refresh() {
                this.findModelFiles();
            },
            installParms() {
                var parms = {
                     currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    columnName:this.condition.columnName,
                    content:this.condition.content
                }
                return parms;
            },
            findModelFiles() {
                var parms = this.installParms();
                this.buttonRequestProgressStart("正在搜索,请稍后...");
                    ModelFileService.findModelFiles(parms).then((res) => {
                        this.buttonRequestProgressClose();
                    this.modelFiles = res.data.datas;
                this.totalCount = res.data.totalCount;
            }).catch((error) => {
                    this.buttonRequestProgressClose();
                    this.$message({
                    type: 'error',
                    message: '网络繁忙，请稍候再试！'
                })
            })
            },
            displayModelFile(modelFileId){
                var router = this.$router;
                router.push({path: '/simple/report/modelFile/display/'+modelFileId, query: {}});
            },
            deleteModelFile(modelFileId) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.buttonRequestProgressStart("正在删除,请稍后...");
                        ModelFileService.deleteModelFile(modelFileId).then((res) =>{
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
                this.addAlert({title:error.data.message})
                this.$message({
                    type: 'error',
                    message: '删除失败，,原因是：'+error.data.message
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
                this.findModelFiles();
            },
            changePage(val) {
                this.currentPage = val;
                this.findModelFiles();
            },
            addModelFile(){
                //新增模板文件
                var router = this.$router;
                router.push({path: '/simple/report/modelFile/add', query: {}});
            },
            editOrganation(modelFileId){
                //编辑模板文件
                var router = this.$router;
                router.push({path: '/simple/report/modelFile/edit/'+modelFileId, query: {}});
            },
            handleCurrentChange(currentRow,oldCurrentRow) {
                //this.currentRow = val;
            },
        }
    }
</script>
<style scoped lang="scss">
</style>
