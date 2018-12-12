
<template>
    <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>操作员角色管理</span>
            </div>

            <el-row>
                <!--数据表格-->
                <el-col>
                    <!--新增任务按钮-->
                    <div style="float: right; margin-bottom: 15px">

                        <el-button  type="primary" @click="addOperatorAndRole()"  v-permission:simple_permission_OperatorAndRole_Add >新增操作员角色</el-button>
                    </div>
                    <div class="table-control">
                        <el-table v-loading="tableLoading" size="small" class="table-style" :data="operatorAndRoles" border highlight-current-row @current-change="handleCurrentChange">
                            <el-table-column type="expand" fixed="left">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="list-table-expand">
                                            <el-form-item label="标识">
                                                <span>{{ props.row.EId }}</span>
                                            </el-form-item>
                                            <el-form-item label="名称">
                                                <span>{{ props.row.name }}</span>
                                            </el-form-item>
                                            <el-form-item label="操作员">
                                                <span>{{ props.row.operatorName }}</span>
                                            </el-form-item>
                                            <el-form-item label="操作员">
                                                <span>{{ props.row.operatorId }}</span>
                                            </el-form-item>
                                            <el-form-item label="角色">
                                                <span>{{ props.row.roleId }}</span>
                                            </el-form-item>
                                            <el-form-item label="角色">
                                                <span>{{ props.row.roleName }}</span>
                                            </el-form-item>
                                            <el-form-item label="单位">
                                                <span>{{ props.row.organizationName }}</span>
                                            </el-form-item>
                                            <el-form-item label="单位">
                                                <span>{{ props.row.organizationId }}</span>
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

                            <el-table-column show-overflow-tooltip align="left" prop="name" label="操作员角色名称" min-width="100" fixed="left" sortable resizable show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <p v-on:click="displayOperatorAndRole(operatorAndRoles[scope.$index].eid)"
                                           style="text-decoration: underline">
                                            {{ operatorAndRoles[scope.$index].name }}
                                        </p>
                                </template>
                            </el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="operatorName" label="操作员" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="roleName" label="角色" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="organizationName" label="单位" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="remark" label="备注" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>

                            <el-table-column label="操作" min-width="120" resizable>
                                <template slot-scope="scope">
                                    <template>
                                        <el-button @click="editOrganation(operatorAndRoles[scope.$index].eid)" type="text" size="small" v-permission:simple_permission_OperatorAndRole_Edit >编辑</el-button>
                                    </template>
                                    <template>
                                        <el-button @click="deleteOperatorAndRole(operatorAndRoles[scope.$index].eid)" type="text" size="small" v-permission:simple_permission_OperatorAndRole_Delete ><p
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
    import {OperatorAndRoleService} from './OperatorAndRoleService';


    export default {
        components: {},
        data() {
            return {
                rules: {},
                currentPage: 1,
                pageSize: 10,
                totalCount: 0,
                hightlight: true,
                    operatorAndRoles: [],
                tableLoading: false,
            }
        },
        created: function () {
            this.findOperatorAndRoles();
        },
        methods: {
            refresh() {
                this.findOperatorAndRoles();
            },
            installParms() {
                var parms = {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                }
                return parms;
            },
            findOperatorAndRoles() {
                var parms = this.installParms();
                    OperatorAndRoleService.findOperatorAndRoles(parms).then((res) => {
                    this.operatorAndRoles = res.data.datas;
                this.totalCount = res.data.totalCount;
            }).catch((error) => {
                    this.$message({
                    type: 'error',
                    message: '网络繁忙，请稍候再试！'
                })
            })
            },
            displayOperatorAndRole(operatorAndRoleId){
                var router = this.$router;
                router.push({path: '/simple/permission/operatorAndRole/display/'+operatorAndRoleId, query: {}});
            },
            deleteOperatorAndRole(operatorAndRoleId) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        OperatorAndRoleService.deleteOperatorAndRole(operatorAndRoleId).then((res) =>{
                    this.$message({
                    type: 'success',
                    message: '删除成功！'
                })
                this.refresh();
            }).catch((error) => {
                    this.$message({
                    type: 'error',
                    message: '删除失败，请稍后再试！'
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
                this.findOperatorAndRoles();
            },
            changePage(val) {
                this.currentPage = val;
                this.findOperatorAndRoles();
            },
            addOperatorAndRole(){
                //新增操作员角色
                var router = this.$router;
                router.push({path: '/simple/permission/operatorAndRole/add', query: {}});
            },
            editOrganation(operatorAndRoleId){
                //编辑操作员角色
                var router = this.$router;
                router.push({path: '/simple/permission/operatorAndRole/edit/'+operatorAndRoleId, query: {}});
            },
            handleCurrentChange(currentRow,oldCurrentRow) {
                //this.currentRow = val;
            },
        }
    }
</script>
<style scoped lang="scss">
</style>
