
<template>
    <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>单位注册审核</span>
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

                    <div class="table-control" style="margin-top: 10px;">
                        <el-table v-loading="tableLoading" size="small" class="table-style" :data="organizationRegists" border highlight-current-row @current-change="handleCurrentChange">

                            <el-table-column show-overflow-tooltip align="left" prop="name" label="单位注册名称" min-width="100" fixed="left" sortable resizable show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <p>
                                            {{ organizationRegists[scope.$index].name }}
                                        </p>
                                </template>
                            </el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="businessLicenseCode" label="营业执照号" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="amount" label="注册资金(万元)" min-width="120" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="address" label="单位地址" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="legalPerson" label="法人" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="industryAttributes" label="行业属性" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="auditState" label="审核状态" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="auditEmloyeeName" label="审核人员" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" label="审核时间" min-width="80" sortable resizable show-overflow-tooltip>
                                      <template slot-scope="scope">{{organizationRegists[scope.$index].auditDate | formatTime}}</template>
                                    </el-table-column>
                            <el-table-column label="操作" min-width="80" resizable>
                                <template slot-scope="scope">
                                    <template>
                                        <el-button v-show="organizationRegists[scope.$index].auditState == '待审核'" v-permission:simple_regist_OrganizationRegist_Edit
                                                   @click="displayOrganizationRegist(organizationRegists[scope.$index].eid,'审核')" type="text" size="small" >审核</el-button>
                                    </template>
                                  <template>
                                    <el-button @click="displayOrganizationRegist(organizationRegists[scope.$index].eid,'查看')" type="text" size="small" >查看</el-button>
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
    import {OrganizationRegistService} from './OrganizationRegistService';
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
                    organizationRegists: [],
                tableLoading: false,
                alerts:{
                    successes:[], //TODO:[{title:'消息内容'},]
                    infos:[],
                    warnings:[],
                    errors:[]},
              selectValues:[
                {key:"name",value:"单位注册名称"},
                {key:"businessLicenseCode",value:"营业执照号"},
                {key:"amount",value:"注册资金(万元)"},
                {key:"address",value:"单位地址"},
                {key:"legalPerson",value:"法人"},
                {key:"industryAttributes",value:"行业属性"},
                {key:"auditState",value:"审核状态"},
                {key:"auditEmloyeeName",value:"审核人员"}

              ],
              condition:''
            }
        },
        created: function () {
            this.findOrganizationRegists();
        },
        methods: {
          searchByCondition(value){        this.currentPage=1;
            this.condition=value;
            this.findOrganizationRegists();
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
                this.findOrganizationRegists();
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
            findOrganizationRegists() {
                var parms = this.installParms();
              this.buttonRequestProgressStart("正在搜索,请稍后...");
                    OrganizationRegistService.findOrganizationRegists(parms).then((res) => {
                      this.buttonRequestProgressClose();
                    this.organizationRegists = res.data.datas;
                this.totalCount = res.data.totalCount;
            }).catch((error) => {
                      this.buttonRequestProgressClose();
                    this.$message({
                    type: 'error',
                    message: '网络繁忙，请稍候再试！'
                })
            })
            },
            displayOrganizationRegist(organizationRegistId,type){
                var router = this.$router;
                router.push({path: '/simple/regist/organizationRegist/display/'+organizationRegistId, query: {"type":type}});
            },
            deleteOrganizationRegist(organizationRegistId) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  this.buttonRequestProgressStart("正在删除,请稍后...");
                        OrganizationRegistService.deleteOrganizationRegist(organizationRegistId).then((res) =>{
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
                this.findOrganizationRegists();
            },
            changePage(val) {
                this.currentPage = val;
                this.findOrganizationRegists();
            },

            editOrganation(organizationRegistId){
                //编辑单位注册
                var router = this.$router;
                router.push({path: '/simple/regist/organizationRegist/edit/'+organizationRegistId, query: {}});
            },
            handleCurrentChange(currentRow,oldCurrentRow) {
                //this.currentRow = val;
            },
        }
    }
</script>
<style scoped lang="scss">
</style>
