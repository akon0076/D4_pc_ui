
<template>
    <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>角色权限点管理</span>
            </div>

            <el-row>
                <!--数据表格-->
                <el-col>
                    <!--新增任务按钮-->
                    <div style="float: right; margin-bottom: 15px">

                        <el-button  type="primary" @click="addRoleAndPermission()"  v-if="false" v-permission:simple_permission_RoleAndPermission_Add >新增角色权限点</el-button>
                    </div>
                    <div class="table-control">
                        <el-table v-loading="tableLoading" size="small" class="table-style" :data="roleAndPermissions" border highlight-current-row @current-change="handleCurrentChange">
                            <el-table-column show-overflow-tooltip align="left" prop="name" label="角色权限点名称" min-width="100" fixed="left"  resizable show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <p v-on:click="displayRoleAndPermission(roleAndPermissions[scope.$index].eid)"
                                           style="text-decoration: underline">
                                            {{ roleAndPermissions[scope.$index].name }}
                                        </p>
                                </template>
                            </el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="permissionCode" label="权限点编码" min-width="80"  resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="remark" label="备注" min-width="80"  resizable show-overflow-tooltip></el-table-column>

                            <el-table-column label="操作" min-width="120" resizable>
                                <template slot-scope="scope">
                                    <template>
                                        <el-button @click="editOrganation(roleAndPermissions[scope.$index].eid)" type="text" size="small" v-permission:simple_permission_RoleAndPermission_Edit >编辑</el-button>
                                    </template>
                                    <template>
                                        <el-button @click="deleteRoleAndPermission(roleAndPermissions[scope.$index].eid)" type="text" size="small" v-permission:simple_permission_RoleAndPermission_Delete ><p
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
    import {RoleAndPermissionService} from './RoleAndPermissionService';


    export default {
        components: {},
        data() {
            return {
                rules: {},
                currentPage: 1,
                pageSize: 10,
                totalCount: 0,
                hightlight: true,
                    roleAndPermissions: [],
                tableLoading: false,
            }
        },
        created: function () {
            this.findRoleAndPermissions();
        },
        methods: {
            refresh() {
                this.findRoleAndPermissions();
            },
            installParms() {
                var parms = {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                }
                return parms;
            },
            findRoleAndPermissions() {
                var parms = this.installParms();
                    RoleAndPermissionService.findRoleAndPermissions(parms).then((res) => {
                    this.roleAndPermissions = res.data.datas;
                this.totalCount = res.data.totalCount;
            }).catch((error) => {
                    this.$message({
                    type: 'error',
                    message: '网络繁忙，请稍候再试！'
                })
            })
            },
            displayRoleAndPermission(roleAndPermissionId){
                var router = this.$router;
                router.push({path: '/simple/permission/roleAndPermission/display/'+roleAndPermissionId, query: {}});
            },
            deleteRoleAndPermission(roleAndPermissionId) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        RoleAndPermissionService.deleteRoleAndPermission(roleAndPermissionId).then((res) =>{
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
                this.findRoleAndPermissions();
            },
            changePage(val) {
                this.currentPage = val;
                this.findRoleAndPermissions();
            },
            addRoleAndPermission(){
                //新增角色权限点
                var router = this.$router;
                router.push({path: '/simple/permission/roleAndPermission/add', query: {}});
            },
            editOrganation(roleAndPermissionId){
                //编辑角色权限点
                var router = this.$router;
                router.push({path: '/simple/permission/roleAndPermission/edit/'+roleAndPermissionId, query: {}});
            },
            handleCurrentChange(currentRow,oldCurrentRow) {
                //this.currentRow = val;
            },
        }
    }
</script>
<style scoped lang="scss">
</style>
