
<template>
    <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>定时任务管理</span>
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

                        <el-button  type="primary" @click="addTaskConfig()"  v-permission:simple_task_TaskConfig_Add >新增定时任务配置</el-button>
                    </div>
                    <div class="table-control">
                        <el-table v-loading="tableLoading" size="small" class="table-style" :data="taskConfigs" border highlight-current-row @current-change="handleCurrentChange">

                            <el-table-column show-overflow-tooltip align="left" prop="name" label="定时任务名称" min-width="100" fixed="left"  resizable show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <p v-on:click="displayTaskConfig(taskConfigs[scope.$index].eid)"
                                           style="text-decoration: underline">
                                            {{ taskConfigs[scope.$index].name }}
                                        </p>
                                </template>
                            </el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="taskName" label="任务名称" min-width="80"  resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="taskType" label="任务类型" min-width="80"  resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="createTime" label="创建时间" min-width="80"  resizable show-overflow-tooltip>
                                      <template  slot-scope="scope">
                                        <div>
                                          {{scope.row.createTime | dateFormat}}
                                        </div>
                                      </template>
                                    </el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="isNeedVariable" label="是否需要参数" min-width="80"  resizable show-overflow-tooltip>

                                    </el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="remark" label="备注" min-width="80"  resizable show-overflow-tooltip></el-table-column>

                            <el-table-column label="操作" min-width="120" resizable>
                                <template slot-scope="scope">
                                    <template>
                                        <el-button @click="editOrganation(taskConfigs[scope.$index].eid)" type="text" size="small" v-permission:simple_task_TaskConfig_Edit >编辑</el-button>
                                    </template>
                                    <template>
                                        <el-button @click="deleteTaskConfig(taskConfigs[scope.$index].eid)" type="text" size="small" v-permission:simple_task_TaskConfig_Delete ><p
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
    import {TaskConfigService} from './TaskConfigService';
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
                    taskConfigs: [],
                tableLoading: false,
                alerts:{ remarks:[{title:"功能说明",content:"TODO: 请在这里加上功能说明"},],
                    successes:[], //TODO:[{title:'消息内容'},]
                    infos:[],
                    warnings:[],
                    errors:[]},
                selectValues:[
                    {key:"taskName",value:"任务名称"},
                    {key:"taskType",value:"任务类型"},
                    {key:"createTime",value:"创建时间"},
                    {key:"isNeedVariable",value:"是否需要参数"},
                    {key:"remark",value:"备注"},
                ],
                condition:''

            }
        },
        created: function () {
            this.findTaskConfigs();
        },
        methods: {
            searchByCondition(value){
                this.condition=value;
                this.findTaskConfigs();
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
                this.findTaskConfigs();
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
            findTaskConfigs() {
                var parms = this.installParms();
                this.buttonRequestProgressStart("正在搜索,请稍后...");
                    TaskConfigService.findTaskConfigs(parms).then((res) => {
                        this.buttonRequestProgressClose();
                    this.taskConfigs = res.data.datas;
                this.totalCount = res.data.totalCount;
            }).catch((error) => {
                    this.buttonRequestProgressClose();
                    this.$message({
                    type: 'error',
                    message: '网络繁忙，请稍候再试！'
                })
            })
            },
            displayTaskConfig(taskConfigId){
                var router = this.$router;
                router.push({path: '/simple/task/taskConfig/display/'+taskConfigId, query: {}});
            },
            deleteTaskConfig(taskConfigId) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.buttonRequestProgressStart("正在删除,请稍后...");
                        TaskConfigService.deleteTaskConfig(taskConfigId).then((res) =>{
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
                this.findTaskConfigs();
            },
            changePage(val) {
                this.currentPage = val;
                this.findTaskConfigs();
            },
            addTaskConfig(){
                //新增定时任务
                var router = this.$router;
                router.push({path: '/simple/task/taskConfig/add', query: {}});
            },
            editOrganation(taskConfigId){
                //编辑定时任务
                var router = this.$router;
                router.push({path: '/simple/task/taskConfig/edit/'+taskConfigId, query: {}});
            },
            handleCurrentChange(currentRow,oldCurrentRow) {
                //this.currentRow = val;
            },
        }
    }
</script>
<style scoped lang="scss">
</style>
