
import {simpleServer} from '@/tools/servers'

/**
 * 职员
 */
export class fileService {
    // 上传文件到云服务器
    static saveFile(data,files) {
      debugger
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveFile,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/attachment/Attachment/saveAttachment', data,files,'files');
    }




}
