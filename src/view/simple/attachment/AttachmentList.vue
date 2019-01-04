
<template>
    <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>附件管理</span>
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

                        <el-button  type="primary" @click="addAttachment()"  v-permission:simple_attachment_Attachment_Add >新增附件</el-button>
                    </div>
                    <div class="table-control">
                        <el-table v-loading="tableLoading" size="small" class="table-style" :data="attachments" border highlight-current-row @current-change="handleCurrentChange">
                            <el-table-column type="expand" fixed="left">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="list-table-expand">
                                            <el-form-item label="标识">
                                                <span>{{ props.row.EId }}</span>
                                            </el-form-item>
                                            <el-form-item label="名称">
                                                <span>{{ props.row.name }}</span>
                                            </el-form-item>
                                            <el-form-item label="附件的真实名称">
                                                <span>{{ props.row.attachmentRealName }}</span>
                                            </el-form-item>
                                            <el-form-item label="保存文件名">
                                                <span>{{ props.row.attachmentLogicalName }}</span>
                                            </el-form-item>
                                            <el-form-item label="上传时间">
                                                <span>{{ props.row.uploadTime }}</span>
                                            </el-form-item>
                                            <el-form-item label="上传人">
                                                <span>{{ props.row.uploadEmployeeId }}</span>
                                            </el-form-item>
                                            <el-form-item label="上传人">
                                                <span>{{ props.row.uploadEmployeeName }}</span>
                                            </el-form-item>
                                            <el-form-item label="附件地址">
                                                <span>{{ props.row.attachmentAddr }}</span>
                                            </el-form-item>
                                            <el-form-item label="关联表单Id">
                                                <span>{{ props.row.associateFormId }}</span>
                                            </el-form-item>
                                            <el-form-item label="关联表单名称">
                                                <span>{{ props.row.associateFormName }}</span>
                                            </el-form-item>
                                            <el-form-item label="附件大小">
                                                <span>{{ props.row.associateSize }}</span>
                                            </el-form-item>
                                            <el-form-item label="是否有效">
                                                <span>{{ props.row.isEffective }}</span>
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

                            <el-table-column show-overflow-tooltip align="left" prop="name" label="附件名称" min-width="100" fixed="left" sortable resizable show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <p v-on:click="displayAttachment(attachments[scope.$index].eid)"
                                           style="text-decoration: underline">
                                            {{ attachments[scope.$index].name }}
                                        </p>
                                </template>
                            </el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="attachmentRealName" label="附件的真实名称" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="attachmentLogicalName" label="保存文件名" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="uploadTime" label="上传时间" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="uploadEmployeeName" label="上传人" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="attachmentAddr" label="附件地址" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="associateFormName" label="关联表单名称" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="associateSize" label="附件大小" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="isEffective" label="是否有效" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                    <el-table-column align="left" clalss="setCenter" prop="remark" label="备注" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>

                            <el-table-column label="操作" min-width="120" resizable>
                                <template slot-scope="scope">
                                    <template>
                                        <el-button @click="editOrganation(attachments[scope.$index].eid)" type="text" size="small" v-permission:simple_attachment_Attachment_Edit >编辑</el-button>
                                    </template>
                                    <template>
                                        <el-button @click="deleteAttachment(attachments[scope.$index].eid)" type="text" size="small" v-permission:simple_attachment_Attachment_Delete ><p
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
    import {AttachmentService} from './AttachmentService';
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
                    attachments: [],
                tableLoading: false,
                alerts:{ remarks:[{title:"功能说明",content:"TODO: 请在这里加上功能说明"},],
                    successes:[], //TODO:[{title:'消息内容'},]
                    infos:[],
                    warnings:[],
                    errors:[]},
                selectValues:[
                    {key:"attachmentRealName",value:"附件的真实名称"},
                    {key:"attachmentLogicalName",value:"保存文件名"},
                    {key:"uploadTime",value:"上传时间"},
                    {key:"uploadEmployeeName",value:"上传人"},
                    {key:"attachmentAddr",value:"附件地址"},
                    {key:"associateFormName",value:"关联表单名称"},
                    {key:"associateSize",value:"附件大小"},
                    {key:"isEffective",value:"是否有效"},
                    {key:"remark",value:"备注"},
                ],
                condition:''

            }
        },
        created: function () {
            this.findAttachments();
        },
        methods: {
            searchByCondition(value){        this.currentPage=1;
                this.condition=value;
                this.findAttachments();
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
                this.findAttachments();
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
            findAttachments() {
                var parms = this.installParms();
              this.buttonRequestProgressStart("正在搜索,请稍后...");
                    AttachmentService.findAttachments(parms).then((res) => {
                      this.buttonRequestProgressClose();
                    this.attachments = res.data.datas;
                this.totalCount = res.data.totalCount;
            }).catch((error) => {
                      this.buttonRequestProgressClose();
                    this.$message({
                    type: 'error',
                    message: '网络繁忙，请稍候再试！'
                })
            })
            },
            displayAttachment(attachmentId){
                var router = this.$router;
                router.push({path: '/simple/attachment/attachment/display/'+attachmentId, query: {}});
            },
            deleteAttachment(attachmentId) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  this.buttonRequestProgressStart("正在删除,请稍后...");
                        AttachmentService.deleteAttachment(attachmentId).then((res) =>{
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
                this.findAttachments();
            },
            changePage(val) {
                this.currentPage = val;
                this.findAttachments();
            },
            addAttachment(){
                //新增附件
                var router = this.$router;
                router.push({path: '/simple/attachment/attachment/add', query: {}});
            },
            editOrganation(attachmentId){
                //编辑附件
                var router = this.$router;
                router.push({path: '/simple/attachment/attachment/edit/'+attachmentId, query: {}});
            },
            handleCurrentChange(currentRow,oldCurrentRow) {
                //this.currentRow = val;
            },
        }
    }
</script>
<style scoped lang="scss">
</style>
