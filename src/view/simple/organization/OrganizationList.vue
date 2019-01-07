
<template>
    <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>单位管理</span>
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
                        <el-button  type="primary" @click="addOrganization()"  v-permission:simple_organization_Organization_Add >新增单位</el-button>
                    </div>
                    <div class="table-control" style="width:100%">
                        <div class="towLine" style="width:100%;height:155px;overflow:hidden;">
                                <div class="test1" style="float:left;width:20%">
                                    <el-tree :data="datas" :props="defaultProps" @node-click="handleNodeClick" style="height:155px;overflow:auto"></el-tree>
                                </div>
                                <div class="test2" style="margin-left:21%">
                                    <el-table ref="tableDD" id="appDD" v-loading="tableLoading" size="small" class="table-style" :data="organizations" border highlight-current-row @current-change="handleCurrentChange">
                                        <el-table-column type="expand" fixed="left">
                                            <template slot-scope="props">
                                                <el-form label-position="left" inline class="list-table-expand">
                                                        <el-form-item label="标识">
                                                            <span>{{ props.row.EId }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="名称">
                                                            <span>{{ props.row.name }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="编码">
                                                            <span>{{ props.row.code }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="联系电话">
                                                            <span>{{ props.row.linkTel }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="地址">
                                                            <span>{{ props.row.address }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="上级单位">
                                                            <span>{{ props.row.parentId }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="上级单位">
                                                            <span>{{ props.row.parentName }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="显示顺序">
                                                            <span>{{ props.row.displayOrder }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="营业执照号">
                                                            <span>{{ props.row.businessLicenseCode }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="传真">
                                                            <span>{{ props.row.fax }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="注册资金(万元)">
                                                            <span>{{ props.row.amount }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="法人">
                                                            <span>{{ props.row.legalPerson }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="行业属性">
                                                            <span>{{ props.row.industryAttributes }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="投资金额">
                                                            <span>{{ props.row.investmentMoney }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="公司座机">
                                                            <span>{{ props.row.landline }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="主营业务">
                                                            <span>{{ props.row.mainBusiness }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="入驻时间">
                                                            <span>{{ props.row.admissionTime }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="管理员名称">
                                                            <span>{{ props.row.adminName }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="营业期限自">
                                                            <span>{{ props.row.businessStartDate }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="管理员手机">
                                                            <span>{{ props.row.adminLinkTel }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="营业期限至">
                                                            <span>{{ props.row.businessEndDate }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="管理员邮箱">
                                                            <span>{{ props.row.adminEmail }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="统一社会信用代码">
                                                            <span>{{ props.row.unifiedCode }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="类型">
                                                            <span>{{ props.row.type }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="登记机关">
                                                            <span>{{ props.row.registerOffice }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="登记状态">
                                                            <span>{{ props.row.registerStatus }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="核准日期">
                                                            <span>{{ props.row.checkDate }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="住所">
                                                            <span>{{ props.row.residence }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="成立日期">
                                                            <span>{{ props.row.establishDate }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="审核状态">
                                                            <span>{{ props.row.auditStatus }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="功能类型">
                                                            <span>{{ props.row.functionType }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="入驻面积">
                                                            <span>{{ props.row.admissionArea }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="入驻楼宇">
                                                            <span>{{ props.row.admissionBuilding }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="企业规模">
                                                            <span>{{ props.row.scale }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="所属行业">
                                                            <span>{{ props.row.industry }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="经营模式">
                                                            <span>{{ props.row.businessPattern }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="从业人员">
                                                            <span>{{ props.row.workPersonNum }}</span>
                                                        </el-form-item>
                                                        <el-form-item label="研发人员">
                                                            <span>{{ props.row.researchPersonNum }}</span>
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
                           
                                        <el-table-column show-overflow-tooltip align="left" prop="name" label="单位名称" min-width="100" fixed="left" sortable resizable show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                    <p v-on:click="displayOrganization(organizations[scope.$index].eid)"
                                                    style="text-decoration: underline">
                                                        {{ organizations[scope.$index].name }}
                                                    </p>
                                            </template>
                                        </el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="code" label="编码" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="linkTel" label="联系电话" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="address" label="地址" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="parentName" label="上级单位" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="displayOrder" label="显示顺序" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="businessLicenseCode" label="营业执照号" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="fax" label="传真" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="amount" label="注册资金(万元)" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="legalPerson" label="法人" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="industryAttributes" label="行业属性" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="investmentMoney" label="投资金额" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="landline" label="公司座机" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="mainBusiness" label="主营业务" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="admissionTime" label="入驻时间" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="adminName" label="管理员名称" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="businessStartDate" label="营业期限自" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="adminLinkTel" label="管理员手机" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="businessEndDate" label="营业期限至" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="adminEmail" label="管理员邮箱" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="unifiedCode" label="统一社会信用代码" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="type" label="类型" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="registerOffice" label="登记机关" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="registerStatus" label="登记状态" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="checkDate" label="核准日期" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="residence" label="住所" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="establishDate" label="成立日期" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="auditStatus" label="审核状态" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="functionType" label="功能类型" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="admissionArea" label="入驻面积" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="admissionBuilding" label="入驻楼宇" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="scale" label="企业规模" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="industry" label="所属行业" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="businessPattern" label="经营模式" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="workPersonNum" label="从业人员" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="researchPersonNum" label="研发人员" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
                                                <el-table-column align="left" clalss="setCenter" prop="remark" label="备注" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>

                                        <el-table-column label="操作" min-width="120" resizable>
                                            <template slot-scope="scope">
                                                <template>
                                                    <el-button @click="editOrganation(organizations[scope.$index].eid)" type="text" size="small" v-permission:simple_organization_Organization_Edit >编辑</el-button>
                                                </template>
                                                <template>
                                                    <el-button @click="deleteOrganization(organizations[scope.$index].eid)" type="text" size="small" v-permission:simple_organization_Organization_Delete ><p
                                                            style="color: red !important;">删除</p></el-button>
                                                </template>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                        </div>
                        

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
    import {OrganizationService} from './OrganizationService';
    import downSearch from '@/components/select/downSearch'

    export default {
        components: {downSearch},
        data() {
            return {    
                datas: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                        label: '三级 1-1-1'
                        }]
                    }]
                    }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                        label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                        label: '三级 2-2-1'
                        }]
                    }]
                    }, {
                     label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                        label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                        label: '三级 3-2-1'
                        }]
                    }]
                    }],
                    defaultProps: {
                        children: 'children',
                        label: 'label'
                    },




                rules: {},
                currentPage: 1,
                pageSize: 10,
                totalCount: 0,
                hightlight: true,
                    organizations: [],
                tableLoading: false,
                alerts:{ remarks:[{title:"功能说明",content:"TODO: 请在这里加上功能说明"},],
                    successes:[], //TODO:[{title:'消息内容'},]
                    infos:[],
                    warnings:[],
                    errors:[]},
                selectValues:[
                    {key:"code",value:"编码"},
                    {key:"linkTel",value:"联系电话"},
                    {key:"address",value:"地址"},
                    {key:"parentName",value:"上级单位"},
                    {key:"displayOrder",value:"显示顺序"},
                    {key:"businessLicenseCode",value:"营业执照号"},
                    {key:"fax",value:"传真"},
                    {key:"amount",value:"注册资金(万元)"},
                    {key:"legalPerson",value:"法人"},
                    {key:"industryAttributes",value:"行业属性"},
                    {key:"investmentMoney",value:"投资金额"},
                    {key:"landline",value:"公司座机"},
                    {key:"mainBusiness",value:"主营业务"},
                    {key:"admissionTime",value:"入驻时间"},
                    {key:"adminName",value:"管理员名称"},
                    {key:"businessStartDate",value:"营业期限自"},
                    {key:"adminLinkTel",value:"管理员手机"},
                    {key:"businessEndDate",value:"营业期限至"},
                    {key:"adminEmail",value:"管理员邮箱"},
                    {key:"unifiedCode",value:"统一社会信用代码"},
                    {key:"type",value:"类型"},
                    {key:"registerOffice",value:"登记机关"},
                    {key:"registerStatus",value:"登记状态"},
                    {key:"checkDate",value:"核准日期"},
                    {key:"residence",value:"住所"},
                    {key:"establishDate",value:"成立日期"},
                    {key:"auditStatus",value:"审核状态"},
                    {key:"functionType",value:"功能类型"},
                    {key:"admissionArea",value:"入驻面积"},
                    {key:"admissionBuilding",value:"入驻楼宇"},
                    {key:"scale",value:"企业规模"},
                    {key:"industry",value:"所属行业"},
                    {key:"businessPattern",value:"经营模式"},
                    {key:"workPersonNum",value:"从业人员"},
                    {key:"researchPersonNum",value:"研发人员"},
                    {key:"remark",value:"备注"},
                ],
                condition:''

            }
        },
        created: function () {
            this.findOrganizations();
        },
        methods: {
            searchByCondition(value){        this.currentPage=1;
                this.condition=value;
                this.findOrganizations();
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
                this.findOrganizations();
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
            findOrganizations() {
                var parms = this.installParms();
              this.buttonRequestProgressStart("正在搜索,请稍后...");
                    OrganizationService.findOrganizations(parms).then((res) => {
                      this.buttonRequestProgressClose();
                    this.organizations = res.data.datas;
                this.totalCount = res.data.totalCount;
            }).catch((error) => {
                      this.buttonRequestProgressClose();
                    this.$message({
                    type: 'error',
                    message: '网络繁忙，请稍候再试！'
                })
            })
            },
            displayOrganization(organizationId){
                var router = this.$router;
                router.push({path: '/simple/organization/organization/display/'+organizationId, query: {}});
            },
            deleteOrganization(organizationId) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  this.buttonRequestProgressStart("正在删除,请稍后...");
                        OrganizationService.deleteOrganization(organizationId).then((res) =>{
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
                this.findOrganizations();
            },
            changePage(val) {
                this.currentPage = val;
                this.findOrganizations();
            },
            addOrganization(){
                //新增单位
                var router = this.$router;
                router.push({path: '/simple/organization/organization/add', query: {}});
            },
            editOrganation(organizationId){
                //编辑单位
                var router = this.$router;
                router.push({path: '/simple/organization/organization/edit/'+organizationId, query: {}});
            },
            handleCurrentChange(currentRow,oldCurrentRow) {
                //this.currentRow = val;
            },
        }
    }
</script>
<style scoped lang="scss">
.towLine > div{
    height:100%;
}
</style>
