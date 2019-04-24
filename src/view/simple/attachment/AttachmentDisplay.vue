
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>查看附件</span>
            </div>

            <div class="text item">
                <el-form label-position="left" inline class="display-form">
                        <el-form-item label="名称">
                            <span>{{ attachment.name }}</span>
                        </el-form-item>
                        <el-form-item label="附件的真实名称">
                            <span>{{ attachment.attachmentRealName }}</span>
                        </el-form-item>
                        <el-form-item label="保存文件名">
                            <span>{{ attachment.attachmentLogicalName }}</span>
                        </el-form-item>
                        <el-form-item label="上传时间">
                            <span>{{ attachment.uploadTime }}</span>
                        </el-form-item>
                        <el-form-item label="上传人">
                            <span>{{ attachment.uploadEmployeeId }}</span>
                        </el-form-item>
                        <el-form-item label="上传人">
                            <span>{{ attachment.uploadEmployeeName }}</span>
                        </el-form-item>
                        <el-form-item label="附件地址">
                            <span>{{ attachment.attachmentAddr }}</span>
                        </el-form-item>
                        <el-form-item label="关联表单Id">
                            <span>{{ attachment.associateFormId }}</span>
                        </el-form-item>
                        <el-form-item label="关联表单名称">
                            <span>{{ attachment.associateFormName }}</span>
                        </el-form-item>
                        <el-form-item label="附件大小">
                            <span>{{ attachment.associateSize }}</span>
                        </el-form-item>
                        <el-form-item label="是否有效">
                            <span>{{ attachment.isEffective }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ attachment.remark }}</span>
                        </el-form-item>

                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {AttachmentService} from './AttachmentService';

export default {
    components: {
    },
    data() {
        return {
            attachment:{},
        }
    },
    methods: {
        findAttachmentForView(attachmentId)//查找附件
        {
            AttachmentService.findAttachmentForView(attachmentId).then((resp) => {
                this.attachment = resp.data;
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询附件出错'
        })
        })
        },
    },
    created() {
        const attachmentId = this.$route.params.attachmentId;
        this.findAttachmentForView(attachmentId);
    },
}

</script>
<style scoped lang="scss">

</style>
