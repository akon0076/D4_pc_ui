
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
                    <div style="float: right; margin-bottom: 15px">

                        <el-button  type="primary" @click="addEmpOpenId()"  v-permission:simple_qingTui_EmpOpenId_Add >新增码表</el-button>
                    </div>
                    <div class="table-control">
                        <el-table v-loading="tableLoading" size="small" class="table-style" :data="empOpenIds" border highlight-current-row @current-change="handleCurrentChange">
                            <el-table-column type="expand" fixed="left">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="list-table-expand">
                                            <el-form-item label="标识">
                                                <span>{{ props.row.EId }}</span>
                                            </el-form-item>
                                            <el-form-item label="名称">
                                                <span>{{ props.row.name }}</span>
                                            </el-form-item>
                                            <el-form-item label="人员">
                                                <span>{{ props.row.employeeName }}</span>
                                            </el-form-item>
                                            <el-form-item label="人员">
                                                <span>{{ props.row.employeeId }}</span>
                                            </el-form-item>
                                            <el-form-item label="openId">
                                                <span>{{ props.row.openId }}</span>
                                            </el-form-item>
                                            <el-form-item label="uId">
                                                <span>{{ props.row.uId }}</span>
                                            </el-form-item>
                                            <el-form-item label="操作员">
                                                <span>{{ props.row.operatorName }}</span>
                                            </el-form-item>
                                            <el-form-item label="操作员">
                                                <span>{{ props.row.operatorId }}</span>
                                            </el-form-item>
                                            <el-form-item label="平台类型">
                                                <span>{{ props.row.type }}</span>
                                            </el-form-item>
                                            <el-form-item label="备注">
                                                <span>{{ props.row.remark }}</span>
                                            </el-form-item>
                                            <el-form-item label="创建人">
                                                <span>{{ props.row.createId }}</span>
                                            </el-form-item>
                                            <el-form-item label="创建时间">
                                                <span>{{ props.row.createDatetime }}</span>
                                            </el-form-item>
                                            <el-form-item label="修改人">
                                                <span>{{ props.row.updateId }}</span>
                                            </el-form-item>
                                            <el-form-item label="修改时间">
                                                <span>{{ props.row.updateDatetime }}</span>
                                            </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>

                            <el-table-column show-overflow-tooltip align="left" prop="name" label="码表名称" min-width="100" fixed="left" sortable resizable show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <p v-on:click="displayEmpOpenId(empOpenIds[scope.$index].eid)"
                                           style="text-decoration: underline">
                                            {{ empOpenIds[scope.$index].name }}
                                        </p>
                                </template>
                            </el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="employeeName" label="人员" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="operatorName" label="操作员" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="type" label="平台类型" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="remark" label="备注" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>

                            <el-table-column label="操作" min-width="120" resizable>
                                <template slot-scope="scope">
                                    <template>
                                        <el-button @click="editOrganation(empOpenIds[scope.$index].eid)" type="text" size="small" v-permission:simple_qingTui_EmpOpenId_Edit >编辑</el-button>
                                    </template>
                                    <template>
                                        <el-button @click="deleteEmpOpenId(empOpenIds[scope.$index].eid)" type="text" size="small" v-permission:simple_qingTui_EmpOpenId_Delete ><p
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
    import {EmpOpenIdService} from './EmpOpenIdService';


    export default {
        components: {},
        data() {
            return {
                rules: {},
                currentPage: 1,
                pageSize: 10,
                totalCount: 0,
                hightlight: true,
                    empOpenIds: [],
                tableLoading: false,
                alerts:{ remarks:[{title:"功能说明",content:"TODO: 请在这里加上功能说明"},],
                    successes:[], //TODO:[{title:'消息内容'},]
                    infos:[],
                    warnings:[],
                    errors:[]},
            }
        },
        created: function () {
            this.findEmpOpenIds();
        },
        methods: {
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
                this.findEmpOpenIds();
            },
            installParms() {
                var parms = {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                }
                return parms;
            },
            findEmpOpenIds() {
                var parms = this.installParms();
                    EmpOpenIdService.findEmpOpenIds(parms).then((res) => {
                    this.empOpenIds = res.data.datas;
                this.totalCount = res.data.totalCount;
            }).catch((error) => {
                    this.$message({
                    type: 'error',
                    message: '网络繁忙，请稍候再试！'
                })
            })
            },
            displayEmpOpenId(empOpenIdId){
                var router = this.$router;
                router.push({path: '/simple/qingTui/empOpenId/display/'+empOpenIdId, query: {}});
            },
            deleteEmpOpenId(empOpenIdId) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        EmpOpenIdService.deleteEmpOpenId(empOpenIdId).then((res) =>{
                    this.$message({
                    type: 'success',
                    message: '删除成功！'
                })
                this.refresh();
            }).catch((error) => {

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
                this.findEmpOpenIds();
            },
            changePage(val) {
                this.currentPage = val;
                this.findEmpOpenIds();
            },
            addEmpOpenId(){
                //新增码表
                var router = this.$router;
                router.push({path: '/simple/qingTui/empOpenId/add', query: {}});
            },
            editOrganation(empOpenIdId){
                //编辑码表
                var router = this.$router;
                router.push({path: '/simple/qingTui/empOpenId/edit/'+empOpenIdId, query: {}});
            },
            handleCurrentChange(currentRow,oldCurrentRow) {
                //this.currentRow = val;
            },
        }
    }
</script>
<style scoped lang="scss">
</style>
