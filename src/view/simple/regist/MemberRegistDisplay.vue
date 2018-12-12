
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看商家注册审核</span>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="名称">
                            <span>{{ memberRegist.name }}</span>
                        </el-form-item>
                        <el-form-item label="密码">
                            <span>{{ memberRegist.password }}</span>
                        </el-form-item>
                        <el-form-item label="账号">
                            <span>{{ memberRegist.memberCode }}</span>
                        </el-form-item>
                        <el-form-item label="联系人">
                            <span>{{ memberRegist.person }}</span>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <span>{{ memberRegist.phone }}</span>
                        </el-form-item>
                        <el-form-item label="审核状态" v-show="type == '查看'">
                            <span>{{ memberRegist.auditState }}</span>
                        </el-form-item>
                  <el-col :span="12" v-show="type == '审核'">
                    <el-form-item>
                      <el-button type="primary" @click="auditMemberRegist('不通过')">不通过</el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="auditMemberRegist('通过')">通过</el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12"  v-show="type == '查看'">
                    <el-form-item>
                      <el-button type="primary" @click="goBack()">返回</el-button>
                    </el-form-item>
                  </el-col>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {MemberRegistService} from './MemberRegistService';

export default {
    components: {
    },
    data() {
        return {
            memberRegist:{},
            type:"",
        }
    },
    methods: {
      findMemberRegistForView(memberRegistId)//查找商家注册审核
      {
        MemberRegistService.findMemberRegistForView(memberRegistId).then((resp) => {
          this.memberRegist = resp.data;
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询商家注册审核出错'
          })
        })
      },
      auditMemberRegist(State) {
        debugger
        this.memberRegist.auditState = State;
        MemberRegistService.updateMemberRegist(this.memberRegist).then((resp) => {
          this.$router.push({path: '/simple/regist/MemberRegist'});
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '审核人员出错'
          })
        })
      },
      goBack() {
        this.$router.push({path: '/simple/regist/MemberRegist'});
      },
    },
    created() {
        const memberRegistId = this.$route.params.memberRegistId;
        this.findMemberRegistForView(memberRegistId);
      this.type = this.$route.query.type;
    },
}

</script>
<style scoped lang="scss">

</style>
