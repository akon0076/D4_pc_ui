import {simpleServer} from '../../tools/servers'

/**
 * 登录
 */
export class LoginService {
  // 登录
  static loginSubmit(data) {
    var body = simpleServer.getArgs(this.loginSubmit, arguments, 'POST');
    return simpleServer.connection('POST', 'Login/loginSubmit', body);
  }

  // 智慧餐饮登录
  static wisdomCateringLoginSubmit(data) {
    var body = simpleServer.getArgs(this.wisdomCateringLoginSubmit, arguments, 'POST');
    return simpleServer.connection('POST', 'Login/wisdomCateringLoginSubmit', body);
  }

  // 测试
  static test() {
    return simpleServer.connection('GET', 'Login/test', null);
  }

  // 登录
  static constructNewTree(operatorId, moduleType) {
    var body = simpleServer.getArgs(this.constructNewTree, arguments, 'GET');
    return simpleServer.connection('GET', '/Login/constructNewTree', body);
  }

  // 智慧餐饮查询菜单
  static wisdomCateringConstructNewTree(operatorId, moduleType) {
    var body = simpleServer.getArgs(this.wisdomCateringConstructNewTree, arguments, 'GET');
    return simpleServer.connection('GET', '/Login/wisdomCateringConstructNewTree', body);
  }

  //退出登录
  static logout() {
    var body = simpleServer.getArgs(this.loginSubmit, arguments, 'GET');
    return simpleServer.connection('GET', 'Login/logout', body);
  }

  //智慧餐饮商家退出登录
  static wisdomCateringLogout() {
    var body = simpleServer.getArgs(this.loginSubmit, arguments, 'GET');
    return simpleServer.connection('GET', 'Login/wisdomCateringLogout', body);
  }

  //获取验证码
  static getCaptcha() {
    var body = simpleServer.getArgs(this.getCaptcha, arguments, 'GET');
    return simpleServer.connection('GET', 'Captcha/getCaptcha', body);
  }

  //获取单位
  static getOrganizations(loginForm) {
    var body = simpleServer.getArgs(this.getOrganizations, arguments, 'POST');
    return simpleServer.connection('POST', 'Login/getOrganizations', body);
  }

}
