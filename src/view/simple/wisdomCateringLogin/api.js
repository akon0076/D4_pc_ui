import {simpleServer} from '../../../tools/servers'

/**
 * 登录
 */
export class wisdomCateringLoginService {

  // 智慧餐饮登录
  static wisdomCateringLoginSubmit (data) {

    var body = simpleServer.getArgs(this.wisdomCateringLoginSubmit,arguments,'POST');
    return simpleServer.connection('POST', 'Login/wisdomCateringLoginSubmit', body);
  }

  // 登录
  static wisdomCateringConstructNewTree(operatorId,moduleType)
  {
    var body = simpleServer.getArgs(this.wisdomCateringConstructNewTree,arguments,'GET');
    return simpleServer.connection('GET', '/Login/wisdomCateringConstructNewTree', body);
  }

  //退出登录
  static wisdomCateringLogout () {
    var body = simpleServer.getArgs(this.wisdomCateringLogout,arguments,'GET');
    return simpleServer.connection('GET', 'Login/wisdomCateringLogout', body);
  }
}
