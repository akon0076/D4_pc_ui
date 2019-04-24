
<template>
    <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>商家注册审核管理</span>
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

                        <el-button  type="primary" @click="addMemberRegist()"  >新增商家注册审核</el-button>
                    </div>
                    <div class="table-control">
                        <el-table v-loading="tableLoading" size="small" class="table-style" :data="memberRegists" border highlight-current-row @current-change="handleCurrentChange">
                            <el-table-column show-overflow-tooltip align="left" prop="name" label="商家注册审核名称" min-width="100" fixed="left"  resizable show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <p v-on:click="displayMemberRegist(memberRegists[scope.$index].eid)"
                                           style="text-decoration: underline">
                                            {{ memberRegists[scope.$index].name }}
                                        </p>
                                </template>
                            </el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="onlyCode" label="唯一键" min-width="80"  resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="password" label="密码" min-width="80"  resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="memberCode" label="编码" min-width="80"  resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="memberName" label="名称" min-width="80"  resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="person" label="联系人" min-width="80"  resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="phone" label="联系电话" min-width="80"  resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="address" label="地址" min-width="80"  resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="auditState" label="审核状态" min-width="80"  resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="remark" label="备注" min-width="80"  resizable show-overflow-tooltip></el-table-column>

                            <el-table-column label="操作" min-width="120" resizable>
                                <template slot-scope="scope">
                                  <template>
                                    <el-button v-show="memberRegists[scope.$index].auditState == '待审核'"
                                               @click="displayMemberRegist(memberRegists[scope.$index].eid,'审核')" type="text" size="small">审核</el-button>
                                  </template>
                                  <template>
                                  <el-button @click="displayMemberRegist(memberRegists[scope.$index].eid,'查看')" type="text" size="small">查看</el-button>
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
    import {MemberRegistService} from './MemberRegistService';
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
                    memberRegists: [],
                tableLoading: false,
                alerts:{ remarks:[{title:"功能说明",content:"TODO: 请在这里加上功能说明"},],
                    successes:[], //TODO:[{title:'消息内容'},]
                    infos:[],
                    warnings:[],
                    errors:[]},
                selectValues:[
                    {key:"onlyCode",value:"唯一键"},
                    {key:"password",value:"密码"},
                    {key:"memberCode",value:"编码"},
                    {key:"memberName",value:"名称"},
                    {key:"person",value:"联系人"},
                    {key:"phone",value:"联系电话"},
                    {key:"address",value:"地址"},
                    {key:"auditState",value:"审核状态"},
                    {key:"remark",value:"备注"},
                ],
                condition:''

            }
        },
        created: function () {
            this.findMemberRegists();
        },
        methods: {
            searchByCondition(value){        this.currentPage=1;
                this.condition=value;
                this.findMemberRegists();
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
                this.findMemberRegists();
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
            findMemberRegists() {
                var parms = this.installParms();
              this.buttonRequestProgressStart("正在搜索,请稍后...");
                    MemberRegistService.findMemberRegists(parms).then((res) => {
                      this.buttonRequestProgressClose();
                    this.memberRegists = res.data.datas;
                this.totalCount = res.data.totalCount;
            }).catch((error) => {
                      this.buttonRequestProgressClose();
                    this.$message({
                    type: 'error',
                    message: '网络繁忙，请稍候再试！'
                })
            })
            },
            displayMemberRegist(memberRegistId,type){
                var router = this.$router;
                router.push({path: '/simple/regist/memberRegist/display/'+memberRegistId, query: {"type":type}});
            },
            deleteMemberRegist(memberRegistId) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  this.buttonRequestProgressStart("正在删除,请稍后...");
                        MemberRegistService.deleteMemberRegist(memberRegistId).then((res) =>{
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
                this.findMemberRegists();
            },
            changePage(val) {
                this.currentPage = val;
                this.findMemberRegists();
            },
            addMemberRegist(){
                //新增商家注册审核
                var router = this.$router;
                router.push({path: '/simple/regist/memberRegist/add', query: {}});
            },
            editOrganation(memberRegistId){
                //编辑商家注册审核
                var router = this.$router;
                router.push({path: '/simple/regist/memberRegist/edit/'+memberRegistId, query: {}});
            },
            handleCurrentChange(currentRow,oldCurrentRow) {
                //this.currentRow = val;
            },
        }
    }
</script>
<style scoped lang="scss">
</style>
