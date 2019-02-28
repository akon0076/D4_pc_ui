
<template>
    <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>码表管理</span>
            </div>
            <el-row>
                <div class="alert-container clearfix">
                    <el-alert  v-for="alert in alerts.successes"  :key="alert.title"
                               v-bind:title="alert.title"
                               type="success"
                               show-icon>
                    </el-alert>
                    <el-alert  v-for="alert in alerts.infos"  :key="alert.title"
                               v-bind:title="alert.title"
                               type="info"
                               show-icon >
                    </el-alert>
                    <el-alert  v-for="alert in alerts.warnings"  :key="alert.title"
                               v-bind:title="alert.title"
                               type="warning"
                               show-icon >
                    </el-alert>
                    <el-alert  v-for="alert in alerts.errors"  :key="alert.title"
                               v-bind:title="alert.title"
                               type="error"
                               show-icon >
                    </el-alert>
                </div>
            </el-row>
            <el-row>
                <!--数据表格-->
                <el-col>
                    <!--新增任务按钮-->
                    <down-search :selectValues="selectValues" @returnedValue="searchByCondition"></down-search>
                    <div style="float: right; margin-bottom: 15px">

                        <el-button  type="primary" @click="addCodeTable()"  v-permission:simple_system_CodeTable_Add >新增码表</el-button>
                    </div>
                    <div class="table-control">
                        <el-table v-loading="tableLoading" size="small" class="table-style" :data="codeTables" border highlight-current-row @current-change="handleCurrentChange">
                            <el-table-column type="expand" fixed="left">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="list-table-expand">
                                            <el-form-item label="名称">
                                                <span>{{ props.row.name }}</span>
                                            </el-form-item>
                                            <el-form-item label="码表全名">
                                                <span>{{ props.row.fullname }}</span>
                                            </el-form-item>
                                            <el-form-item label="码表类型">
                                                <span>{{ props.row.codeType }}</span>
                                            </el-form-item>
                                            <el-form-item label="显示顺序">
                                                <span>{{ props.row.displayOrder }}</span>
                                            </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>

                            <el-table-column show-overflow-tooltip align="left" prop="name" label="码表名称" min-width="100" fixed="left" sortable resizable show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <p v-on:click="displayCodeTable(codeTables[scope.$index].fullname)"
                                           style="text-decoration: underline">
                                            {{ codeTables[scope.$index].name }}
                                        </p>
                                </template>
                            </el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="fullname" label="码表全名" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="codeType" label="码表类型" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="displayOrder" label="显示顺序" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>

                            <el-table-column label="操作" min-width="120" resizable>
                                <template slot-scope="scope">
                                    <template>
                                        <el-button @click="editOrganation(codeTables[scope.$index].fullname)" type="text" size="small" v-permission:simple_system_CodeTable_Edit >编辑</el-button>
                                    </template>
                                    <template>
                                        <el-button @click="deleteCodeTable(codeTables[scope.$index].fullname)" type="text" size="small" v-permission:simple_system_CodeTable_Delete ><p
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
            <el-row>
                <el-alert v-for="remark in alerts.remarks"  :key="remark.title"
                          v-bind:title="remark.title"
                          type="info"
                          v-bind:description="remark.content">
                </el-alert>
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
                alerts:{ remarks:[{title:"功能说明",content:"TODO: 请在这里加上功能说明"},],
                    successes:[], //TODO:[{title:'消息内容'},]
                    infos:[],
                    warnings:[],
                    errors:[]},
                selectValues:[
                    {key:"fullname",value:"码表全名"},
                    {key:"codeType",value:"码表类型"},
                    {key:"displayOrder",value:"显示顺序"},
                ],
                condition:''

            }
        },
        created: function () {
            this.findCodeTables();
        },
        methods: {
            searchByCondition(value){        this.currentPage=1;
                this.condition=value;
                this.findCodeTables();
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
                this.findCodeTables();
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
            findCodeTables() {
                var parms = this.installParms();
              this.buttonRequestProgressStart("正在搜索,请稍后...");
                    CodeTableService.findCodeTables(parms).then((res) => {
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
            displayCodeTable(codeTableId){
                var router = this.$router;
                router.push({path: '/simple/system/codeTable/display/'+codeTableId, query: {}});
            },
            deleteCodeTable(codeTableId) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  this.buttonRequestProgressStart("正在删除,请稍后...");
                        CodeTableService.deleteCodeTable(codeTableId).then((res) =>{
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
                this.findCodeTables();
            },
            changePage(val) {
                this.currentPage = val;
                this.findCodeTables();
            },
            addCodeTable(){
                //新增码表
                var router = this.$router;
                router.push({path: '/simple/system/codeTable/add', query: {}});
            },
            editOrganation(codeTableId){
                //编辑码表
                var router = this.$router;
                router.push({path: '/simple/system/codeTable/edit/'+codeTableId, query: {}});
            },
            handleCurrentChange(currentRow,oldCurrentRow) {
                //this.currentRow = val;
            },
        }
    }
</script>
<style scoped lang="scss">
</style>
