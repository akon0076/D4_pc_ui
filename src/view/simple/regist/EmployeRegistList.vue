
<template>
    <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>人员注册审核</span>
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
                  <downSearch  :selectValues="selectValues" @returnedValue="searchByCondition"></downSearch>
                    <div class="table-control" style="margin-top:10px;">
                        <el-table v-loading="tableLoading" size="small" class="table-style" :data="employeRegists" border highlight-current-row @current-change="handleCurrentChange">
                            <el-table-column show-overflow-tooltip align="left" prop="name" label="人员注册名称" min-width="100" fixed="left" sortable resizable show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <p>
                                            {{ employeRegists[scope.$index].name }}
                                        </p>
                                </template>
                            </el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="linkTel" label="联系电话" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="organizationName" label="机构名称" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="email" label="邮箱" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="auditState" label="审核状态" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="auditEmloyeeName" label="审核人员" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" label="审核时间" min-width="80" sortable resizable show-overflow-tooltip>
                                      <template slot-scope="scope">{{employeRegists[scope.$index].auditDate | formatTime}}</template>
                                    </el-table-column>
                            <el-table-column label="操作" min-width="120" resizable>
                                <template slot-scope="scope">
                                    <template>
                                        <el-button v-show="employeRegists[scope.$index].auditState == '待审核'"
                                          @click="displayEmployeRegist(employeRegists[scope.$index].eid,'审核')" type="text" size="small" v-permission:simple_regist_EmployeRegist_Edit >审核</el-button>
                                    </template>
                                  <template>
                                    <el-button @click="displayEmployeRegist(employeRegists[scope.$index].eid,'查看')" type="text" size="small">查看</el-button>
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
    import {EmployeRegistService} from './EmployeRegistService';
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
                    employeRegists: [],
                tableLoading: false,
                alerts:{
                    successes:[], //TODO:[{title:'消息内容'},]
                    infos:[],
                    warnings:[],
                    errors:[]},
              selectValues:[
                {key:"name",value:"人员注册名称"},
                {key:"linkTel",value:"联系电话"},
                {key:"organizationName",value:"机构名称"},
                {key:"email",value:"邮箱"},
                {key:"auditState",value:"审核状态"},
                {key:"auditEmloyeeName",value:"审核人员"},


              ],
              condition:''
            }
        },
        created: function () {
            this.findEmployeRegists();
        },
        methods: {
          searchByCondition(value){
            this.condition=value;
            this.findEmployeRegists();
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
                this.findEmployeRegists();
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
            findEmployeRegists() {
                var parms = this.installParms();
                    EmployeRegistService.findEmployeRegists(parms).then((res) => {
                    this.employeRegists = res.data.datas;
                this.totalCount = res.data.totalCount;
            }).catch((error) => {
                    this.$message({
                    type: 'error',
                    message: '网络繁忙，请稍候再试！'
                })
            })
            },
            displayEmployeRegist(employeRegistId,type){
                var router = this.$router;
                router.push({path: '/simple/regist/employeRegist/display/'+employeRegistId, query: {"type":type}});
            },
            deleteEmployeRegist(employeRegistId) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        EmployeRegistService.deleteEmployeRegist(employeRegistId).then((res) =>{
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
                this.findEmployeRegists();
            },
            changePage(val) {
                this.currentPage = val;
                this.findEmployeRegists();
            },
            addEmployeRegist(){
                //新增人员注册
                var router = this.$router;
                router.push({path: '/simple/regist/employeRegist/add', query: {}});
            },
            editOrganation(employeRegistId){
                //编辑人员注册
                var router = this.$router;
                router.push({path: '/simple/regist/employeRegist/edit/'+employeRegistId, query: {}});
            },
            handleCurrentChange(currentRow,oldCurrentRow) {
                //this.currentRow = val;
            },
        }
    }
</script>
<style scoped lang="scss">
</style>
