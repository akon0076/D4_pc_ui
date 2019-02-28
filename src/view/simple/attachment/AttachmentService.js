import {simpleServer} from '@/tools/servers'

/**
 * 附件
 */
export class AttachmentService {
    // 分页查询列表
    static findAttachments (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findAttachments,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/attachment/Attachment/findAttachments', body);
    }


    //根据附件Id查询附件
    static findAttachment (attachmentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findAttachment ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/attachment/Attachment/findAttachment',body);
    }

    //为了编辑,根据附件Id查询附件
    static findAttachmentForEdit(attachmentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findAttachmentForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/attachment/Attachment/findAttachmentForEdit',body);
    }

    //为了查看,根据附件Id查询附件，所有外键字段的名称都已加载
    static findAttachmentForView(attachmentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findAttachmentForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/attachment/Attachment/findAttachmentForView',body);
    }

    //创建新的附件
    static createAttachment() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createAttachment,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/attachment/Attachment/createAttachment',body);
    }

    //保存附件
    static saveAttachment(attachment) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveAttachment,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/attachment/Attachment/saveAttachment', body);
    }

    //编辑附件
    static updateAttachment (attachment) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateAttachment,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/attachment/Attachment/updateAttachment', body);
    }

    //根据附件Id删除附件
    static deleteAttachment (attachmentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteAttachment,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/attachment/Attachment/deleteAttachment',body);
    }

    //为了查看,根据附件Id查询附件，只加载ID 和 名称
    static findAttachmentsWithIdNameById(attachmentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findAttachmentsWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/attachment/Attachment/findAttachmentsWithIdNameById',body);
    }

    //为了查看,根据附件 名称 查询附件，只加载ID 和 名称
    static findAttachmentsWithIdNameByName(attachmentName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findAttachmentsWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/attachment/Attachment/findAttachmentsWithIdNameByName',body);
    }

}
